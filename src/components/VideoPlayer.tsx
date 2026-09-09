"use client";
import React, { useState, useEffect, useRef } from "react";
import AgoraRTC, {
  AgoraRTCProvider,
  useRTCClient,
  useLocalMicrophoneTrack,
  useLocalCameraTrack,
  usePublish,
  useJoin,
  useRemoteUsers,
  useRemoteAudioTracks,
  useConnectionState,
  RemoteUser,
  LocalVideoTrack
} from "agora-rtc-react";
import { Mic, MicOff, Video, VideoOff, PhoneOff, MonitorUp, Smile, Minimize2, Maximize2, Copy } from "lucide-react";
import { toast } from "sonner";

const EMOJI_LIST = ["👍", "❤️", "😂", "🎉", "👏", "😮"];

// The main wrapper that provides Agora context
export function VideoCallProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => AgoraRTC.createClient({ codec: "vp8", mode: "rtc" }));
  return <AgoraRTCProvider client={client}>{children}</AgoraRTCProvider>;
}

// The actual Video Call Interface
export function VideoPlayer({
  channelName,
  token,
  appId,
  uid,
  onEndCall
}: {
  channelName: string;
  token: string;
  appId: string;
  uid: number;
  onEndCall: () => void;
}) {
  const client = useRTCClient();
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [screenShareOn, setScreenShareOn] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [floatingEmojis, setFloatingEmojis] = useState<{ id: number; emoji: string; uid: string }[]>([]);

  const screenClientRef = useRef<any>(null);

  // Join the channel
  useJoin({ appid: appId, channel: channelName, token: token ? token : null, uid: uid });

  // Always initialize tracks
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(true);
  const { localCameraTrack } = useLocalCameraTrack(true);
  const [actualScreenTrack, setActualScreenTrack] = useState<any>(null);
  const connectionState = useConnectionState();

  const toggleScreenShare = async () => {
    if (screenShareOn) {
      if (actualScreenTrack) {
        actualScreenTrack.stop();
        actualScreenTrack.close();
        setActualScreenTrack(null);
      }
      setScreenShareOn(false);
    } else {
      try {
        const track = await AgoraRTC.createScreenVideoTrack({}, "disable");
        const actualTrack = Array.isArray(track) ? track[0] : track;
        
        actualTrack.on("track-ended", () => {
          setScreenShareOn(false);
          actualTrack.stop();
          actualTrack.close();
          setActualScreenTrack(null);
        });
        
        setActualScreenTrack(actualTrack);
        setScreenShareOn(true);
      } catch (err) {
        console.error("Error creating screen track:", err);
      }
    }
  };

  // Publish local tracks robustly using the built-in hook
  usePublish([localMicrophoneTrack, localCameraTrack]);

  // Manage Screen Client
  useEffect(() => {
    const manageScreenClient = async () => {
      if (screenShareOn && actualScreenTrack) {
        if (!screenClientRef.current) {
          screenClientRef.current = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
        }
        const sc = screenClientRef.current;
        if (sc.connectionState === "DISCONNECTED") {
          await sc.join(appId, channelName, token ? token : null, uid + 100000);
        }
        try { await sc.publish(actualScreenTrack); } catch (e) {}
      } else {
        if (screenClientRef.current) {
          try {
            await screenClientRef.current.unpublish();
            await screenClientRef.current.leave();
          } catch(e) {}
          screenClientRef.current = null;
        }
      }
    };
    manageScreenClient();
  }, [screenShareOn, actualScreenTrack, appId, channelName, token, uid]);





  // Handle Mute/Unmute
  useEffect(() => {
    if (localMicrophoneTrack) {
      localMicrophoneTrack.setEnabled(micOn).catch(console.error);
    }
  }, [micOn, localMicrophoneTrack]);

  // Handle Camera On/Off
  useEffect(() => {
    if (localCameraTrack) {
      localCameraTrack.setEnabled(cameraOn).catch(console.error);
    }
  }, [cameraOn, localCameraTrack]);

  // Get remote users and play their audio/video
  const remoteUsers = useRemoteUsers();
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);

  useEffect(() => {
    audioTracks.forEach(track => track.play());
    return () => {
      audioTracks.forEach(track => track.stop());
    };
  }, [audioTracks]);

  // Handle Stream Messages (Emojis)
  useEffect(() => {
    const handleStreamMessage = (uid: string | number, payload: Uint8Array) => {
      try {
        const msg = new TextDecoder().decode(payload);
        if (msg.startsWith("emoji:")) {
          const emoji = msg.split(":")[1];
          const id = Date.now() + Math.random();
          setFloatingEmojis(prev => [...prev, { id, emoji, uid: uid.toString() }]);
          setTimeout(() => {
            setFloatingEmojis(prev => prev.filter(e => e.id !== id));
          }, 4000);
        } else if (msg.startsWith("admin-cmd:")) {
          const parts = msg.split(":");
          const action = parts[1];
          const targetUid = Number(parts[2]);
          
          if (targetUid === uid) {
            switch (action) {
              case "mute-audio": setMicOn(false); toast.info("Admin muted your microphone."); break;
              case "unmute-audio": setMicOn(true); toast.info("Admin unmuted your microphone."); break;
              case "turn-off-camera": setCameraOn(false); toast.info("Admin turned off your camera."); break;
              case "turn-on-camera": setCameraOn(true); toast.info("Admin turned on your camera."); break;
              case "stop-screen-share": 
                if (screenShareOn) {
                  toggleScreenShare();
                  toast.info("Admin stopped your screen share.");
                }
                break;
            }
          }
        }
      } catch (e) {
        console.error("Failed to decode message", e);
      }
    };
    client.on("stream-message", handleStreamMessage);
    return () => {
      client.off("stream-message", handleStreamMessage);
    };
  }, [client]);

  const sendEmoji = async (emoji: string) => {
    setShowEmojiPicker(false);

    // Show locally
    const id = Date.now() + Math.random();
    setFloatingEmojis(prev => [...prev, { id, emoji, uid: "me" }]);
    setTimeout(() => {
      setFloatingEmojis(prev => prev.filter(e => e.id !== id));
    }, 4000);

    // Broadcast
    try {
      const payload = new TextEncoder().encode("emoji:" + emoji);
      await (client as any).sendStreamMessage({ payload, syncWithAudioTrack: false });
    } catch (error) {
      console.warn("Could not send emoji, data channel might not be ready", error);
    }
  };

  const sendAdminCommand = async (action: string, targetUid: number) => {
    try {
      const payload = new TextEncoder().encode(`admin-cmd:${action}:${targetUid}`);
      await (client as any).sendStreamMessage({ payload, syncWithAudioTrack: false });
      toast.success("Command sent!");
    } catch (error) {
      console.warn("Could not send admin command", error);
      toast.error("Failed to send command");
    }
  };

  const handleEndCall = async () => {
    // Cleanup local tracks before ending
    if (localMicrophoneTrack) {
      localMicrophoneTrack.stop();
      localMicrophoneTrack.close();
    }
    if (localCameraTrack) {
      localCameraTrack.stop();
      localCameraTrack.close();
    }
    if (actualScreenTrack) {
      actualScreenTrack.stop();
      actualScreenTrack.close();
    }
    
    try {
      if (screenClientRef.current) {
        await screenClientRef.current.leave();
        screenClientRef.current = null;
      }
      await client.leave();
    } catch(e) {}
    
    onEndCall();
  };

  const screenUsers = remoteUsers.filter(u => Number(u.uid) > 100000);
  const cameraUsers = remoteUsers.filter(u => Number(u.uid) < 100000);
  const isSomeoneSharingScreen = screenShareOn || screenUsers.length > 0;

  // Active Speaker detection
  const [activeSpeakerId, setActiveSpeakerId] = useState<number | string | null>(null);
  useEffect(() => {
    if (!client) return;
    client.enableAudioVolumeIndicator();
    const handleVolumeIndicator = (result: any[]) => {
      let maxVolume = 0;
      let speaker = null;
      result.forEach((volume) => {
        if (volume.level > 10 && volume.level > maxVolume) {
          maxVolume = volume.level;
          speaker = volume.uid;
        }
      });
      if (speaker !== null && speaker !== uid) {
        setActiveSpeakerId(speaker);
      }
    };
    client.on("volume-indicator", handleVolumeIndicator);
    return () => {
      client.off("volume-indicator", handleVolumeIndicator);
    };
  }, [client, uid]);

  // Determine Main User for layout
  let mainUser: any = null;
  if (cameraUsers.length > 0) {
    mainUser = cameraUsers.find(u => u.uid === activeSpeakerId) || cameraUsers[0];
  }

  // Determine Sidebar Users
  let sidebarUsers = cameraUsers;
  if (!isSomeoneSharingScreen && mainUser) {
    sidebarUsers = cameraUsers.filter(u => u.uid !== mainUser.uid);
  }

  const containerClasses = isMinimized 
    ? "fixed bottom-4 right-4 w-[350px] h-[250px] z-[9999] flex items-center justify-center bg-black p-2 overflow-hidden rounded-2xl shadow-2xl transition-all duration-300" 
    : "fixed inset-0 z-[9999] flex items-center justify-center bg-black p-2 md:p-4 overflow-hidden transition-all duration-300";

  return (
    <div className={containerClasses}>
      
      {/* Minimized Overlay Button */}
      {isMinimized && (
        <button 
          onClick={() => setIsMinimized(false)}
          className="absolute inset-0 w-full h-full bg-black/50 hover:bg-black/40 flex items-center justify-center z-[10000] group"
          title="Maximize"
        >
          <Maximize2 className="text-white w-12 h-12 opacity-50 group-hover:opacity-100 transition-opacity" />
        </button>
      )}

      {/* Top Action Bar */}
      {!isMinimized && (
        <div className="absolute top-6 left-6 right-6 z-50 flex justify-between items-center pointer-events-none">
          <button 
            onClick={() => {
              const link = `${window.location.origin}/call/${channelName}`;
              navigator.clipboard.writeText(link);
              toast.success("Meeting link copied!");
            }}
            className="bg-gray-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-gray-700 shadow-xl flex items-center gap-2 text-sm text-white font-medium hover:bg-gray-800 pointer-events-auto transition-colors"
          >
            <Copy size={16} />
            Copy Link
          </button>

          <button
            onClick={() => setIsMinimized(true)}
            className="bg-gray-900/80 backdrop-blur-md p-2.5 rounded-full border border-gray-700 shadow-xl text-white hover:bg-gray-800 pointer-events-auto transition-colors"
            title="Minimize"
          >
            <Minimize2 size={20} />
          </button>
        </div>
      )}

      {/* Floating Emojis Container */}
      <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
        {floatingEmojis.map((e) => (
          <div
            key={e.id}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 text-4xl animate-float-up opacity-0"
            style={{
              left: `${50 + (Math.random() * 20 - 10)}%`, // Randomize horizontal position slightly
              animationDuration: `${2 + Math.random()}s`
            }}
          >
            {e.emoji}
          </div>
        ))}
      </div>

      <div className="relative w-full h-full flex flex-col md:flex-row gap-4 pt-4 pb-24 md:pb-4 px-2 md:px-0">

        {/* Main Screen Area */}
        <div className="flex-1 rounded-2xl overflow-hidden relative bg-gray-900 border border-gray-800 flex items-center justify-center shadow-2xl">
          {screenShareOn && actualScreenTrack ? (
            <div className="w-full h-full flex items-center justify-center [&_video]:!object-contain bg-black">
              <LocalVideoTrack track={actualScreenTrack} play={true} className="w-full h-full" />
            </div>
          ) : screenUsers.length > 0 ? (
            <div className="w-full h-full flex items-center justify-center relative group [&_video]:!object-contain bg-black">
              <RemoteUser user={screenUsers[0]} className="w-full h-full" />
              {Number(uid) === 1 && (
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-xl border border-white/10">
                  <button onClick={() => sendAdminCommand('stop-screen-share', Number(screenUsers[0].uid) - 100000)} className="px-3 py-1.5 hover:bg-red-500/20 rounded text-red-400 flex items-center gap-2 text-sm font-bold transition-colors">
                    <MonitorUp size={16} /> Stop Share
                  </button>
                </div>
              )}
            </div>
          ) : mainUser ? (
            <div className="w-full h-full relative flex items-center justify-center">
              {mainUser.hasVideo ? (
                <RemoteUser user={mainUser} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800 text-gray-500">
                  <VideoOff size={64} className="mb-4" />
                  <span className="text-xl font-medium">Camera Off</span>
                </div>
              )}
              <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-xl text-white font-medium flex items-center gap-3 shadow-lg border border-white/10 z-10">
                <div className={`w-3 h-3 rounded-full ${mainUser.hasAudio ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                <span className="text-lg">{Number(mainUser.uid) === 1 ? "Sayham Kayes" : `Guest ${mainUser.uid}`}</span>
                {!mainUser.hasAudio && <span className="text-red-400 font-bold">(Muted)</span>}
              </div>
              
              {/* Admin Controls */}
              {Number(uid) === 1 && (
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm p-2 rounded-xl flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-xl border border-white/10">
                  <button onClick={() => sendAdminCommand(mainUser.hasAudio ? 'mute-audio' : 'unmute-audio', Number(mainUser.uid))} className="p-2 hover:bg-white/10 rounded-lg text-white transition-colors" title={mainUser.hasAudio ? "Mute User" : "Unmute User"}>
                    {mainUser.hasAudio ? <MicOff size={18} className="text-red-400" /> : <Mic size={18} className="text-green-400" />}
                  </button>
                  <button onClick={() => sendAdminCommand(mainUser.hasVideo ? 'turn-off-camera' : 'turn-on-camera', Number(mainUser.uid))} className="p-2 hover:bg-white/10 rounded-lg text-white transition-colors" title={mainUser.hasVideo ? "Turn Off Camera" : "Turn On Camera"}>
                    {mainUser.hasVideo ? <VideoOff size={18} className="text-red-400" /> : <Video size={18} className="text-green-400" />}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-white/50">
              <div className="animate-pulse flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin mb-4"></div>
                <p className="text-lg">Waiting for others to join...</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="w-full md:w-64 lg:w-72 flex flex-col gap-4 z-30">

          {/* Local Camera (Always Visible) */}
          <div className="w-full h-48 md:h-52 lg:h-64 bg-gray-900 rounded-2xl overflow-hidden border-2 border-gray-700 shadow-lg relative shrink-0">
            {cameraOn ? (
              <LocalVideoTrack track={localCameraTrack} play={true} className="w-full h-full object-cover scale-x-[-1]" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-500 flex-col gap-2">
                <VideoOff size={24} />
              </div>
            )}
            <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md text-xs text-white font-medium flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${micOn ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
              You {!micOn && <span className="ml-1 text-[10px] text-red-400 font-bold">(Muted)</span>}
            </div>
          </div>

          {/* Remote Users in Sidebar */}
          {sidebarUsers.length > 0 && (
            <div className="flex-1 overflow-y-auto flex flex-col gap-4 scrollbar-hide pb-24 md:pb-0">
              {sidebarUsers.map((user) => (
                <div key={user.uid} className="w-full h-48 md:h-52 lg:h-64 bg-gray-900 rounded-2xl overflow-hidden shadow-lg border-2 border-gray-700 relative shrink-0 flex items-center justify-center">
                  {user.hasVideo ? (
                    <RemoteUser user={user} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center bg-gray-800 text-gray-500 w-full h-full">
                      <VideoOff size={24} className="mb-2" />
                      <span className="text-xs font-medium">Camera Off</span>
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md text-xs text-white font-medium flex items-center gap-2 z-10">
                    <div className={`w-2 h-2 rounded-full ${user.hasAudio ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                    {Number(user.uid) === 1 ? "Sayham Kayes" : `Guest ${user.uid}`}
                    {!user.hasAudio && <span className="ml-1 text-[10px] text-red-400 font-bold">(Muted)</span>}
                  </div>
                  
                  {/* Admin Controls (Sidebar) */}
                  {Number(uid) === 1 && (
                    <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm p-1 rounded-lg flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-50 border border-white/10">
                      <button onClick={() => sendAdminCommand(user.hasAudio ? 'mute-audio' : 'unmute-audio', Number(user.uid))} className="p-1.5 hover:bg-white/10 rounded-md text-white transition-colors" title={user.hasAudio ? "Mute User" : "Unmute User"}>
                        {user.hasAudio ? <MicOff size={14} className="text-red-400" /> : <Mic size={14} className="text-green-400" />}
                      </button>
                      <button onClick={() => sendAdminCommand(user.hasVideo ? 'turn-off-camera' : 'turn-on-camera', Number(user.uid))} className="p-1.5 hover:bg-white/10 rounded-md text-white transition-colors" title={user.hasVideo ? "Turn Off Camera" : "Turn On Camera"}>
                        {user.hasVideo ? <VideoOff size={14} className="text-red-400" /> : <Video size={14} className="text-green-400" />}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-50">

          {/* Emoji Picker Popup */}
          {showEmojiPicker && (
            <div className="bg-gray-800/90 backdrop-blur-md p-3 rounded-2xl shadow-2xl flex gap-2 mb-2 animate-in fade-in slide-in-from-bottom-4 border border-gray-700">
              {EMOJI_LIST.map(emoji => (
                <button
                  key={emoji}
                  onClick={() => sendEmoji(emoji)}
                  className="text-2xl hover:scale-125 transition-transform p-2 hover:bg-white/10 rounded-xl"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center gap-3 md:gap-4 bg-gray-900/90 backdrop-blur-xl px-6 py-4 rounded-full border border-gray-700 shadow-2xl">
            <button
              onClick={() => setMicOn(prev => !prev)}
              className={`p-3 md:p-4 rounded-full transition-all ${micOn ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-red-500/90 hover:bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]'}`}
              title={micOn ? "Mute" : "Unmute"}
            >
              {micOn ? <Mic size={22} /> : <MicOff size={22} />}
            </button>

            <button
              onClick={() => setCameraOn(prev => !prev)}
              className={`p-3 md:p-4 rounded-full transition-all ${cameraOn ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-red-500/90 hover:bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]'}`}
              title={cameraOn ? "Turn off camera" : "Turn on camera"}
            >
              {cameraOn ? <Video size={22} /> : <VideoOff size={22} />}
            </button>

            <button
              onClick={toggleScreenShare}
              disabled={isSomeoneSharingScreen && !screenShareOn}
              className={`p-3 md:p-4 rounded-full transition-all ${isSomeoneSharingScreen && !screenShareOn ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : screenShareOn ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
              title={isSomeoneSharingScreen && !screenShareOn ? "Someone is already sharing" : "Share Screen"}
            >
              <MonitorUp size={22} />
            </button>

            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className={`p-3 md:p-4 rounded-full transition-all ${showEmojiPicker ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
              title="React"
            >
              <Smile size={22} />
            </button>

            <div className="w-px h-8 bg-gray-700 mx-2"></div>

            <button
              onClick={handleEndCall}
              className="p-3 md:p-4 rounded-full bg-red-600 hover:bg-red-700 text-white transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_25px_rgba(220,38,38,0.6)]"
              title="End Call"
            >
              <PhoneOff size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
