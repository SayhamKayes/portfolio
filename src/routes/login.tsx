import { createFileRoute, useRouter, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { login, verify2FA } from '../server/auth';
import { Lock, User, KeyRound, ShieldCheck } from 'lucide-react';

export const Route = createFileRoute('/login')({
  component: LoginPage,
});

function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // 2FA state
  const [needs2FA, setNeeds2FA] = useState(false);
  const [userId, setUserId] = useState('');
  const [code, setCode] = useState('');
  const [selectedMode, setSelectedMode] = useState('app'); // 'app', 'email', 'phone'
  const [availableModes, setAvailableModes] = useState<any>({});

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await login({ data: { username, password } });
      if (res.error) {
        setError(res.error);
      } else if (res.requires2FA) {
        setNeeds2FA(true);
        setUserId(res.userId!);
        setAvailableModes(res.modes!);
        if (res.modes?.app) setSelectedMode('app');
        else if (res.modes?.email) setSelectedMode('email');
        else if (res.modes?.phone) setSelectedMode('phone');
      } else if (res.success) {
        router.navigate({ to: '/admin' });
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login.');
    } finally {
      setIsLoading(false);
    }
  };

  const handle2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await verify2FA({ data: { userId, code, mode: selectedMode } });
      if (res.error) {
        setError(res.error);
      } else if (res.success) {
        router.navigate({ to: '/admin' });
      }
    } catch (err) {
      setError('An error occurred during verification.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950 p-4">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-gray-200 dark:border-zinc-800 p-8">
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Login</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Sign in to manage your portfolio</p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm mb-6">
            {error}
          </div>
        )}

        {!needs2FA ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                <Link to="/forgot-password" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 mt-2"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        ) : (
          <form onSubmit={handle2FA} className="space-y-4">
            <div className="text-center mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Two-factor authentication is enabled. Please select your verification method and enter the code.
              </p>
              <p className="text-xs text-orange-500 mt-2">(Use code: 123456 for testing)</p>
            </div>

            <div className="flex gap-2 justify-center mb-4">
              {availableModes.app && (
                <button type="button" onClick={() => setSelectedMode('app')} className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${selectedMode === 'app' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400'}`}>App</button>
              )}
              {availableModes.email && (
                <button type="button" onClick={() => setSelectedMode('email')} className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${selectedMode === 'email' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400'}`}>Email</button>
              )}
              {availableModes.phone && (
                <button type="button" onClick={() => setSelectedMode('phone')} className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${selectedMode === 'phone' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400'}`}>Phone</button>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Verification Code</label>
              <div className="relative">
                <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter 6-digit code"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 mt-2"
            >
              {isLoading ? 'Verifying...' : 'Verify & Sign In'}
            </button>

            <button type="button" onClick={() => setNeeds2FA(false)} className="w-full py-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
