import { createFileRoute, useRouter } from '@tanstack/react-router';
import { showPopup, confirmAction } from '../../components/CustomPopup';
import { useState, useMemo, useEffect, useRef } from 'react';
import { getMessages, markMessageRead, replyToMessage, deleteMessage } from '../../server/admin';
import { Trash2, Reply, Check, Clock, MessageCircle } from 'lucide-react';

export const Route = createFileRoute('/admin/inbox')({
  component: InboxPage,
  loader: async () => {
    try {
      return await getMessages();
    } catch (e) {
      console.error(e);
      return [];
    }
  },
});

function InboxPage() {
  const messages = Route.useLoaderData();
  const router = useRouter();
  
  const [activeEmail, setActiveEmail] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Real-time updates via polling (every 5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      (window as any).__IS_AUTO_UPDATE__ = true;
      router.invalidate().finally(() => {
        (window as any).__IS_AUTO_UPDATE__ = false;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [router]);

  // Group messages by email (Threading)
  const threads = useMemo(() => {
    const grouped = new Map<string, typeof messages>();
    messages.forEach(msg => {
      if (!grouped.has(msg.email)) {
        grouped.set(msg.email, []);
      }
      grouped.get(msg.email)!.push(msg);
    });
    
    // Convert Map to array of threads, sorted by the latest message in each thread
    return Array.from(grouped.entries()).map(([email, msgs]) => {
      return {
        email,
        name: msgs.find(m => m.sender !== 'admin')?.name || msgs[0].name,
        latestMessage: msgs[0],
        unreadCount: msgs.filter(m => !m.isRead && m.sender !== 'admin').length,
        messages: [...msgs].reverse() // Reverse to show oldest first in chat view
      };
    }).sort((a, b) => new Date(b.latestMessage.createdAt).getTime() - new Date(a.latestMessage.createdAt).getTime());
  }, [messages]);

  const activeThread = threads.find(t => t.email === activeEmail);

  // Scroll to bottom when thread changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeThread]);

  const handleMarkRead = async (email: string) => {
    const thread = threads.find(t => t.email === email);
    if (!thread) return;
    
    // Find all unread messages from user and mark read
    const unreadMsgs = thread.messages.filter(m => !m.isRead && m.sender !== 'admin');
    for (const msg of unreadMsgs) {
      await markMessageRead({ data: { id: msg.id } });
    }
    if (unreadMsgs.length > 0) {
      router.invalidate();
    }
  };

  const handleDelete = async (email: string) => {
    if (await confirmAction('Are you sure you want to delete this entire conversation?')) {
      const thread = threads.find(t => t.email === email);
      if (thread) {
        // Delete all messages in the thread
        for (const msg of thread.messages) {
          await deleteMessage({ data: { id: msg.id } });
        }
      }
      if (activeEmail === email) setActiveEmail(null);
      router.invalidate();
    }
  };

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeThread) return;
    
    setIsReplying(true);
    // Use the id of the latest message from the user to send the reply
    const lastUserMsg = activeThread.messages.slice().reverse().find(m => m.sender !== 'admin') || activeThread.latestMessage;
    
    await replyToMessage({ data: { id: lastUserMsg.id, replyContent } });
    setIsReplying(false);
    setReplyContent('');
    showPopup('Reply sent successfully!');
    router.invalidate();
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <h1 className="text-3xl font-bold mb-6">Inbox</h1>
      
      <div className="flex-1 bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 overflow-hidden flex flex-col md:flex-row shadow-sm">
        {/* Threads List (Sidebar) */}
        <div className="w-full md:w-[350px] border-b md:border-b-0 md:border-r border-gray-200 dark:border-zinc-800 flex flex-col bg-gray-50/50 dark:bg-zinc-950/50">
          <div className="p-4 border-b border-gray-200 dark:border-zinc-800">
            <h2 className="font-semibold text-gray-700 dark:text-gray-300">Conversations</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {threads.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No conversations yet.</div>
            ) : (
              threads.map((thread) => (
                <div 
                  key={thread.email} 
                  onClick={() => {
                    setActiveEmail(thread.email);
                    handleMarkRead(thread.email);
                  }}
                  className={`p-4 border-b border-gray-200 dark:border-zinc-800 cursor-pointer transition-colors ${
                    activeEmail === thread.email 
                      ? 'bg-blue-50 dark:bg-zinc-800/80 border-l-4 border-l-blue-500' 
                      : 'hover:bg-gray-100 dark:hover:bg-zinc-800/50 border-l-4 border-l-transparent'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className={`truncate pr-2 font-medium ${thread.unreadCount > 0 ? 'text-gray-900 dark:text-white font-bold' : 'text-gray-700 dark:text-gray-300'}`}>
                      {thread.name}
                    </h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {new Date(thread.latestMessage.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <p className={`text-sm truncate ${thread.unreadCount > 0 ? 'text-gray-700 dark:text-gray-200 font-medium' : 'text-gray-500'}`}>
                      {thread.latestMessage.sender === 'admin' ? 'You: ' : ''}{thread.latestMessage.message}
                    </p>
                    {thread.unreadCount > 0 && (
                      <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {thread.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col bg-white dark:bg-zinc-900">
          {activeThread ? (
            <>
              {/* Chat Header */}
              <div className="px-6 py-4 border-b border-gray-200 dark:border-zinc-800 flex justify-between items-center bg-white dark:bg-zinc-900 z-10 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                    {activeThread.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold leading-tight">{activeThread.name}</h2>
                    <p className="text-sm text-gray-500 leading-tight">{activeThread.email}</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleDelete(activeThread.email)}
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  title="Delete Conversation"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/30 dark:bg-zinc-950/30">
                {activeThread.messages.map((msg) => {
                  const isAdmin = msg.sender === 'admin';
                  return (
                    <div key={msg.id} className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[75%] rounded-2xl px-5 py-3 ${
                        isAdmin 
                          ? 'bg-blue-600 text-white rounded-br-sm' 
                          : 'bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 text-gray-800 dark:text-gray-200 rounded-bl-sm shadow-sm'
                      }`}>
                        {!isAdmin && msg.subject && (
                          <div className="text-xs font-semibold mb-1 opacity-70 border-b border-gray-200 dark:border-zinc-700 pb-1">
                            Sub: {msg.subject}
                          </div>
                        )}
                        <div className="whitespace-pre-wrap text-sm">{msg.message}</div>
                        <div className={`text-[10px] mt-2 text-right ${isAdmin ? 'text-blue-200' : 'text-gray-400'}`}>
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={chatEndRef} />
              </div>
              
              {/* Reply Area */}
              <div className="p-4 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800">
                <form onSubmit={handleReply} className="flex gap-2 items-end">
                  <textarea 
                    required
                    value={replyContent}
                    onChange={e => setReplyContent(e.target.value)}
                    placeholder={`Reply to ${activeThread.name}...`}
                    className="flex-1 p-3 max-h-32 min-h-[50px] rounded-2xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-y text-sm"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        if (replyContent.trim()) handleReply(e as unknown as React.FormEvent);
                      }
                    }}
                  />
                  <button 
                    type="submit"
                    disabled={isReplying || !replyContent.trim()}
                    className="h-12 w-12 shrink-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
                    title="Send Reply"
                  >
                    <Reply size={20} className={isReplying ? 'animate-pulse' : ''} />
                  </button>
                </form>
                <p className="text-[10px] text-gray-400 mt-2 text-center">Press Enter to send, Shift+Enter for new line. Reply will be sent via Email.</p>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 dark:text-gray-600 space-y-4">
              <MessageCircle size={64} className="opacity-20" />
              <p>Select a conversation to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
