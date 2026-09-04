import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useState } from 'react';
import { getMessages, markMessageRead, replyToMessage, deleteMessage } from '../../server/admin';
import { Trash2, Reply, Check, Clock } from 'lucide-react';

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
  
  const [activeMessage, setActiveMessage] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  const selectedMsg = messages.find(m => m.id === activeMessage);

  const handleMarkRead = async (id: string, currentStatus: boolean) => {
    if (!currentStatus) {
      await markMessageRead({ data: { id } });
      router.invalidate();
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      await deleteMessage({ data: { id } });
      if (activeMessage === id) setActiveMessage(null);
      router.invalidate();
    }
  };

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeMessage) return;
    setIsReplying(true);
    await replyToMessage({ data: { id: activeMessage, replyContent } });
    setIsReplying(false);
    setReplyContent('');
    alert('Reply sent successfully!');
    router.invalidate();
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <h1 className="text-3xl font-bold mb-6">Inbox</h1>
      
      <div className="flex-1 bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 overflow-hidden flex flex-col md:flex-row">
        {/* Messages List */}
        <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-gray-200 dark:border-zinc-800 flex flex-col overflow-y-auto">
          {messages.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No messages yet.</div>
          ) : (
            messages.map((msg) => (
              <div 
                key={msg.id} 
                onClick={() => {
                  setActiveMessage(msg.id);
                  handleMarkRead(msg.id, msg.isRead);
                }}
                className={`p-4 border-b border-gray-200 dark:border-zinc-800 cursor-pointer transition-colors ${
                  activeMessage === msg.id 
                    ? 'bg-blue-50 dark:bg-zinc-800' 
                    : !msg.isRead 
                      ? 'bg-gray-50 dark:bg-zinc-900/50 font-semibold' 
                      : 'hover:bg-gray-50 dark:hover:bg-zinc-800/50'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="truncate pr-2">{msg.name}</h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm truncate text-gray-600 dark:text-gray-400">{msg.subject || 'No Subject'}</p>
              </div>
            ))
          )}
        </div>

        {/* Message Details & Reply */}
        <div className="flex-1 flex flex-col bg-gray-50 dark:bg-zinc-950/50">
          {selectedMsg ? (
            <>
              <div className="p-6 border-b border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold mb-2">{selectedMsg.subject || 'No Subject'}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      From: <span className="font-medium text-gray-900 dark:text-white">{selectedMsg.name}</span> &lt;{selectedMsg.email}&gt;
                    </p>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                      <Clock size={14} /> {new Date(selectedMsg.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <button 
                    onClick={() => handleDelete(selectedMsg.id)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                    title="Delete Message"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="p-6 flex-1 overflow-y-auto">
                <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 bg-white dark:bg-zinc-900 p-4 rounded-lg border border-gray-200 dark:border-zinc-800">
                  {selectedMsg.message}
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Reply size={18} /> Reply
                  </h3>
                  <form onSubmit={handleReply} className="space-y-4">
                    <textarea 
                      required
                      value={replyContent}
                      onChange={e => setReplyContent(e.target.value)}
                      placeholder={`Type your reply to ${selectedMsg.name}...`}
                      className="w-full p-4 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 min-h-[150px]"
                    />
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-500">
                        * Sending emails currently simulates a console log.
                      </p>
                      <button 
                        type="submit"
                        disabled={isReplying}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                      >
                        {isReplying ? 'Sending...' : 'Send Reply'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a message to read and reply.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
