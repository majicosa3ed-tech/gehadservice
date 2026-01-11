import { ChevronRight, Lock, LogOut } from 'lucide-react';
import { useState } from 'react';

interface IntroPageProps {
  onNavigate: (page: 'holmer' | 'ropa') => void;
}

export default function IntroPage({ onNavigate }: IntroPageProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const DEFAULT_PASSWORD = '01011126104';

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === DEFAULT_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
      setPassword('');
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    setError('');
  };

  // Password Protection Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-500/20 p-4 rounded-full">
                <Lock className="w-12 h-12 text-blue-400" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Mohamed Saeed</h1>
            <p className="text-slate-300">Service Solutions - Access Required</p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="bg-slate-800 border border-slate-700 rounded-lg p-6 shadow-lg">
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                Enter Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter access password"
                className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              />
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/30">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Lock className="w-5 h-5" />
              Unlock Access
            </button>
          </form>

          <div className="mt-6 p-4 rounded-lg bg-slate-900 border border-slate-700">
            <p className="text-slate-400 text-sm text-center">
              Professional machinery service codes for Ropa and Holmer equipment
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Main Content Screen (after authentication)
  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Logout Button */}
      <div className="bg-slate-900 border-b border-slate-700 px-6 py-3 flex justify-end">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div
        className="flex-1 relative bg-cover bg-center flex flex-col justify-center items-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url(/intro.jpg)',
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      >
        <div className="text-center max-w-2xl px-6 mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-amber-400 mb-4 tracking-tight">
            Mohamed Saeed
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 font-light mb-12">
            Machinery Service Solutions
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl mx-auto">
            <button
              onClick={() => onNavigate('ropa')}
              className="group relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <span>Ropa</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('holmer')}
              className="group relative overflow-hidden bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <span>Holmer</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-900 border-t border-slate-700 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2">Service Solutions</p>
              <p className="text-slate-200 font-light">Professional machinery service codes</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2">Fast Access</p>
              <p className="text-slate-200 font-light">Instant calculation and code generation</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2">Offline Ready</p>
              <p className="text-slate-200 font-light">Works completely offline</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
