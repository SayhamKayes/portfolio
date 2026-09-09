import React from "react";
import { Phone, PhoneOff, Video } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface IncomingCallModalProps {
  isOpen: boolean;
  callerName: string;
  isVideoCall: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export function IncomingCallModal({ 
  isOpen, 
  callerName, 
  isVideoCall, 
  onAccept, 
  onDecline 
}: IncomingCallModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          className="fixed top-10 left-1/2 -translate-x-1/2 z-50 bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-2xl w-full max-w-sm"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 animate-pulse">
              <div className="w-16 h-16 bg-blue-500/40 rounded-full flex items-center justify-center">
                {isVideoCall ? <Video className="text-blue-500 w-8 h-8" /> : <Phone className="text-blue-500 w-8 h-8" />}
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-1">Incoming Call</h3>
            <p className="text-gray-400 mb-8">{callerName} is calling you...</p>

            <div className="flex items-center gap-6 w-full justify-center">
              <button 
                onClick={onDecline}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-14 h-14 bg-red-500/10 group-hover:bg-red-500 rounded-full flex items-center justify-center transition-colors">
                  <PhoneOff className="text-red-500 group-hover:text-white transition-colors w-6 h-6" />
                </div>
                <span className="text-xs text-gray-400 group-hover:text-red-400">Decline</span>
              </button>

              <button 
                onClick={onAccept}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-14 h-14 bg-green-500/10 group-hover:bg-green-500 rounded-full flex items-center justify-center transition-colors shadow-[0_0_15px_rgba(34,197,94,0.4)] group-hover:shadow-[0_0_25px_rgba(34,197,94,0.6)] animate-pulse group-hover:animate-none">
                  <Phone className="text-green-500 group-hover:text-white transition-colors w-6 h-6" />
                </div>
                <span className="text-xs text-gray-400 group-hover:text-green-400">Accept</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
