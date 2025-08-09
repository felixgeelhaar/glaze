import { useState, useEffect } from 'react';
import { ReactPage } from './pages/ReactPage';
import { VuePage } from './pages/VuePage';
import './App.css';

type Route = 'home' | 'react' | 'vue';

function App() {
  const [route, setRoute] = useState<Route>('home');

  useEffect(() => {
    // Simple routing based on hash
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) as Route;
      setRoute(hash || 'home');
    };
    
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold text-white">Glaze Demo</h1>
              <div className="flex space-x-4">
                <a 
                  href="#"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    route === 'home' 
                      ? 'bg-white/20 text-white' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Home
                </a>
                <a 
                  href="#react"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    route === 'react' 
                      ? 'bg-white/20 text-white' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  React
                </a>
                <a 
                  href="#vue"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    route === 'vue' 
                      ? 'bg-white/20 text-white' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Vue
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        {route === 'home' && (
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">
              Glaze Design System
            </h1>
            <p className="text-xl text-white/70 mb-8">
              Beautiful glass morphism components for React and Vue
            </p>
            <div className="flex justify-center space-x-4">
              <a 
                href="#react"
                className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-lg text-white font-medium hover:bg-white/30 transition-colors"
              >
                View React Demo
              </a>
              <a 
                href="#vue"
                className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-lg text-white font-medium hover:bg-white/30 transition-colors"
              >
                View Vue Demo
              </a>
            </div>
          </div>
        )}
        
        {route === 'react' && <ReactPage />}
        {route === 'vue' && <VuePage />}
      </main>
    </div>
  );
}

export default App;