import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Loader2, Search, Trash2, MailOpen, Mail, ExternalLink, Link as LinkIcon, Paperclip, CheckCircle, MoreVertical, Eye, EyeOff, BellOff } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';

import {
  getClientBookings,
  markClientBookingRead,
  toggleClientBookingRead,
  toggleClientBookingReplied,
  toggleClientBookingIgnored,
  deleteClientBooking,
  replyToClientBooking
} from '../../server/admin';

export const Route = createFileRoute('/admin/client-bookings')({
  component: ClientBookingsPage,
});

type ClientBooking = {
  id: string;
  fullName: string;
  companyName: string | null;
  contactMethod: string;
  contactValue: string;
  projectType: string;
  customProjectType: string | null;
  budget: string;
  timeline: string;
  projectDetails: string;
  referenceLinks: string[];
  fileUrls: string[];
  thread: any;
  isRead: boolean;
  isReplied: boolean;
  isIgnored: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
};

function ClientBookingsPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['clientBookings'],
    queryFn: () => getClientBookings(),
    refetchInterval: 5000,
  });

  const selectedBooking = bookings.find((b: ClientBooking) => b.id === selectedBookingId) || null;

  const markReadMutation = useMutation({
    mutationFn: markClientBookingRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientBookings'] });
    },
  });

  const toggleReadMutation = useMutation({
    mutationFn: toggleClientBookingRead,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['clientBookings'] });
      if (data) {
        toast.success(data.isRead ? 'Marked as read' : 'Marked as unread');
      }
    },
  });

  const toggleRepliedMutation = useMutation({
    mutationFn: toggleClientBookingReplied,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['clientBookings'] });
      if (data) {
        toast.success(data.isReplied ? 'Marked as replied' : 'Unmarked as replied');
      }
    },
  });

  const toggleIgnoredMutation = useMutation({
    mutationFn: toggleClientBookingIgnored,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['clientBookings'] });
      if (data) {
        toast.success(data.isIgnored ? 'Client Ignored. Future messages will be silenced.' : 'Client Unignored.');
      }
    },
  });

  const replyMutation = useMutation({
    mutationFn: replyToClientBooking,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success('Reply sent & marked as replied!');
        setReplyContent('');
        queryClient.invalidateQueries({ queryKey: ['clientBookings'] });
      } else {
        toast.error('Failed to send reply');
      }
    },
    onError: () => toast.error('Failed to send reply'),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteClientBooking,
    onSuccess: () => {
      toast.success('Booking deleted');
      setSelectedBookingId(null);
      queryClient.invalidateQueries({ queryKey: ['clientBookings'] });
    },
    onError: () => toast.error('Failed to delete booking'),
  });

  const handleSelectBooking = (booking: ClientBooking) => {
    setSelectedBookingId(booking.id);
    if (!booking.isRead) {
      markReadMutation.mutate({ data: { id: booking.id } });
    }
  };

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking || !replyContent.trim()) return;
    replyMutation.mutate({ data: { id: selectedBooking.id, replyContent } });
  };

  const handleToggleRead = (id: string, currentStatus: boolean) => {
    toggleReadMutation.mutate({ data: { id, isRead: !currentStatus } });
  };

  const handleToggleReplied = (id: string, currentStatus: boolean) => {
    toggleRepliedMutation.mutate({ data: { id, isReplied: !currentStatus } });
  };

  const handleToggleIgnored = (id: string, currentStatus: boolean) => {
    toggleIgnoredMutation.mutate({ data: { id, isIgnored: !currentStatus } });
  };

  const handleDelete = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this booking?')) {
      deleteMutation.mutate({ data: { id } });
    }
  };

  const getContactLink = (method: string, value: string) => {
    const cleanNum = value.replace(/[^\d+]/g, '');
    const cleanUser = value.replace('@', '').trim();
    if (method === 'whatsapp') return `https://wa.me/${cleanNum}`;
    if (method === 'messenger') return `https://m.me/${cleanUser}`;
    if (method === 'instagram') return `https://instagram.com/${cleanUser}`;
    return null;
  };

  const filteredBookings = bookings.filter((b: ClientBooking) =>
    b.fullName.toLowerCase().includes(search.toLowerCase()) ||
    (b.companyName && b.companyName.toLowerCase().includes(search.toLowerCase())) ||
    b.projectType.toLowerCase().includes(search.toLowerCase())
  );

  const renderThreadItem = (msg: any, index: number) => {
    if (msg.sender === 'admin') {
      return (
        <div key={index} className="flex flex-col items-end mb-4">
          <div className="bg-blue-600 text-white p-4 rounded-xl rounded-tr-sm max-w-[85%] sm:max-w-[70%]">
            <div className="text-xs text-blue-200 mb-1">You &bull; {format(new Date(msg.timestamp), 'PP p')}</div>
            <div className="whitespace-pre-wrap text-sm">{msg.content}</div>
          </div>
        </div>
      );
    }

    return (
      <div key={index} className="flex flex-col items-start mb-4">
        <div className="bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white p-4 rounded-xl rounded-tl-sm max-w-[95%] sm:max-w-[85%] border border-gray-200 dark:border-zinc-700">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Client &bull; {format(new Date(msg.timestamp), 'PP p')}</div>
          <div className="whitespace-pre-wrap text-sm mb-3">
            {msg.projectDetails}
          </div>
          {(msg.referenceLinks?.length > 0 || msg.fileUrls?.length > 0) && (
            <div className="space-y-2 mt-2 pt-2 border-t border-gray-200 dark:border-zinc-700">
              {msg.referenceLinks?.map((link: string, i: number) => (
                <a
                  key={`link-${i}`}
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 p-2 text-xs text-blue-600 dark:text-blue-400 bg-white dark:bg-zinc-900 rounded border border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-950 transition-colors"
                >
                  <LinkIcon className="w-3 h-3 shrink-0" />
                  <span className="truncate">{link}</span>
                  <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
                </a>
              ))}
              {msg.fileUrls?.map((url: string, i: number) => {
                const filename = url.split('/').pop() || `File ${i + 1}`;
                return (
                  <a
                    key={`file-${i}`}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 p-2 text-xs text-gray-700 dark:text-gray-300 bg-white dark:bg-zinc-900 rounded border border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-950 transition-colors"
                  >
                    <Paperclip className="w-3 h-3 shrink-0 text-gray-400" />
                    <span className="truncate font-medium">{filename}</span>
                    <ExternalLink className="w-3 h-3 ml-auto text-gray-400" />
                  </a>
                )
              })}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold">Client Bookings</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage project requests and send replies.</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search clients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex-1 min-h-0 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden flex flex-col md:flex-row">

        {/* List View */}
        <div className={`w-full md:w-1/3 border-r border-gray-200 dark:border-zinc-800 flex flex-col h-full ${selectedBooking ? 'hidden md:flex' : 'flex'}`}>
          <div className="overflow-y-auto flex-1 p-2 space-y-1">
            {isLoading ? (
              <div className="flex justify-center p-8">
                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
              </div>
            ) : filteredBookings.length === 0 ? (
              <div className="text-center p-8 text-gray-500">No bookings found.</div>
            ) : (
              filteredBookings.map((b: ClientBooking) => (
                <button
                  key={b.id}
                  onClick={() => handleSelectBooking(b)}
                  className={`w-full text-left p-4 rounded-lg transition-colors ${selectedBooking?.id === b.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                      : 'hover:bg-gray-50 dark:hover:bg-zinc-800 border-transparent'
                    } border`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className={`font-semibold ${!b.isRead ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                      {b.fullName}
                    </h3>
                    <div className="flex items-center gap-2">
                      {b.isIgnored && <span title="Ignored"><BellOff className="w-3 h-3 text-red-500" /></span>}
                      {!b.isRead && <span className="w-2 h-2 rounded-full bg-blue-500"></span>}
                      {b.isReplied && <CheckCircle className="w-3 h-3 text-green-500" />}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 truncate">
                    {b.projectType === 'other' ? b.customProjectType : b.projectType.replace(/_/g, ' ')}
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <span>{format(new Date(b.createdAt), 'MMM d, yyyy')}</span>
                    <span className="font-medium">{b.budget}</span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Detail View */}
        <div className={`w-full md:w-2/3 h-full flex flex-col ${!selectedBooking ? 'hidden md:flex' : 'flex'}`}>
          {selectedBooking ? (
            <div className="flex flex-col h-full overflow-hidden">
              {/* Header */}
              <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-zinc-800 flex justify-between items-start shrink-0">
                <div>
                  <button
                    onClick={() => setSelectedBookingId(null)}
                    className="md:hidden text-sm text-blue-500 mb-2 font-medium"
                  >
                    &larr; Back to list
                  </button>
                  <h2 className="text-xl font-bold">{selectedBooking.fullName}</h2>
                  {selectedBooking.companyName && (
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Company: {selectedBooking.companyName}</p>
                  )}
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Contact: <span className="font-medium text-gray-900 dark:text-white capitalize">{selectedBooking.contactMethod.replace(/_/g, ' ')}</span>
                    {selectedBooking.contactValue ? ` (${selectedBooking.contactValue})` : ''}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleToggleRead(selectedBooking.id, selectedBooking.isRead)}
                    className="p-2 text-gray-500 hover:text-blue-500 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                    title={selectedBooking.isRead ? "Mark as Unread" : "Mark as Read"}
                  >
                    {selectedBooking.isRead ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleToggleRead(selectedBooking.id, selectedBooking.isRead)}>
                        {selectedBooking.isRead ? 'Mark as Unread' : 'Mark as Read'}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleToggleReplied(selectedBooking.id, selectedBooking.isReplied)}>
                        {selectedBooking.isReplied ? 'Unmark as Replied' : 'Mark as Replied'}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleToggleIgnored(selectedBooking.id, selectedBooking.isIgnored)}>
                        {selectedBooking.isIgnored ? 'Unignore Client' : 'Ignore Client'}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(selectedBooking.id)} className="text-red-500 focus:text-red-500 focus:bg-red-50 dark:focus:bg-red-950">
                        Delete Booking
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Content body */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-zinc-800/50 p-4 rounded-xl border border-gray-200 dark:border-zinc-800">
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Project Type</span>
                    <span className="font-medium capitalize">{selectedBooking.projectType === 'other' ? selectedBooking.customProjectType : selectedBooking.projectType.replace(/_/g, ' ')}</span>
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Budget</span>
                    <span className="font-medium">{selectedBooking.budget}</span>
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Timeline</span>
                    <span className="font-medium capitalize">{selectedBooking.timeline.replace(/_/g, ' ')}</span>
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Date Received</span>
                    <span className="font-medium">{format(new Date(selectedBooking.createdAt), 'PPpp')}</span>
                  </div>
                </div>

                {/* Conversation Thread */}
                <div className="mt-6">
                  <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-500">Conversation History</h3>
                  <div className="space-y-2">
                    {(() => {
                      let fullThread = [];
                      const threadArr = Array.isArray(selectedBooking.thread) ? selectedBooking.thread : [];
                      const hasInitialMessage = threadArr.some((m: any) => m.projectDetails === selectedBooking.projectDetails);
                      
                      if (!hasInitialMessage) {
                        fullThread.push({
                          sender: 'client',
                          projectDetails: selectedBooking.projectDetails,
                          referenceLinks: selectedBooking.referenceLinks,
                          fileUrls: selectedBooking.fileUrls,
                          timestamp: selectedBooking.createdAt
                        });
                      }
                      
                      fullThread = [...fullThread, ...threadArr];
                      
                      return fullThread.map((msg: any, i: number) => renderThreadItem(msg, i));
                    })()}
                  </div>
                </div>
              </div>

              {/* Reply Box */}
              <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50 shrink-0">
                {selectedBooking.isReplied && (
                  <div className="flex items-center justify-between text-green-600 dark:text-green-500 font-medium p-3 mb-4 bg-green-50 dark:bg-green-500/10 rounded-lg border border-green-200 dark:border-green-500/20">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      You have replied to this booking.
                    </div>
                    <button 
                      onClick={() => handleToggleReplied(selectedBooking.id, true)} 
                      className="text-sm font-semibold underline hover:text-green-700 dark:hover:text-green-400"
                    >
                      Unmark
                    </button>
                  </div>
                )}
                
                {selectedBooking.contactMethod === 'email' ? (
                  <form onSubmit={handleReply} className="space-y-3">
                    <h3 className="font-semibold text-sm">Send Email Reply</h3>
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Write your response here..."
                      className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24 text-sm"
                      required
                    />
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={replyMutation.isPending}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                      >
                        {replyMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                        Send Reply
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="text-sm text-gray-500 dark:text-gray-400 p-4 border border-gray-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-950">
                    This client chose <strong>{selectedBooking.contactMethod}</strong>. Please reply manually: {' '}
                    <a 
                      href={getContactLink(selectedBooking.contactMethod, selectedBooking.contactValue) || '#'} 
                      target="_blank" 
                      rel="noreferrer"
                      className="font-medium text-blue-500 hover:underline"
                    >
                      {selectedBooking.contactValue}
                    </a>
                    
                    {!selectedBooking.isReplied && (
                      <button
                        onClick={() => handleToggleReplied(selectedBooking.id, false)}
                        className="mt-3 block text-blue-500 hover:underline font-medium"
                      >
                        Mark as Replied
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 space-y-4 p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center">
                <MailOpen className="w-8 h-8 text-gray-400" />
              </div>
              <p>Select a booking from the list to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
