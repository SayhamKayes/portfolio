import { createFileRoute, useRouter } from '@tanstack/react-router';
import { showPopup, confirmAction } from '../../components/CustomPopup';
import { useState, useEffect } from 'react';
import { getSiteSettings, updateSiteSetting, getSiteSettingBackups, createSiteSettingBackup, deleteSiteSettingBackup, getSkills } from '../../server/admin';
import { getLoginSettings, updateLoginSettings, logout } from '../../server/auth';
import { Palette, Home, User, Mail, RotateCcw, Save, Upload, Type, History, Trash2, X, Lock, LogOut } from 'lucide-react';
import { uploadImage } from '../../server/upload';

export const Route = createFileRoute('/admin/settings')({
  component: SettingsPage,
  loader: async () => {
    const [settings, skills] = await Promise.all([getSiteSettings(), getSkills()]);
    return { settings, skills };
  },
});



const TYPOGRAPHY_KEYS = [
  { key: 'globalFont', label: 'Global Font Family (Default)' },
  { key: 'headingFont', label: 'Heading Font Family' },
  { key: 'pFont', label: 'Paragraph Font Family' },
];

const FONTS = [
  { value: '', label: 'Default (Inter)' },
  { value: 'Roboto', label: 'Roboto' },
  { value: 'Outfit', label: 'Outfit' },
  { value: 'Poppins', label: 'Poppins' },
  { value: 'Playfair Display', label: 'Playfair Display' },
  { value: 'Fira Code', label: 'Fira Code (Monospace)' },
];

const COUNTRIES = [
  'United States of America', 'Canada', 'United Kingdom', 'Germany',
  'France', 'Spain', 'Australia', 'Bangladesh', 'India', 'United Arab Emirates',
  'South Africa', 'Saudi Arabia', 'Malaysia'
];

