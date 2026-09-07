import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useRef, useEffect, useMemo } from 'react';
import { 
  getMessages, 
  deleteMessage, 
  replyToMessage, 
  toggleMessageRead, 
  toggleMessageReplied,
  toggleMessageIgnored
} from '../../server/admin';
import { 
  Trash2, 
  Reply, 
  Check, 
  Clock, 
  MessageCircle,
  MoreVertical,
  CheckCircle,
  Eye,
  EyeOff,
  BellOff
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

export const Route = createFileRoute('/admin/inbox')({
  component: InboxPage,
});

type MessageData = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  isRead: boolean;
  isReplied: boolean;
  isIgnored: boolean;
  thread: any;
  sender: string;
  createdAt: string | Date;
};

function InboxPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['inboxMessages'],
    queryFn: () => getMessages(),
    refetchInterval: 5000,
  });

  const selectedMessage = messages.find((m: MessageData) => m.id === selectedMessageId) || null;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedMessage]);

  const toggleReadMutation = useMutation({
    mutationFn: toggleMessageRead,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['inboxMessages'] });
      if (data) toast.success(data.isRead ? 'Marked as read' : 'Marked as unread');
    },
  });

  const toggleRepliedMutation = useMutation({
    mutationFn: toggleMessageReplied,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['inboxMessages'] });
      if (data) toast.success(data.isReplied ? 'Marked as replied' : 'Unmarked as replied');
    },
  });

  const toggleIgnoredMutation = useMutation({
    mutationFn: toggleMessageIgnored,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['inboxMessages'] });
      if (data) toast.success(data.isIgnored ? 'Client Ignored' : 'Client Unignored');
    },
  });

  const replyMutation = useMutation({
    mutationFn: replyToMessage,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success('Reply sent!');
        setReplyContent('');
        queryClient.invalidateQueries({ queryKey: ['inboxMessages'] });
      } else {
        toast.error('Failed to send reply');
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMessage,
    onSuccess: () => {
      toast.success('Conversation deleted');
      setSelectedMessageId(null);
      queryClient.invalidateQueries({ queryKey: ['inboxMessages'] });
    },
  });

  const handleSelectMessage = (msg: MessageData) => {
    setSelectedMessageId(msg.id);
    if (!msg.isRead) {
      toggleReadMutation.mutate({ data: { id: msg.id, isRead: true } });
    }
  };

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMessage || !replyContent.trim()) return;
    replyMutation.mutate({ data: { id: selectedMessage.id, replyContent } });
  };

  const groupedThreads = useMemo(() => {
    const grouped = new Map<string, MessageData[]>();
    messages.forEach((msg: MessageData) => {
      if (!grouped.has(msg.email)) {
        grouped.set(msg.email, []);
      }
      grouped.get(msg.email)!.push(msg);
    });
    
    return Array.from(grouped.entries()).map(([email, msgs]) => {
      const primaryMsg = msgs[0]; // Latest message
      
      let combinedThread: any[] = [];
      [...msgs].reverse().forEach(m => {
        const threadArr = Array.isArray(m.thread) ? m.thread : [];
        const hasInitialMessage = threadArr.some((tMsg: any) => tMsg.message === m.message);
        
        if (!hasInitialMessage) {
           combinedThread.push({
             sender: m.sender === 'admin' ? 'admin' : 'client',
             message: m.message,
             subject: m.subject,
             timestamp: m.createdAt
           });
        }
        
        combinedThread = [...combinedThread, ...threadArr];
      });

      return {
        ...primaryMsg,
        thread: combinedThread,
      };
    });
  }, [messages]);

  const filteredThreads = groupedThreads.filter((t: MessageData) =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.email.toLowerCase().includes(search.toLowerCase())
  );

  const renderThreadItem = (msg: any, index: number) => {
    if (msg.sender === 'admin') {
      return (
        <div key={index} className="flex flex-col items-end mb-4">
          <div className="bg-blue-600 text-white p-4 rounded-xl rounded-tr-sm max-w-[85%] sm:max-w-[70%] shadow-sm">
            <div className="text-xs text-blue-200 mb-1">You &bull; {format(new Date(msg.timestamp), 'PP p')}</div>
            <div className="whitespace-pre-wrap text-sm">{msg.content}</div>
          </div>
        </div>
      );
    }
    return (
      <div key={index} className="flex flex-col items-start mb-4">
        <div className="bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white p-4 rounded-xl rounded-tl-sm max-w-[95%] sm:max-w-[85%] border border-gray-200 dark:border-zinc-700 shadow-sm">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Client &bull; {format(new Date(msg.timestamp), 'PP p')}</div>
          {msg.subject && (
            <div className="text-xs font-semibold mb-2 opacity-70 border-b border-gray-200 dark:border-zinc-700 pb-1">
              Sub: {msg.subject}
            </div>
          )}
          <div className="whitespace-pre-wrap text-sm">{msg.message}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Inbox</h1>
      </div>
      
      <div className="flex-1 bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 overflow-hidden flex flex-col md:flex-row shadow-sm min-h-0">
        
        {/* Sidebar */}
        <div className={`w-full md:w-[350px] lg:w-[400px] border-r border-gray-200 dark:border-zinc-800 flex flex-col bg-gray-50/50 dark:bg-zinc-950/50 shrink-0 ${selectedMessageId ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-4 border-b border-gray-200 dark:border-zinc-800 space-y-4">
            <input
              type="text"
              placeholder="Search conversations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="p-8 text-center text-gray-500">Loading messages...</div>
            ) : filteredThreads.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No messages found.</div>
            ) : (
              filteredThreads.map((msg: MessageData) => (
                <div 
                  key={msg.id} 
                  onClick={() => handleSelectMessage(msg)}
                  className={`p-4 border-b border-gray-200 dark:border-zinc-800 cursor-pointer transition-colors relative group ${
                    selectedMessageId === msg.id 
                      ? 'bg-blue-50 dark:bg-zinc-800/80 border-l-4 border-l-blue-500' 
                      : 'hover:bg-gray-100 dark:hover:bg-zinc-800/50 border-l-4 border-l-transparent'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1 gap-2">
                    <h3 className={`truncate font-medium ${!msg.isRead ? 'text-gray-900 dark:text-white font-bold' : 'text-gray-700 dark:text-gray-300'}`}>
                      {msg.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      {msg.isIgnored && <span title="Ignored"><BellOff className="w-3 h-3 text-red-500" /></span>}
                      {!msg.isRead && <span className="w-2 h-2 rounded-full bg-blue-500"></span>}
                      {msg.isReplied && <CheckCircle className="w-3 h-3 text-green-500" />}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 truncate">{msg.email}</p>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-2 top-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="relative dropdown-container">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          const el = e.currentTarget.nextElementSibling;
                          if (el) el.classList.toggle('hidden');
                        }}
                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded bg-white dark:bg-zinc-800 shadow-sm border border-gray-200 dark:border-zinc-700"
                      >
                        <MoreVertical size={16} />
                      </button>
                      <div className="hidden absolute right-0 mt-1 w-48 bg-white dark:bg-zinc-800 rounded-md shadow-lg border border-gray-200 dark:border-zinc-700 z-50 py-1">
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleReadMutation.mutate({ data: { id: msg.id, isRead: !msg.isRead } }); }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700 flex items-center gap-2"
                        >
                          {msg.isRead ? <><EyeOff size={14} /> Mark as unread</> : <><Eye size={14} /> Mark as read</>}
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleRepliedMutation.mutate({ data: { id: msg.id, isReplied: !msg.isReplied } }); }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700 flex items-center gap-2"
                        >
                          {msg.isReplied ? <><Check size={14} /> Unmark as replied</> : <><CheckCircle size={14} /> Mark as replied</>}
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleIgnoredMutation.mutate({ data: { id: msg.id, isIgnored: !msg.isIgnored } }); }}
                          className="w-full text-left px-4 py-2 text-sm text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 flex items-center gap-2"
                        >
                          <BellOff size={14} /> {msg.isIgnored ? 'Unignore Client' : 'Ignore Client'}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (window.confirm('Delete this conversation?')) deleteMutation.mutate({ data: { id: msg.id } });
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chat Window */}
        <div className={`flex-1 flex flex-col bg-white dark:bg-zinc-900 min-w-0 ${!selectedMessageId ? 'hidden md:flex' : 'flex'}`}>
          {selectedMessage ? (
            <>
              {/* Header */}
              <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-zinc-800 flex justify-between items-start shrink-0">
                <div>
                  <button
                    onClick={() => setSelectedMessageId(null)}
                    className="md:hidden text-sm text-blue-500 mb-2 font-medium"
                  >
                    &larr; Back to list
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold shrink-0">
                      {selectedMessage.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="text-lg font-bold leading-tight truncate">{selectedMessage.name}</h2>
                      <p className="text-sm text-gray-500 leading-tight truncate">{selectedMessage.email}</p>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    if (window.confirm('Delete this conversation?')) deleteMutation.mutate({ data: { id: selectedMessage.id } });
                  }}
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50/30 dark:bg-zinc-950/30">
                <div className="space-y-2">
                  {groupedThreads.find((t: MessageData) => t.id === selectedMessage.id)?.thread.map((msg: any, i: number) => renderThreadItem(msg, i))}
                  <div ref={chatEndRef} />
                </div>
              </div>
              
              {/* Reply Area */}
              <div className="p-4 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 shrink-0">
                <form onSubmit={handleReply} className="flex gap-2 items-end">
                  <textarea 
                    required
                    value={replyContent}
                    onChange={e => setReplyContent(e.target.value)}
                    placeholder={`Reply to ${selectedMessage.name}...`}
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
                    disabled={replyMutation.isPending || !replyContent.trim()}
                    className="h-12 w-12 shrink-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
                  >
                    <Reply size={20} className={replyMutation.isPending ? 'animate-pulse' : ''} />
                  </button>
                </form>
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
