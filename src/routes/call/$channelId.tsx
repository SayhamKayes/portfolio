import { createFileRoute } from '@tanstack/react-router';
import { useState, lazy, Suspense } from 'react';
const VideoCallProvider = lazy(() => import('../../components/VideoPlayer').then(module => ({ default: module.VideoCallProvider })));
const VideoPlayer = lazy(() => import('../../components/VideoPlayer').then(module => ({ default: module.VideoPlayer })));
import { generateAgoraToken } from '../../server/agora';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export const Route = createFileRoute('/call/$channelId')({
  component: CallPage,
});

function CallPage() {
  const { channelId } = Route.useParams();
  const [agoraToken, setAgoraToken] = useState('');
  const [hasJoined, setHasJoined] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uid, setUid] = useState(0);

  const joinCall = async () => {
    setIsLoading(true);
    try {
      // In a real app, you might want to ask for a guest name here
      const randomUid = Math.floor(Math.random() * 90000) + 1000;
      const response = await generateAgoraToken({ 
        data: { channelName: channelId, uid: 0 } 
      });
      
      setAgoraToken(response.token);
      setUid(randomUid);
      setHasJoined(true);
    } catch (error) {
      toast.error("Failed to connect to the call. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      {!hasJoined ? (
        <div className="max-w-md w-full bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl text-center">
          <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2">Video Consultation</h1>
          <p className="text-gray-400 mb-8">You have been invited to a video call. Click below to join.</p>
          
          <button
            onClick={joinCall}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : null}
            Join Call Now
          </button>
        </div>
      ) : (
        <Suspense fallback={<div className="text-white flex flex-col items-center"><Loader2 className="animate-spin w-8 h-8 mb-2" />Loading Call Environment...</div>}>
          <VideoCallProvider>
            <VideoPlayer 
              appId={import.meta.env.VITE_AGORA_APP_ID || "1a2368252b19451da438489172c82f5a"} 
              channelName={channelId}
              token={agoraToken}
              uid={uid}
              onEndCall={() => window.location.href = "/"} // Redirect to home on end
            />
          </VideoCallProvider>
        </Suspense>
      )}
    </div>
  );
}