function SettingsPage() {
  const { settings, skills } = Route.useLoaderData();
  const [activeTab, setActiveTab] = useState('color_mode');

  // Initialize state from database or defaults
  const [formData, setFormData] = useState(() => {
    const initialState: Record<string, string> = {};
    settings.forEach((s: any) => {
      initialState[s.key] = s.value;
    });
    return initialState;
  });

  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const [aboutImageFile, setAboutImageFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleCountryToggle = (country: string) => {
    const currentStr = formData['aboutCountries'] || '';
    const current = currentStr.split(',').map(c => c.trim()).filter(Boolean);
    if (current.includes(country)) {
      handleChange('aboutCountries', current.filter(c => c !== country).join(', '));
    } else {
      handleChange('aboutCountries', [...current, country].join(', '));
    }
  };

  const handleSpecialityToggle = (skillName: string) => {
    const currentStr = formData['heroSpecialities'] || '';
    const current = currentStr.split(',').map((s: string) => s.trim()).filter(Boolean);
    if (current.includes(skillName)) {
      handleChange('heroSpecialities', current.filter((s: string) => s !== skillName).join(', '));
    } else {
      if (current.length >= 5) {
        showPopup('Maximum 5 skills allowed!');
        return;
      }
      handleChange('heroSpecialities', [...current, skillName].join(', '));
    }
  };



  const handleResetTypography = async () => { if (await confirmAction('Are you sure you want to reset all typography to default?')) {
      const newForm = { ...formData };
      TYPOGRAPHY_KEYS.forEach(t => {
        newForm[t.key] = '';
      });
      setFormData(newForm);
    }
  };

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Max dimensions
          const MAX_SIZE = 1200;
          if (width > height && width > MAX_SIZE) {
            height *= MAX_SIZE / width;
            width = MAX_SIZE;
          } else if (height > MAX_SIZE) {
            width *= MAX_SIZE / height;
            height = MAX_SIZE;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.8));
        };
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const dataToSave = { ...formData };

      if (heroImageFile) {
        const base64Data = await toBase64(heroImageFile);
        const res = await uploadImage({
          data: { filename: heroImageFile.name, contentType: heroImageFile.type, base64Data }
        });
        if (res) dataToSave.heroImage = res;
      }

      if (aboutImageFile) {
        const base64Data = await toBase64(aboutImageFile);
        const res = await uploadImage({
          data: { filename: aboutImageFile.name, contentType: aboutImageFile.type, base64Data }
        });
        if (res) dataToSave.aboutProfilePic = res;
      }

      const promises = Object.entries(dataToSave).map(([key, value]) => {
        return updateSiteSetting({ data: { key, value } });
      });
      await Promise.all(promises);

      // Update local state with new URLs if uploaded
      setFormData(dataToSave);
      setHeroImageFile(null);
      setAboutImageFile(null);

      showPopup('Settings saved successfully!');
    } catch (e) {
      showPopup('Failed to save settings', "error");
    }
    setIsSaving(false);
  };

  const [backups, setBackups] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    getSiteSettingBackups().then(setBackups);
  }, []);

  const handleCreateHeroBackup = async () => {
    const heroData = {
      heroName: formData['heroName'] || '',
      heroDesignation: formData['heroDesignation'] || '',
      heroDescription: formData['heroDescription'] || '',
      heroImage: formData['heroImage'] || ''
    };

    await createSiteSettingBackup({
      data: {
        key: 'hero_backup',
        value: JSON.stringify(heroData)
      }
    });
    getSiteSettingBackups().then(setBackups);
    showPopup('Backup created successfully!');
  };

  const handleRestoreHeroBackup = async (backupValue: string) => {
    if (await confirmAction('Are you sure you want to restore this backup? Unsaved changes will be lost.')) {
      try {
        const parsed = JSON.parse(backupValue);
        setFormData(prev => ({ ...prev, ...parsed }));
        showPopup('Backup loaded into form. Click Save All Settings to apply.');
      } catch (e) {
        showPopup('Failed to parse backup data.', "error");
      }
    }
  };

  const handleDeleteBackup = async (id: string) => {
    if (await confirmAction('Delete this backup permanently?')) {
      await deleteSiteSettingBackup({ data: { id } });
      getSiteSettingBackups().then(setBackups);
    }
  };

  const handleCreateAboutBackup = async () => {
    const aboutData = {
      aboutProfilePic: formData['aboutProfilePic'] || '',
      aboutDescription: formData['aboutDescription'] || '',
      aboutExpYears: formData['aboutExpYears'] || '',
      aboutProjects: formData['aboutProjects'] || '',
      aboutClients: formData['aboutClients'] || '',
      aboutCountries: formData['aboutCountries'] || '',
      aboutCard1Title: formData['aboutCard1Title'] || '',
      aboutCard1Desc: formData['aboutCard1Desc'] || '',
      aboutCard2Title: formData['aboutCard2Title'] || '',
      aboutCard2Desc: formData['aboutCard2Desc'] || '',
      aboutCard3Title: formData['aboutCard3Title'] || '',
      aboutCard3Desc: formData['aboutCard3Desc'] || '',
      aboutCard4Title: formData['aboutCard4Title'] || '',
      aboutCard4Desc: formData['aboutCard4Desc'] || '',
    };

    await createSiteSettingBackup({
      data: {
        key: 'about_backup',
        value: JSON.stringify(aboutData)
      }
    });
    getSiteSettingBackups().then(setBackups);
    showPopup('Backup created successfully!');
  };

  const handleRestoreAboutBackup = async (backupValue: string) => {
    if (await confirmAction('Are you sure you want to restore this backup? Unsaved changes will be lost.')) {
      try {
        const parsed = JSON.parse(backupValue);
        setFormData(prev => ({ ...prev, ...parsed }));
        showPopup('Backup loaded into form. Click Save All Settings to apply.');
      } catch (e) {
        showPopup('Failed to parse backup data.', "error");
      }
    }
  };

  const tabs = [
    { id: 'color_mode', label: 'Color Mode', icon: Palette },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'typography', label: 'Typography', icon: Type },
    { id: 'hero', label: 'Hero Section', icon: Home },
    { id: 'about', label: 'About & Stats', icon: User },
    { id: 'contact', label: 'Contact & Social', icon: Mail },
    { id: 'login', label: 'Login Settings', icon: Lock },
  ];

  const [loginData, setLoginData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    emailVerification: false,
    phoneVerification: false,
    appVerification: false,
  });

  useEffect(() => {
    getLoginSettings().then(res => {
      if (res) {
        setLoginData({
          ...loginData,
          username: res.username || '',
          email: res.email || '',
          phone: res.phone || '',
          emailVerification: res.emailVerification,
          phoneVerification: res.phoneVerification,
          appVerification: res.appVerification,
        });
      }
    });
  }, []);

  const handleSaveLoginSettings = async () => {
    try {
      await updateLoginSettings({ data: loginData });
      showPopup('Login settings saved successfully');
      setLoginData(prev => ({ ...prev, password: '' })); // clear password
    } catch (e) {
      showPopup('Failed to save login settings', "error");
    }
  };

  const handleLogout = async () => {
    if (await confirmAction('Are you sure you want to log out?')) {
      await logout();
      router.navigate({ to: '/login' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Site Settings</h1>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          <Save size={18} />
          {isSaving ? 'Saving...' : 'Save All Settings'}
        </button>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        {/* Tabs Sidebar */}
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-200 dark:border-zinc-800 p-4 space-y-2 bg-gray-50 dark:bg-zinc-900/50">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === tab.id
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800'
                }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          {activeTab === 'color_mode' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-bold">Color Mode</h2>
                  <p className="text-sm text-gray-500">Choose a global color theme for your portfolio.</p>
                </div>
                <button
                  onClick={() => handleChange('themeMode', '')}
                  className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 px-3 py-1.5 rounded-md transition-colors"
                >
                  <RotateCcw size={16} /> Reset to Default
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { value: '', label: 'Dark (Default)' },
                  { value: 'light', label: 'Light' },
                  { value: 'red-glass', label: 'Reddish Glass' },
                  { value: 'blue-glass', label: 'Bluish Glass' },
                  { value: 'green-glass', label: 'Greenish Glass' },
                ].map((mode) => (
                  <button
                    key={mode.value}
                    onClick={() => handleChange('themeMode', mode.value)}
                    className={`p-4 border rounded-xl flex flex-col items-center gap-2 transition-all ${(formData['themeMode'] || '') === mode.value
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 ring-2 ring-blue-600/20'
                      : 'border-gray-200 dark:border-zinc-800 hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-zinc-800/50'
                      }`}
                  >
                    <div className="font-medium">{mode.label}</div>
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Selecting a mode will automatically adjust the base colors and glass effects across the entire site.
              </p>
            </div>
          )}


          {activeTab === 'typography' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-bold">Typography</h2>
                  <p className="text-sm text-gray-500">Choose font families for different text elements.</p>
                </div>
                <button
                  onClick={handleResetTypography}
                  className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 px-3 py-1.5 rounded-md transition-colors"
                >
                  <RotateCcw size={16} /> Reset Fonts
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {TYPOGRAPHY_KEYS.map((item) => (
                  <div key={item.key}>
                    <label className="block text-sm font-medium mb-2">{item.label}</label>
                    <select
                      value={formData[item.key] || ''}
                      onChange={e => handleChange(item.key, e.target.value)}
                      className="w-full p-3 rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent"
                    >
                      {FONTS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                    </select>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">Selecting a font will automatically apply it via Google Fonts. Elements without a specific font will fall back to the Global Font.</p>
            </div>
          )}

          {activeTab === 'hero' && (
            <div className="space-y-6 max-w-4xl">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">Hero Section</h2>
                  <p className="text-sm text-gray-500">Main banner information.</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleCreateHeroBackup}
                    className="flex items-center gap-2 text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 px-3 py-1.5 rounded-md transition-colors"
                  >
                    <Save size={16} /> Create Backup
                  </button>
                  <button
                    onClick={async () => { if (await confirmAction('Reset Hero Section to defaults?')) {
                        setFormData(prev => ({
                          ...prev,
                          heroName: '',
                          heroDesignation: '',
                          heroDescription: '',
                          heroImage: '',
                          heroSpecialities: ''
                        }));
                      }
                    }}
                    className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 px-3 py-1.5 rounded-md transition-colors"
                  >
                    <RotateCcw size={16} /> Reset
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input type="text" value={formData['heroName'] || ''} onChange={e => handleChange('heroName', e.target.value)} className="w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Designation</label>
                    <input type="text" value={formData['heroDesignation'] || ''} onChange={e => handleChange('heroDesignation', e.target.value)} className="w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea value={formData['heroDescription'] || ''} onChange={e => handleChange('heroDescription', e.target.value)} className="w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent min-h-[100px]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Hero Image</label>
                    <div className="flex gap-4 items-center">
                      {(heroImageFile || formData['heroImage']) && (
                        <img src={heroImageFile ? URL.createObjectURL(heroImageFile) : formData['heroImage']} className="w-16 h-16 rounded object-cover border border-gray-200 dark:border-zinc-700" alt="Hero preview" />
                      )}
                      <div>
                        <input type="file" accept="image/*" onChange={e => setHeroImageFile(e.target.files?.[0] || null)} className="hidden" id="hero-upload" />
                        <label htmlFor="hero-upload" className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-zinc-800 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors text-sm font-medium w-fit">
                          <Upload size={16} /> {heroImageFile ? 'Change File' : 'Upload Image'}
                        </label>
                        <p className="text-xs text-gray-500 mt-1">{heroImageFile ? heroImageFile.name : formData['heroImage']}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Backup History Column */}
                <div>
                  <h3 className="font-bold flex items-center gap-2 mb-4"><History size={18} /> Backup History</h3>
                  <div className="space-y-3">
                    {backups.filter(b => b.key === 'hero_backup').length === 0 ? (
                      <p className="text-sm text-gray-500">No backups available.</p>
                    ) : (
                      backups.filter(b => b.key === 'hero_backup').map(backup => (
                        <div key={backup.id} className="p-3 border border-gray-200 dark:border-zinc-800 rounded-lg flex justify-between items-center bg-gray-50 dark:bg-zinc-900/50">
                          <div>
                            <p className="font-medium text-sm">Backup - {new Date(backup.createdAt).toLocaleString()}</p>
                            <p className="text-xs text-gray-500 truncate max-w-[200px]">{JSON.parse(backup.value).heroName || 'No Name'}</p>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => handleRestoreHeroBackup(backup.value)} className="px-3 py-1 bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50 rounded text-xs font-medium transition-colors">Restore</button>
                            <button onClick={() => handleDeleteBackup(backup.id)} className="p-1 text-gray-500 hover:text-red-600 transition-colors"><Trash2 size={16} /></button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 pt-5">Specialities (Max 5)</label>
                    <p className="text-xs text-gray-500 mb-3">Select up to 5 active skills to float around your hero image.</p>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill: any) => {
                        const isSelected = (formData['heroSpecialities'] || '').split(',').map((s: string) => s.trim()).includes(skill.name);
                        return (
                          <button
                            key={skill.id}
                            onClick={() => handleSpecialityToggle(skill.name)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${isSelected
                              ? 'bg-cyan text-black shadow-md'
                              : 'bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700'
                              }`}
                          >
                            {skill.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-6 max-w-4xl">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">About & Stats</h2>
                  <p className="text-sm text-gray-500">Information about you and your track record.</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleCreateAboutBackup}
                    className="flex items-center gap-2 text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 px-3 py-1.5 rounded-md transition-colors"
                  >
                    <Save size={16} /> Create Backup
                  </button>
                  <button
                    onClick={async () => { if (await confirmAction('Reset About Section to defaults?')) {
                        setFormData(prev => ({
                          ...prev,
                          aboutProfilePic: '',
                          aboutDescription: '',
                          aboutExpYears: '3',
                          aboutProjects: '80',
                          aboutClients: '20',
                          aboutCountries: '15',
                          aboutCard1Title: 'Full Stack Development',
                          aboutCard1Desc: 'End-to-end web products with React.js and Django - premium UI meets resilient APIs.',
                          aboutCard2Title: 'Python Engineering',
                          aboutCard2Desc: 'Clean, efficient Python - from automation scripts to scalable backend services.',
                          aboutCard3Title: 'AI / ML Exploration',
                          aboutCard3Desc: 'Training models with TensorFlow, PyTorch and Scikit-Learn for real-world problems.',
                          aboutCard4Title: 'Computer Science Student',
                          aboutCard4Desc: 'Pursuing BSc in CSE at Daffodil International University - currently fourth year.',
                        }));
                      }
                    }}
                    className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 px-3 py-1.5 rounded-md transition-colors"
                  >
                    <RotateCcw size={16} /> Reset
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Profile Picture</label>
                    <div className="flex gap-4 items-center">
                      {(aboutImageFile || formData['aboutProfilePic']) && (
                        <img src={aboutImageFile ? URL.createObjectURL(aboutImageFile) : formData['aboutProfilePic']} className="w-16 h-16 rounded-full object-cover border border-gray-200 dark:border-zinc-700" alt="Profile preview" />
                      )}
                      <div>
                        <input type="file" accept="image/*" onChange={e => setAboutImageFile(e.target.files?.[0] || null)} className="hidden" id="about-upload" />
                        <label htmlFor="about-upload" className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-zinc-800 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors text-sm font-medium w-fit">
                          <Upload size={16} /> {aboutImageFile ? 'Change File' : 'Upload Image'}
                        </label>
                        <p className="text-xs text-gray-500 mt-1">{aboutImageFile ? aboutImageFile.name : formData['aboutProfilePic']}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Profile Description</label>
                    <textarea
                      value={formData['aboutDescription'] || "I'm a Full Stack Developer based in Dhaka, Bangladesh, with 3+ years of freelance and remote experience and a strong foundation in Python (Django) and React.js. I've delivered 80+ web projects to 20+ international clients on Fiverr.\n\nAs a Level 2 Seller on Fiverr (top 20%), I've maintained a 4.9/5.0 satisfaction rating across 75+ completed projects, serving clients from the USA, Canada, and across the EU.\n\nCurrently pursuing my BSc in Computer Science & Engineering at Daffodil International University while working as a Web Developer at Dynamite IT Solution."}
                      onChange={e => handleChange('aboutDescription', e.target.value)}
                      className="w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent min-h-[150px]"
                    />
                  </div>

                  <h3 className="font-bold pt-4 border-t border-gray-200 dark:border-zinc-800">Key Statistics</h3>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50">
                      <label className="block text-sm font-medium mb-1">Years of Experience</label>
                      <input type="number" placeholder="e.g. 3" value={formData['aboutExpYears'] || '3'} onChange={e => handleChange('aboutExpYears', e.target.value)} className="w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950" />
                    </div>
                    <div className="p-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50">
                      <label className="block text-sm font-medium mb-1">Projects Delivered</label>
                      <input type="number" placeholder="e.g. 80" value={formData['aboutProjects'] || '80'} onChange={e => handleChange('aboutProjects', e.target.value)} className="w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950" />
                    </div>
                    <div className="p-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50">
                      <label className="block text-sm font-medium mb-1">Happy Clients</label>
                      <input type="number" placeholder="e.g. 20" value={formData['aboutClients'] || '20'} onChange={e => handleChange('aboutClients', e.target.value)} className="w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950" />
                    </div>
                    <div className="p-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50">
                      <label className="block text-sm font-medium mb-1">Countries Served (Number)</label>
                      <input type="number" placeholder="e.g. 15" value={formData['aboutCountries'] || '15'} onChange={e => handleChange('aboutCountries', e.target.value)} className="w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950" />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="font-bold flex items-center gap-2"><History size={18} /> Backup History</h3>
                  <div className="space-y-3 mb-6">
                    {backups.filter(b => b.key === 'about_backup').length === 0 ? (
                      <p className="text-sm text-gray-500">No backups available.</p>
                    ) : (
                      backups.filter(b => b.key === 'about_backup').map(backup => (
                        <div key={backup.id} className="p-3 border border-gray-200 dark:border-zinc-800 rounded-lg flex justify-between items-center bg-gray-50 dark:bg-zinc-900/50">
                          <div>
                            <p className="font-medium text-sm">Backup - {new Date(backup.createdAt).toLocaleString()}</p>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => handleRestoreAboutBackup(backup.value)} className="px-3 py-1 bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50 rounded text-xs font-medium transition-colors">Restore</button>
                            <button onClick={() => handleDeleteBackup(backup.id)} className="p-1 text-gray-500 hover:text-red-600 transition-colors"><Trash2 size={16} /></button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <h3 className="font-bold pt-4 border-t border-gray-200 dark:border-zinc-800">Special Cards (e.g. Education, Domains)</h3>
                  <p className="text-sm text-gray-500">The 4 cards shown underneath your profile description.</p>

                  {[1, 2, 3, 4].map(num => (
                    <div key={num} className="p-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50">
                      <h4 className="text-sm font-semibold mb-3">Card {num}</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-medium mb-1">Title</label>
                          <input type="text" value={formData[`aboutCard${num}Title`] || ''} onChange={e => handleChange(`aboutCard${num}Title`, e.target.value)} className="w-full p-2 text-sm rounded border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium mb-1">Description</label>
                          <textarea value={formData[`aboutCard${num}Desc`] || ''} onChange={e => handleChange(`aboutCard${num}Desc`, e.target.value)} className="w-full p-2 text-sm rounded border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h2 className="text-xl font-bold">Contact & Social</h2>
                <p className="text-sm text-gray-500">Your contact info and social links.</p>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Email Address Display</label>
                    <input type="text" placeholder="e.g. sayham@example.com" value={formData['contactEmailDisplay'] || ''} onChange={e => handleChange('contactEmailDisplay', e.target.value)} className="w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email Address</label>
                    <input type="email" value={formData['contactEmail'] || ''} onChange={e => handleChange('contactEmail', e.target.value)} className="w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone Number Display</label>
                    <input type="text" placeholder="e.g. +880 1..." value={formData['contactPhoneDisplay'] || ''} onChange={e => handleChange('contactPhoneDisplay', e.target.value)} className="w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone Number (URL/Action)</label>
                    <input type="text" placeholder="e.g. tel:+8801..." value={formData['contactPhone'] || ''} onChange={e => handleChange('contactPhone', e.target.value)} className="w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Location Text Display</label>
                    <input type="text" placeholder="e.g. Dhaka, Bangladesh" value={formData['contactLocation'] || ''} onChange={e => handleChange('contactLocation', e.target.value)} className="w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Location Maps URL</label>
                    <input type="url" placeholder="e.g. https://maps.google.com/..." value={formData['contactLocationUrl'] || ''} onChange={e => handleChange('contactLocationUrl', e.target.value)} className="w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">LinkedIn Display</label>
                    <input type="text" placeholder="e.g. sayhamkayes" value={formData['contactLinkedinDisplay'] || ''} onChange={e => handleChange('contactLinkedinDisplay', e.target.value)} className="w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">LinkedIn URL</label>
                    <input type="text" placeholder="e.g. https://linkedin.com/in/username" value={formData['contactLinkedin'] || ''} onChange={e => handleChange('contactLinkedin', e.target.value)} className="w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">GitHub Display</label>
                    <input type="text" placeholder="e.g. sayhamkayes" value={formData['contactGithubDisplay'] || ''} onChange={e => handleChange('contactGithubDisplay', e.target.value)} className="w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">GitHub URL</label>
                    <input type="text" placeholder="e.g. https://github.com/username" value={formData['contactGithub'] || ''} onChange={e => handleChange('contactGithub', e.target.value)} className="w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-transparent" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'login' && (
            <div className="space-y-6 max-w-2xl">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">Login Settings</h2>
                  <p className="text-sm text-gray-500">Configure your admin credentials and multifactor authentication.</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 px-3 py-1.5 rounded-md transition-colors"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50 space-y-4">
                  <h3 className="font-semibold">Credentials</h3>
                  <div>
                    <label className="block text-sm font-medium mb-1">Username</label>
                    <input type="text" value={loginData.username} onChange={e => setLoginData({ ...loginData, username: e.target.value })} className="w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">New Password (leave blank to keep current)</label>
                    <input type="password" value={loginData.password} onChange={e => setLoginData({ ...loginData, password: e.target.value })} className="w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950" placeholder="••••••••" />
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50 space-y-4">
                  <h3 className="font-semibold">Recovery & Verification Contacts</h3>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email Address (for reset/verify)</label>
                    <input type="email" value={loginData.email} onChange={e => setLoginData({ ...loginData, email: e.target.value })} className="w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone Number (for SMS verify)</label>
                    <input type="tel" value={loginData.phone} onChange={e => setLoginData({ ...loginData, phone: e.target.value })} className="w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950" />
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50 space-y-4">
                  <h3 className="font-semibold">Two-Factor Authentication (2FA)</h3>
                  <p className="text-sm text-gray-500">Enable one or more verification methods for logging in.</p>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={loginData.emailVerification} onChange={e => setLoginData({ ...loginData, emailVerification: e.target.checked })} className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Verification</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={loginData.phoneVerification} onChange={e => setLoginData({ ...loginData, phoneVerification: e.target.checked })} className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone (SMS) Verification</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={loginData.appVerification} onChange={e => setLoginData({ ...loginData, appVerification: e.target.checked })} className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Authenticator App</span>
                  </label>
                </div>

                <button
                  onClick={handleSaveLoginSettings}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Save Login Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
