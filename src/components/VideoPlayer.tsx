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
import { Mic, MicOff, Video, VideoOff, PhoneOff, MonitorUp, Smile, Minimize2, Maximize2, Copy, LayoutGrid, PanelRight, Focus, MessageSquare, Send, X } from "lucide-react";
import { toast } from "sonner";

const EMOJI_LIST = ["👍", "❤️", "😂", "🎉", "👏", "😮"];

export interface ChatMessage {
  id: string;
  senderUid: string;
  senderName: string;
  text: string;
  timestamp: Date;
}

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
  userName,
  onNameTaken,
  onEndCall
}: {
  channelName: string;
  token: string;
  appId: string;
  uid: number;
  userName: string;
  onNameTaken: () => void;
  onEndCall: () => void;
}) {
  const client = useRTCClient();
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [remoteUserNames, setRemoteUserNames] = useState<Record<string, string>>({});
  const remoteUserNamesRef = useRef(remoteUserNames);
  useEffect(() => {
    remoteUserNamesRef.current = remoteUserNames;
  }, [remoteUserNames]);
  const [screenShareOn, setScreenShareOn] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [floatingEmojis, setFloatingEmojis] = useState<{ id: number; emoji: string; uid: string }[]>([]);
  const [layoutMode, setLayoutMode] = useState<'sidebar' | 'grid' | 'spotlight'>('sidebar');
  const [showLayoutMenu, setShowLayoutMenu] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const screenClientRef = useRef<any>(null);

  const stateRef = useRef({ 
    isVerified: false, 
    myName: "", 
    isChatOpen: false, 
    screenShareOn: false,
    onNameTaken
  });

  // Join the channel
  useJoin({ appid: appId, channel: channelName, token: token ? token : null, uid: uid });

  // Only initialize tracks after verification passes
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(isVerified);
  const { localCameraTrack } = useLocalCameraTrack(isVerified);
  const [actualScreenTrack, setActualScreenTrack] = useState<any>(null);
  const connectionState = useConnectionState();

  const myName = Number(uid) === 1 ? "Sayham Kayes" : userName.trim();

  useEffect(() => {
    stateRef.current = {
      isVerified,
      myName,
      isChatOpen,
      screenShareOn,
      onNameTaken
    };
  }, [isVerified, myName, isChatOpen, screenShareOn, onNameTaken]);

  const getDisplayName = (uid: string | number) => {
    if (Number(uid) === 1) return "Sayham Kayes";
    if (Number(uid) === Number(uid)) return remoteUserNames[uid.toString()] || `Guest ${uid}`;
    return `Guest ${uid}`;
  };

  // Peer-to-Peer Name Verification
  useEffect(() => {
    if (connectionState === "CONNECTED" && !isVerified && myName) {
      if (Number(uid) === 1) {
        // Host doesn't need to verify, just bypass and broadcast name
        setIsVerified(true);
        setTimeout(() => {
          try {
            const payloadReq = new TextEncoder().encode("request-names");
            (client as any).sendStreamMessage({ payload: payloadReq, syncWithAudioTrack: false });

            const payloadSet = new TextEncoder().encode("set-name:" + myName);
            (client as any).sendStreamMessage({ payload: payloadSet, syncWithAudioTrack: false });
          } catch(e) {}
        }, 1000);
        return;
      }

      let checks = 0;
      // Broadcast check-name multiple times to ensure delivery over unreliable data channel startup
      const interval = setInterval(() => {
        if (checks < 3) {
          try {
            const payload = new TextEncoder().encode("check-name:" + myName);
            (client as any).sendStreamMessage({ payload, syncWithAudioTrack: false });
          } catch(e) {}
          checks++;
        }
      }, 600);

      // Wait 2.5s for objections
      const timer = setTimeout(() => {
        clearInterval(interval);
        setIsVerified(true);
        // Request names from others, and broadcast own name
        try {
          const payloadReq = new TextEncoder().encode("request-names");
          (client as any).sendStreamMessage({ payload: payloadReq, syncWithAudioTrack: false });
          
          const payloadSet = new TextEncoder().encode("set-name:" + myName);
          (client as any).sendStreamMessage({ payload: payloadSet, syncWithAudioTrack: false });
        } catch(e) {}
      }, 2500);

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [connectionState, isVerified, myName, client, uid]);

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

  // Handle Stream Messages (Emojis, Chat, Admin, Names)
  useEffect(() => {
    const handleStreamMessage = (senderUid: string | number, payload: Uint8Array) => {
      try {
        const msg = new TextDecoder().decode(payload);
        if (msg.startsWith("emoji:")) {
          const emoji = msg.split(":")[1];
          const id = Date.now() + Math.random();
          setFloatingEmojis(prev => [...prev, { id, emoji, uid: senderUid.toString() }]);
          setTimeout(() => {
            setFloatingEmojis(prev => prev.filter(e => e.id !== id));
          }, 4000);
        } else if (msg.startsWith("admin-cmd:")) {
          const parts = msg.split(":");
          const action = parts[1];
          const targetUid = Number(parts[2]);
          
          if (targetUid === Number(uid)) {
            switch (action) {
              case "mute-audio": setMicOn(false); toast.info("Admin muted your microphone."); break;
              case "unmute-audio": setMicOn(true); toast.info("Admin unmuted your microphone."); break;
              case "turn-off-camera": setCameraOn(false); toast.info("Admin turned off your camera."); break;
              case "turn-on-camera": setCameraOn(true); toast.info("Admin turned on your camera."); break;
              case "stop-screen-share": 
                if (stateRef.current.screenShareOn) {
                  toggleScreenShare();
                  toast.info("Admin stopped your screen share.");
                }
                break;
            }
          }
        } else if (msg.startsWith("chat:")) {
          const text = msg.substring(5);
          
          const currentNames = remoteUserNamesRef.current;
          const senderName = Number(senderUid) === 1 ? "Sayham Kayes" : (currentNames[senderUid.toString()] || `Guest ${senderUid}`);
          
          setMessages(prev => [...prev, { 
            id: Date.now().toString() + Math.random(), 
            senderUid: senderUid.toString(), 
            senderName, 
            text, 
            timestamp: new Date() 
          }]);
          
          if (!stateRef.current.isChatOpen) {
            setHasUnreadMessages(true);
          }
        } else if (msg.startsWith("check-name:")) {
          const checkedName = msg.substring(11);
          if (checkedName.toLowerCase() === stateRef.current.myName.toLowerCase() && stateRef.current.isVerified) {
            // My name! Object!
            try {
              const payload = new TextEncoder().encode("name-taken:" + checkedName);
              (client as any).sendStreamMessage({ payload, syncWithAudioTrack: false });
            } catch(e) {}
          }
        } else if (msg.startsWith("name-taken:")) {
          const takenName = msg.substring(11);
          if (takenName.toLowerCase() === stateRef.current.myName.toLowerCase() && !stateRef.current.isVerified) {
            stateRef.current.onNameTaken();
          }
        } else if (msg === "request-names" && stateRef.current.isVerified) {
          try {
            const payload = new TextEncoder().encode("set-name:" + stateRef.current.myName);
            (client as any).sendStreamMessage({ payload, syncWithAudioTrack: false });
          } catch(e) {}
        } else if (msg.startsWith("set-name:")) {
          const name = msg.substring(9);
          setRemoteUserNames(prev => ({ ...prev, [senderUid.toString()]: name }));
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

  const sendChatMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;

    const text = chatInput.trim();
    
    // Add to local state
    setMessages(prev => [...prev, {
      id: Date.now().toString() + Math.random(),
      senderUid: "me",
      senderName: myName,
      text,
      timestamp: new Date()
    }]);
    setChatInput("");

    // Broadcast
    try {
      const payload = new TextEncoder().encode("chat:" + text);
      await (client as any).sendStreamMessage({ payload, syncWithAudioTrack: false });
    } catch (error) {
      console.warn("Could not send chat message", error);
      toast.error("Failed to send message. Data channel might not be ready.");
    }
  };

  const parseLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, i) => {
      if (part.match(urlRegex)) {
        return <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline break-all">{part}</a>;
      }
      return part;
    });
  };

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isChatOpen]);

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

  // Auto-switch to sidebar when someone shares screen
  useEffect(() => {
    if (isSomeoneSharingScreen) {
      setLayoutMode('sidebar');
    }
  }, [isSomeoneSharingScreen]);

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
      
      {!isVerified && (
        <div className="absolute inset-0 z-[100000] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center text-white">
          <div className="w-16 h-16 rounded-full border-4 border-blue-500/30 border-t-blue-500 animate-spin mb-4"></div>
          <h2 className="text-xl font-bold mb-2">Joining Meeting...</h2>
          <p className="text-gray-400">Verifying name availability</p>
        </div>
      )}

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
        
        {layoutMode === 'grid' && !isSomeoneSharingScreen ? (
          <div className={`w-full h-full flex-1 grid gap-4 p-2 md:p-4 ${
            [...cameraUsers, 'local'].length <= 1 ? 'grid-cols-1 grid-rows-1' :
            [...cameraUsers, 'local'].length <= 4 ? 'grid-cols-2 grid-rows-2' :
            [...cameraUsers, 'local'].length <= 9 ? 'grid-cols-3 grid-rows-3' :
            'grid-cols-4 grid-rows-4'
          }`}>
            {/* Local User in Grid */}
            <div className="bg-gray-900 rounded-2xl overflow-hidden border-2 border-gray-700 shadow-lg relative flex items-center justify-center">
              {cameraOn ? (
                <LocalVideoTrack track={localCameraTrack} play={true} className="w-full h-full object-cover scale-x-[-1]" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-500 flex-col gap-2">
                  <VideoOff size={32} />
                </div>
              )}
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm text-white font-medium flex items-center gap-2 z-10">
                <div className={`w-2.5 h-2.5 rounded-full ${micOn ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                You {!micOn && <span className="ml-1 text-xs text-red-400 font-bold">(Muted)</span>}
              </div>
            </div>

            {/* Remote Users in Grid */}
            {cameraUsers.map((user) => (
              <div key={user.uid} className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg border-2 border-gray-700 relative flex items-center justify-center">
                {user.hasVideo ? (
                  <RemoteUser user={user} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center justify-center bg-gray-800 text-gray-500 w-full h-full">
                    <VideoOff size={32} className="mb-2" />
                    <span className="text-sm font-medium">Camera Off</span>
                  </div>
                )}
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm text-white font-medium flex items-center gap-2 z-10">
                  <div className={`w-2.5 h-2.5 rounded-full ${user.hasAudio ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                  {getDisplayName(user.uid)}
                  {!user.hasAudio && <span className="ml-1 text-xs text-red-400 font-bold">(Muted)</span>}
                </div>
                {Number(uid) === 1 && (
                  <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm p-2 rounded-xl flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-50 border border-white/10">
                    <button onClick={() => sendAdminCommand(user.hasAudio ? 'mute-audio' : 'unmute-audio', Number(user.uid))} className="p-1.5 hover:bg-white/10 rounded-md text-white transition-colors" title={user.hasAudio ? "Mute User" : "Unmute User"}>
                      {user.hasAudio ? <MicOff size={16} className="text-red-400" /> : <Mic size={16} className="text-green-400" />}
                    </button>
                    <button onClick={() => sendAdminCommand(user.hasVideo ? 'turn-off-camera' : 'turn-on-camera', Number(user.uid))} className="p-1.5 hover:bg-white/10 rounded-md text-white transition-colors" title={user.hasVideo ? "Turn Off Camera" : "Turn On Camera"}>
                      {user.hasVideo ? <VideoOff size={16} className="text-red-400" /> : <Video size={16} className="text-green-400" />}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Main Screen Area */}
            <div className="w-full aspect-video md:aspect-auto md:flex-1 rounded-2xl overflow-hidden relative bg-gray-900 border border-gray-800 flex items-center justify-center shadow-2xl shrink-0 md:shrink">
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
                    <RemoteUser user={mainUser} className="w-full h-full object-cover md:object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800 text-gray-500">
                      <VideoOff size={64} className="mb-4" />
                      <span className="text-xl font-medium">Camera Off</span>
                    </div>
                  )}
                  <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-xl text-white font-medium flex items-center gap-3 shadow-lg border border-white/10 z-10">
                    <div className={`w-3 h-3 rounded-full ${mainUser.hasAudio ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                    <span className="text-lg">{getDisplayName(mainUser.uid)}</span>
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

            {/* Right Sidebar / Bottom Slider on Mobile */}
            {layoutMode === 'sidebar' && (
              <div className="w-full md:w-64 lg:w-72 flex flex-row md:flex-col gap-3 md:gap-4 z-30 overflow-x-auto md:overflow-visible scrollbar-hide pb-4 md:pb-0 shrink-0 snap-x">

                {/* Local Camera (Always Visible) */}
                <div className="w-32 h-24 md:w-full md:h-52 lg:h-64 bg-gray-900 rounded-2xl overflow-hidden border-2 border-gray-700 shadow-lg relative shrink-0 snap-start">
                  {cameraOn ? (
                    <LocalVideoTrack track={localCameraTrack} play={true} className="w-full h-full object-cover scale-x-[-1]" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-500 flex-col gap-2">
                      <VideoOff size={24} />
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md text-xs text-white font-medium flex items-center gap-2 z-10">
                    <div className={`w-2 h-2 rounded-full ${micOn ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                    You {!micOn && <span className="ml-1 text-[10px] text-red-400 font-bold">(Muted)</span>}
                  </div>
                </div>

                {/* Remote Users in Sidebar */}
                {sidebarUsers.length > 0 && (
                  <div className="flex md:flex-1 md:overflow-y-auto flex-row md:flex-col gap-3 md:gap-4 scrollbar-hide md:pb-24 shrink-0 md:shrink">
                    {sidebarUsers.map((user) => (
                      <div key={user.uid} className="w-32 h-24 md:w-full md:h-52 lg:h-64 bg-gray-900 rounded-2xl overflow-hidden shadow-lg border-2 border-gray-700 relative shrink-0 snap-start flex items-center justify-center">
                        {user.hasVideo ? (
                          <RemoteUser user={user} className="w-full h-full object-cover" />
                        ) : (
                          <div className="flex flex-col items-center justify-center bg-gray-800 text-gray-500 w-full h-full">
                            <VideoOff size={24} className="mb-2" />
                            <span className="text-[10px] md:text-xs font-medium">Camera Off</span>
                          </div>
                        )}
                        <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] md:text-xs text-white font-medium flex items-center gap-2 z-10">
                          <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${user.hasAudio ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                          {getDisplayName(user.uid)}
                          {!user.hasAudio && <span className="ml-1 text-[8px] md:text-[10px] text-red-400 font-bold">(Muted)</span>}
                        </div>
                        
                        {/* Admin Controls (Sidebar) */}
                        {Number(uid) === 1 && (
                          <div className="absolute top-1 right-1 md:top-2 md:right-2 bg-black/70 backdrop-blur-sm p-1 rounded-lg flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-50 border border-white/10">
                            <button onClick={() => sendAdminCommand(user.hasAudio ? 'mute-audio' : 'unmute-audio', Number(user.uid))} className="p-1 hover:bg-white/10 rounded-md text-white transition-colors" title={user.hasAudio ? "Mute User" : "Unmute User"}>
                              {user.hasAudio ? <MicOff size={12} className="text-red-400" /> : <Mic size={12} className="text-green-400" />}
                            </button>
                            <button onClick={() => sendAdminCommand(user.hasVideo ? 'turn-off-camera' : 'turn-on-camera', Number(user.uid))} className="p-1 hover:bg-white/10 rounded-md text-white transition-colors" title={user.hasVideo ? "Turn Off Camera" : "Turn On Camera"}>
                              {user.hasVideo ? <VideoOff size={12} className="text-red-400" /> : <Video size={12} className="text-green-400" />}
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}

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

            <div className="w-px h-8 bg-gray-700 mx-1 md:mx-2"></div>

            <div className="relative">
              {showLayoutMenu && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-gray-800/95 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl p-2 flex flex-col gap-1 w-48 animate-in fade-in slide-in-from-bottom-4">
                  <button onClick={() => { setLayoutMode('sidebar'); setShowLayoutMenu(false); }} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${layoutMode === 'sidebar' ? 'bg-blue-600 text-white' : 'hover:bg-white/10 text-gray-300'}`}>
                    <PanelRight size={18} />
                    <span className="text-sm font-medium">Sidebar View</span>
                  </button>
                  <button onClick={() => { setLayoutMode('grid'); setShowLayoutMenu(false); }} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${layoutMode === 'grid' ? 'bg-blue-600 text-white' : 'hover:bg-white/10 text-gray-300'}`}>
                    <LayoutGrid size={18} />
                    <span className="text-sm font-medium">Grid View</span>
                  </button>
                  <button onClick={() => { setLayoutMode('spotlight'); setShowLayoutMenu(false); }} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${layoutMode === 'spotlight' ? 'bg-blue-600 text-white' : 'hover:bg-white/10 text-gray-300'}`}>
                    <Focus size={18} />
                    <span className="text-sm font-medium">Spotlight View</span>
                  </button>
                </div>
              )}
              <button
                onClick={() => setShowLayoutMenu(!showLayoutMenu)}
                className={`p-3 md:p-4 rounded-full transition-all ${showLayoutMenu ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
                title="Change Layout"
              >
                <LayoutGrid size={22} />
              </button>
            </div>

            <div className="w-px h-8 bg-gray-700 mx-1 md:mx-2"></div>

            <div className="relative">
              <button
                onClick={() => {
                  setIsChatOpen(!isChatOpen);
                  if (!isChatOpen) setHasUnreadMessages(false);
                }}
                className={`p-3 md:p-4 rounded-full transition-all relative ${isChatOpen ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
                title="Chat"
              >
                <MessageSquare size={22} />
                {hasUnreadMessages && !isChatOpen && (
                  <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 border-2 border-gray-900 rounded-full animate-pulse"></span>
                )}
              </button>
            </div>

            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className={`p-3 md:p-4 rounded-full transition-all ${showEmojiPicker ? 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-[0_0_15px_rgba(234,179,8,0.5)]' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
              title="React"
            >
              <Smile size={22} />
            </button>

            <div className="w-px h-8 bg-gray-700 mx-1 md:mx-2"></div>

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

      {/* Chat Panel */}
      {isChatOpen && (
        <div className="fixed inset-y-0 right-0 w-full md:w-80 bg-gray-900 border-l border-gray-800 shadow-2xl z-[99999] flex flex-col animate-in slide-in-from-right duration-300">
          <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm z-10">
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              <MessageSquare size={20} className="text-blue-500" />
              In-Call Messages
            </h3>
            <button onClick={() => setIsChatOpen(false)} className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors">
              <X size={20} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4" ref={chatScrollRef}>
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-3">
                <MessageSquare size={48} className="opacity-20" />
                <p>No messages yet.</p>
                <p className="text-xs text-center px-4">Messages are only visible during the call and will be cleared when it ends.</p>
              </div>
            ) : (
              messages.map((msg) => {
                const isMe = msg.senderUid === "me";
                return (
                  <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} gap-1 max-w-full`}>
                    <div className="flex items-center gap-2 px-1">
                      <span className="text-xs text-gray-400 font-medium">{msg.senderName}</span>
                      <span className="text-[10px] text-gray-500">{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className={`px-4 py-2 rounded-2xl max-w-[85%] break-words shadow-md ${isMe ? 'bg-blue-600 text-white rounded-tr-sm' : 'bg-gray-800 text-gray-100 border border-gray-700 rounded-tl-sm'}`}>
                      {parseLinks(msg.text)}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="p-4 bg-gray-900 border-t border-gray-800 pb-8 md:pb-4">
            <form onSubmit={sendChatMessage} className="flex gap-2">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <button 
                type="submit"
                disabled={!chatInput.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-500 text-white p-2.5 rounded-xl transition-colors flex items-center justify-center min-w-[44px]"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
