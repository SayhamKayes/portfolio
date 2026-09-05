import { createFileRoute, useRouter } from '@tanstack/react-router';
import { confirmAction } from '../../components/CustomPopup';
import { Plus, Edit2, Trash2, X, RefreshCw, Trash } from 'lucide-react';
import { getExperiences, getDeletedExperiences, deleteExperience, restoreExperience, permanentlyDeleteExperience, addExperience, editExperience } from '../../server/admin';
import { useState } from 'react';

export const Route = createFileRoute('/admin/experience')({
  component: ExperiencePage,
  loader: async () => {
    try {
      const [active, deleted] = await Promise.all([
        getExperiences(),
        getDeletedExperiences()
      ]);
      return { active, deleted };
    } catch (e) {
      console.error('Loader error:', e);
      throw e;
    }
  },
});

function ExperiencePage() {
  const { active, deleted } = Route.useLoaderData();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState<'active' | 'deleted'>('active');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    duration: '',
    description: ''
  });

  const handleDelete = async (id: string) => {
    if (await confirmAction('Move to Recycle Bin?')) {
      await deleteExperience({ data: { id } });
      router.invalidate();
    }
  };

  const handleRestore = async (id: string) => {
    await restoreExperience({ data: { id } });
    router.invalidate();
  };

  const handlePermanentDelete = async (id: string) => {
    if (await confirmAction('Permanently delete this experience?')) {
      await permanentlyDeleteExperience({ data: { id } });
      router.invalidate();
    }
  };

  const openEdit = (item: any) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      company: item.company,
      duration: item.duration,
      description: item.description
    });
    setIsModalOpen(true);
  };

  const openAdd = () => {
    setEditingId(null);
    setFormData({ title: '', company: '', duration: '', description: '' });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (editingId) {
      await editExperience({ data: { id: editingId, ...formData } });
    } else {
      await addExperience({ data: formData });
    }
    
    setIsSubmitting(false);
    setIsModalOpen(false);
    router.invalidate();
  };

  const items = activeTab === 'active' ? active : deleted;

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Experience</h1>
        <button 
          onClick={openAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          <Plus size={18} />
          <span>Add New</span>
        </button>
      </div>
      
      <div className="flex gap-4 border-b border-gray-200 dark:border-zinc-800">
        <button 
          onClick={() => setActiveTab('active')}
          className={`pb-2 px-1 border-b-2 font-medium transition-colors ${activeTab === 'active' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
        >
          Active Experience ({active.length})
        </button>
        <button 
          onClick={() => setActiveTab('deleted')}
          className={`pb-2 px-1 border-b-2 font-medium transition-colors ${activeTab === 'deleted' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
        >
          Recycle Bin ({deleted.length})
        </button>
      </div>
      
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-zinc-800/50 border-b border-gray-200 dark:border-zinc-800">
              <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Role & Company</th>
              <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Duration</th>
              <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Description</th>
              <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">
                  {activeTab === 'active' ? 'No active experience found.' : 'Recycle bin is empty.'}
                </td>
              </tr>
            ) : items.map((item) => (
              <tr key={item.id} className="border-b border-gray-200 dark:border-zinc-800 last:border-0 hover:bg-gray-50 dark:hover:bg-zinc-800/50">
                <td className="p-4">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.company}</p>
                </td>
                <td className="p-4 text-sm">{item.duration}</td>
                <td className="p-4">
                  <p className="text-sm line-clamp-2 max-w-sm">{item.description}</p>
                </td>
                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    {activeTab === 'active' ? (
                      <>
                        <button onClick={() => openEdit(item)} className="p-2 text-gray-500 hover:text-blue-600 transition-colors" title="Edit">
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-500 hover:text-red-600 transition-colors" title="Move to Recycle Bin">
                          <Trash2 size={18} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleRestore(item.id)} className="p-2 text-gray-500 hover:text-green-600 transition-colors" title="Restore">
                          <RefreshCw size={18} />
                        </button>
                        <button onClick={() => handlePermanentDelete(item.id)} className="p-2 text-gray-500 hover:text-red-600 transition-colors" title="Permanently Delete">
                          <Trash size={18} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-zinc-900 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-zinc-800">
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-zinc-800">
              <h2 className="text-xl font-bold">{editingId ? 'Edit Experience' : 'Add New Experience'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Job Title</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Company</label>
                <input required type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Duration</label>
                <input required type="text" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} placeholder="e.g. Jan 2020 - Present" className="w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent min-h-[100px]" />
              </div>
              <div className="pt-4 flex justify-end gap-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium rounded hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm font-medium rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50">
                  {isSubmitting ? 'Saving...' : 'Save Experience'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
