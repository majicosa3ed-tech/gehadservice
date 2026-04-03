import { useState } from 'react';
import IntroPage from './pages/IntroPage';
import HolmerPage from './pages/HolmerPage';
import RopaPage from './pages/RopaPage';

type PageType = 'intro' | 'holmer' | 'ropa';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('intro');

  const navigateTo = (page: PageType) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen">
      {currentPage === 'intro' && <IntroPage onNavigate={navigateTo} />}
      {currentPage === 'holmer' && <HolmerPage onBack={() => navigateTo('intro')} />}
      {currentPage === 'ropa' && <RopaPage onBack={() => navigateTo('intro')} />}

      {/* Developer Credit - Fixed bottom left */}
      <div style={{
        position: 'fixed',
        bottom: '12px',
        left: '12px',
        zIndex: 9999,
        background: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(16, 185, 129, 0.3)',
        borderRadius: '8px',
        padding: '8px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        pointerEvents: 'none',
      }}>
        <span style={{ fontSize: '11px', color: '#64748b' }}>Developed by</span>
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#10b981' }}>
          Mohamed Saeed
        </span>
        <span style={{ fontSize: '11px', color: '#94a3b8' }}>
          +201011126104
        </span>
      </div>
    </div>
  );
}

export default App;