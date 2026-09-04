import { createFileRoute, useRouter } from '@tanstack/react-router';
import { Plus, Edit2, Trash2, X, RefreshCw, Trash, Upload } from 'lucide-react';
import { getSkills, getDeletedSkills, deleteSkill, restoreSkill, permanentlyDeleteSkill, addSkill, editSkill } from '../../server/admin';
import React, { useState } from 'react';

export const Route = createFileRoute('/admin/skills')({
  component: SkillsPage,
  loader: async () => {
    try {
      const [active, deleted] = await Promise.all([
        getSkills(),
        getDeletedSkills()
      ]);
      return { active, deleted };
    } catch (e) {
      console.error('Loader error:', e);
      throw e;
    }
  },
});

const SKILL_CATEGORIES = ['Frontend', 'Backend', 'Database', 'Data & AI', 'Tools & DevOps', 'Soft Skills', 'Other'];

function SkillsPage() {
  const { active, deleted } = Route.useLoaderData();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState<'active' | 'deleted'>('active');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    category: SKILL_CATEGORIES[0],
    level: 50,
    icon: ''
  });

  const handleDelete = async (id: string) => {
    if (confirm('Move to Recycle Bin?')) {
      await deleteSkill({ data: { id } });
      router.invalidate();
    }
  };

  const handleRestore = async (id: string) => {
    await restoreSkill({ data: { id } });
    router.invalidate();
  };

  const handlePermanentDelete = async (id: string) => {
    if (confirm('Permanently delete this skill?')) {
      await permanentlyDeleteSkill({ data: { id } });
      router.invalidate();
    }
  };

  const openEdit = (item: any) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      category: item.category || SKILL_CATEGORIES[0],
      level: item.level || 50,
      icon: item.icon || ''
    });
    setIsModalOpen(true);
  };

  const openAdd = () => {
    setEditingId(null);
    setFormData({ name: '', category: SKILL_CATEGORIES[0], level: 50, icon: '' });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (editingId) {
      await editSkill({ data: { id: editingId, ...formData, level: Number(formData.level) } });
    } else {
      await addSkill({ data: { ...formData, level: Number(formData.level) } });
    }
    
    setIsSubmitting(false);
    setIsModalOpen(false);
    router.invalidate();
  };

  const items = activeTab === 'active' ? active : deleted;

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Skills</h1>
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
          Active Skills ({active.length})
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
              <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Skill Name</th>
              <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Proficiency</th>
              <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-8 text-center text-gray-500">
                  {activeTab === 'active' ? 'No active skills found.' : 'Recycle bin is empty.'}
                </td>
              </tr>
            ) : (
              activeTab === 'active' ? (
                SKILL_CATEGORIES.map(category => {
                  const categoryItems = items.filter((item: any) => (item.category || 'Other') === category);
                  if (categoryItems.length === 0) return null;
                  return (
                    <React.Fragment key={category}>
                      <tr className="bg-gray-100/50 dark:bg-zinc-800/30">
                        <td colSpan={3} className="p-3 font-bold text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-zinc-800">
                          {category}
                        </td>
                      </tr>
                      {categoryItems.map((item: any) => (
                        <tr key={item.id} className="border-b border-gray-200 dark:border-zinc-800 last:border-0 hover:bg-gray-50 dark:hover:bg-zinc-800/50">
                          <td className="p-4 font-medium">{item.name}</td>
                          <td className="p-4">
                            <div className="w-full bg-gray-200 dark:bg-zinc-700 rounded-full h-2.5 max-w-[200px]">
                              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${item.level}%` }}></div>
                            </div>
                            <span className="text-xs text-gray-500 mt-1">{item.level}%</span>
                          </td>
                          <td className="p-4">
                            <div className="flex justify-end gap-2">
                              <button onClick={() => openEdit(item)} className="p-2 text-gray-500 hover:text-blue-600 transition-colors" title="Edit">
                                <Edit2 size={18} />
                              </button>
                              <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-500 hover:text-red-600 transition-colors" title="Move to Recycle Bin">
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  );
                })
              ) : (
                items.map((item: any) => (
                  <tr key={item.id} className="border-b border-gray-200 dark:border-zinc-800 last:border-0 hover:bg-gray-50 dark:hover:bg-zinc-800/50">
                    <td className="p-4 font-medium">
                      {item.name}
                      <span className="ml-2 px-2 py-0.5 bg-gray-100 dark:bg-zinc-800 text-xs rounded text-gray-500">{item.category || 'Other'}</span>
                    </td>
                    <td className="p-4">
                      <div className="w-full bg-gray-200 dark:bg-zinc-700 rounded-full h-2.5 max-w-[200px]">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${item.level}%` }}></div>
                      </div>
                      <span className="text-xs text-gray-500 mt-1">{item.level}%</span>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleRestore(item.id)} className="p-2 text-gray-500 hover:text-green-600 transition-colors" title="Restore">
                          <RefreshCw size={18} />
                        </button>
                        <button onClick={() => handlePermanentDelete(item.id)} className="p-2 text-gray-500 hover:text-red-600 transition-colors" title="Permanently Delete">
                          <Trash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-zinc-900 rounded-xl max-w-sm w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-zinc-800">
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-zinc-800">
              <h2 className="text-xl font-bold">{editingId ? 'Edit Skill' : 'Add New Skill'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent">
                  {SKILL_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Proficiency Level ({formData.level}%)</label>
                <input type="range" min="0" max="100" value={formData.level} onChange={e => setFormData({...formData, level: parseInt(e.target.value)})} className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Icon SVG (optional)</label>
                <input type="text" value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} placeholder="<svg>...</svg>" className="w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent font-mono text-xs" />
              </div>
              <div className="pt-4 flex justify-end gap-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium rounded hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm font-medium rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50">
                  {isSubmitting ? 'Saving...' : 'Save Skill'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
