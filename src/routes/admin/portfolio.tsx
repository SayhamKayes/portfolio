import { createFileRoute, useRouter } from '@tanstack/react-router';
import { Plus, Edit2, Trash2, X, RefreshCw, Trash, Upload } from 'lucide-react';
import { getPortfolioItems, getDeletedPortfolioItems, deletePortfolioItem, restorePortfolioItem, permanentlyDeletePortfolioItem, addPortfolioItem, editPortfolioItem } from '../../server/admin';
import { uploadImage } from '../../server/upload';
import { useState } from 'react';

export const Route = createFileRoute('/admin/portfolio')({
  component: PortfolioPage,
  loader: async () => {
    try {
      const [active, deleted] = await Promise.all([
        getPortfolioItems(),
        getDeletedPortfolioItems()
      ]);
      return { active, deleted };
    } catch (e) {
      console.error('Loader error:', e);
      throw e;
    }
  },
});

const BASE_CATEGORIES = ['Full Stack', 'AI / ML', 'Mobile', 'SaaS'];

function PortfolioPage() {
  const { active, deleted } = Route.useLoaderData();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState<'active' | 'deleted'>('active');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [newCategory, setNewCategory] = useState('');
  const [customCategories, setCustomCategories] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    category: '',
    imageUrl: '',
    link: '',
    githubLink: ''
  });

  const handleDelete = async (id: string) => {
    if (confirm('Move to Recycle Bin?')) {
      await deletePortfolioItem({ data: { id } });
      router.invalidate();
    }
  };

  const handleRestore = async (id: string) => {
    await restorePortfolioItem({ data: { id } });
    router.invalidate();
  };

  const handlePermanentDelete = async (id: string) => {
    if (confirm('Permanently delete this project? This cannot be undone.')) {
      await permanentlyDeletePortfolioItem({ data: { id } });
      router.invalidate();
    }
  };

  const openEdit = (item: any) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      description: item.description,
      technologies: item.technologies,
      category: item.category || '',
      imageUrl: item.imageUrl || '',
      link: item.link || '',
      githubLink: item.githubLink || ''
    });
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const openAdd = () => {
    setEditingId(null);
    setFormData({ title: '', description: '', technologies: '', category: '', imageUrl: '', link: '', githubLink: '' });
    setSelectedFile(null);
    setNewCategory('');
    setIsModalOpen(true);
  };

  const compressImage = (file: File, maxWidth = 1000): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL(file.type, 0.8));
        };
        img.onerror = (e) => reject(e);
      };
      reader.onerror = (e) => reject(e);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      let uploadedUrl = formData.imageUrl;
      
      if (selectedFile) {
        const base64Data = await compressImage(selectedFile);
        const res = await uploadImage({
          data: {
            filename: selectedFile.name,
            contentType: selectedFile.type,
            base64Data
          }
        });
        if (res) uploadedUrl = res;
      }
      
      const finalData = { ...formData, imageUrl: uploadedUrl };

      if (editingId) {
        await editPortfolioItem({ data: { id: editingId, ...finalData } });
      } else {
        await addPortfolioItem({ data: finalData });
      }
      
      setIsModalOpen(false);
      router.invalidate();
    } catch (error) {
      console.error("Failed to save portfolio item", error);
      alert("Failed to save. If you uploaded an image, it might still be too large.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const items = activeTab === 'active' ? active : deleted;

  const allAvailableCategories = Array.from(new Set([
    ...BASE_CATEGORIES,
    ...active.flatMap(item => item.category?.split(',') || []).map(c => c.trim()),
    ...customCategories
  ])).filter(Boolean);

  const selectedCategories = formData.category ? formData.category.split(',').map(c => c.trim()).filter(Boolean) : [];

  const toggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      setFormData({ ...formData, category: selectedCategories.filter(c => c !== cat).join(', ') });
    } else {
      setFormData({ ...formData, category: [...selectedCategories, cat].join(', ') });
    }
  };

  const handleAddNewCategory = (e: React.MouseEvent) => {
    e.preventDefault();
    const cat = newCategory.trim();
    if (cat && !allAvailableCategories.includes(cat)) {
      setCustomCategories([...customCategories, cat]);
      setFormData({ ...formData, category: [...selectedCategories, cat].join(', ') });
      setNewCategory('');
    } else if (cat && allAvailableCategories.includes(cat) && !selectedCategories.includes(cat)) {
      setFormData({ ...formData, category: [...selectedCategories, cat].join(', ') });
      setNewCategory('');
    }
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Portfolio</h1>
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
          Active Projects ({active.length})
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
              <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Project</th>
              <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Category</th>
              <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Technologies</th>
              <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">
                  {activeTab === 'active' ? 'No active portfolio items found.' : 'Recycle bin is empty.'}
                </td>
              </tr>
            ) : items.map((item) => (
              <tr key={item.id} className="border-b border-gray-200 dark:border-zinc-800 last:border-0 hover:bg-gray-50 dark:hover:bg-zinc-800/50">
                <td className="p-4 flex gap-3 items-center">
                  {item.imageUrl && <img src={item.imageUrl} alt="" className="w-12 h-12 rounded object-cover" />}
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-500 line-clamp-1">{item.description}</p>
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-zinc-800 text-sm rounded">{item.category || 'None'}</span>
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {item.technologies.split(',').filter(Boolean).slice(0, 3).map((tech, i) => (
                      <span key={i} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded">
                        {tech.trim()}
                      </span>
                    ))}
                    {item.technologies.split(',').filter(Boolean).length > 3 && <span className="px-2 py-1 bg-gray-100 dark:bg-zinc-800 text-xs rounded">+</span>}
                  </div>
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
              <h2 className="text-xl font-bold">{editingId ? 'Edit Project' : 'Add New Project'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Categories</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {allAvailableCategories.map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => toggleCategory(c)}
                      className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                        selectedCategories.includes(c) 
                          ? 'bg-blue-600 text-white border-blue-600' 
                          : 'bg-gray-100 dark:bg-zinc-800 border-transparent hover:border-blue-600'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    placeholder="Add new category..."
                    className="flex-1 p-2 text-sm rounded border border-gray-300 dark:border-zinc-700 bg-transparent"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddNewCategory(e as unknown as React.MouseEvent);
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddNewCategory}
                    disabled={!newCategory.trim()}
                    className="px-3 py-2 bg-gray-200 dark:bg-zinc-700 rounded text-sm font-medium disabled:opacity-50"
                  >
                    Add
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent min-h-[100px]" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Technologies (comma separated)</label>
                <input required type="text" value={formData.technologies} onChange={e => setFormData({...formData, technologies: e.target.value})} placeholder="React, TypeScript, Tailwind" className="w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image</label>
                <div className="flex gap-2 items-center">
                  <input type="file" accept="image/*" onChange={e => setSelectedFile(e.target.files?.[0] || null)} className="hidden" id="image-upload" />
                  <label htmlFor="image-upload" className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-zinc-800 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors text-sm font-medium">
                    <Upload size={16} /> Choose File
                  </label>
                  <span className="text-sm text-gray-500 truncate max-w-[200px]">
                    {selectedFile ? selectedFile.name : (formData.imageUrl ? 'Existing image selected' : 'No file chosen')}
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Project Link (optional)</label>
                <input type="text" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} placeholder="https://..." className="w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">GitHub Link (optional)</label>
                <input type="text" value={formData.githubLink} onChange={e => setFormData({...formData, githubLink: e.target.value})} placeholder="https://github.com/..." className="w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent" />
              </div>
              <div className="pt-4 flex justify-end gap-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium rounded hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm font-medium rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50">
                  {isSubmitting ? 'Saving...' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
