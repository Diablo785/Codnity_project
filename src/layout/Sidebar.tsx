import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import { Link, useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  isMobile: boolean; 
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, isMobile }) => {
  const headerHeight = isMobile ? '70px' : '125px';
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside 
      className={`fixed left-0 bg-gray-800 text-white shadow-lg transition-all duration-300 ${isOpen ? 'w-[275px]' : 'w-[55px]'}`}
      style={{ height: `calc(100vh - ${headerHeight})` }}
    >
      <button onClick={onToggle} className="text-white text-xl p-3 flex items-center transition-all duration-300 justify-center z-20" style={{ position: 'relative', zIndex: 20 }}>
        <MenuIcon 
          style={{ 
            fontSize: isOpen ? '48px' : '32px', 
            transition: 'font-size 0.3s ease' 
          }} 
        />
      </button>

      <div className={`flex flex-col h-full p-4 ${isOpen ? 'block' : 'hidden'} transition-all`}>
        <Link to="/" className={`flex items-center p-2 mb-4 rounded-lg hover:bg-gray-600 transition-colors ${isActive('/') ? 'bg-gray-600 text-yellow-500' : 'bg-gray-700 text-white'}`}>
          <HomeIcon className="mr-2" />
          <span className={`${isOpen ? 'block' : 'hidden'}`}>Home</span>
        </Link>

        <button onClick={() => navigate(-1)} className="flex items-center p-2 mb-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
          <ArrowBackIcon className="mr-2" />
          <span className={`${isOpen ? 'block' : 'hidden'}`}>Back</span>
        </button>

        <h2 className="text-2xl font-bold mb-4">Dattebayo API</h2>

        <h3 className="text-xl font-semibold border-b border-gray-600 pb-2 mb-3">Collections</h3>
        <ul className="flex flex-col space-y-2">
          <li>
            <Link to="/characters" className={`block p-3 rounded-lg hover:bg-[#FF6347] hover:text-gray-900 transition-all duration-200 transform hover:scale-105 shadow-md ${isActive('/characters') ? 'bg-gray-500 text-yellow-500' : 'bg-gray-700 text-gray-300'}`}>
              <span className="font-semibold">🦸‍♂️ Characters</span>
            </Link>
          </li>
          <li>
            <Link to="/clans" className={`block p-3 rounded-lg hover:bg-[#FF6347] hover:text-gray-900 transition-all duration-200 transform hover:scale-105 shadow-md ${isActive('/clans') ? 'bg-gray-500 text-yellow-500' : 'bg-gray-700 text-gray-300'}`}>
              <span className="font-semibold">👨‍👩‍👧‍👦 Clans</span>
            </Link>
          </li>
          <li>
            <Link to="/villages" className={`block p-3 rounded-lg hover:bg-[#FF6347] hover:text-gray-900 transition-all duration-200 transform hover:scale-105 shadow-md ${isActive('/villages') ? 'bg-gray-500 text-yellow-500' : 'bg-gray-700 text-gray-300'}`}>
              <span className="font-semibold">🏙️ Villages</span>
            </Link>
          </li>
          <li>
            <Link to="/kekkei-genkai" className={`block p-3 rounded-lg hover:bg-[#FF6347] hover:text-gray-900 transition-all duration-200 transform hover:scale-105 shadow-md ${isActive('/kekkei-genkai') ? 'bg-gray-500 text-yellow-500' : 'bg-gray-700 text-gray-300'}`}>
              <span className="font-semibold">🌀 Kekkei Genkai</span>
            </Link>
          </li>
          <li>
            <Link to="/tailed-beasts" className={`block p-3 rounded-lg hover:bg-[#FF6347] hover:text-gray-900 transition-all duration-200 transform hover:scale-105 shadow-md ${isActive('/tailed-beasts') ? 'bg-gray-500 text-yellow-500' : 'bg-gray-700 text-gray-300'}`}>
              <span className="font-semibold">🐉 Tailed Beasts</span>
            </Link>
          </li>
          <li>
            <Link to="/teams" className={`block p-3 rounded-lg hover:bg-[#FF6347] hover:text-gray-900 transition-all duration-200 transform hover:scale-105 shadow-md ${isActive('/teams') ? 'bg-gray-500 text-yellow-500' : 'bg-gray-700 text-gray-300'}`}>
              <span className="font-semibold">🛡️ Teams</span>
            </Link>
          </li>
          <li>
            <Link to="/akatsuki" className={`block p-3 rounded-lg hover:bg-[#FF6347] hover:text-gray-900 transition-all duration-200 transform hover:scale-105 shadow-md ${isActive('/akatsuki') ? 'bg-gray-500 text-yellow-500' : 'bg-gray-700 text-gray-300'}`}>
              <span className="font-semibold">☠️ Akatsuki</span>
            </Link>
          </li>
          <li>
            <Link to="/kara" className={`block p-3 rounded-lg hover:bg-[#FF6347] hover:text-gray-900 transition-all duration-200 transform hover:scale-105 shadow-md ${isActive('/kara') ? 'bg-gray-500 text-yellow-500' : 'bg-gray-700 text-gray-300'}`}>
              <span className="font-semibold">⚔️ Kara</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className={`flex flex-col justify-between h-full p-2 bg-gray-700 transition-colors ${isOpen ? 'hidden' : 'block'}`}>
        <div className="flex flex-col items-center mb-8">
          <Link 
            to="/" 
            className={`flex items-center justify-center mb-6 ${isActive('/') ? 'text-yellow-500' : 'text-white'}`}
          >
            <HomeIcon style={{ fontSize: '36px', transition: 'color 0.3s' }} />
          </Link>
          <button onClick={() => navigate(-1)} className="flex items-center justify-center">
            <ArrowBackIcon style={{ fontSize: '36px' }} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
