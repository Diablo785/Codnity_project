import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

type DropdownItem = {
  name: string;
  link: string;
};

const dropdownItems: DropdownItem[] = [
  { name: 'Characters', link: '/characters' },
  { name: 'Clans', link: '/clans' },
  { name: 'Villages', link: '/villages' },
  { name: 'Kekkei-genkai', link: '/kekkei-genkai' },
  { name: 'Tailed Beasts', link: '/tailed-beasts' },
  { name: 'Teams', link: '/teams' },
  { name: 'Akatsuki', link: '/akatsuki' },
  { name: 'Kara', link: '/kara' },
];

const Header: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 h-[70px] md:h-[125px] bg-gray-800 flex justify-center items-center shadow-md z-10 w-full">
      <nav className="flex flex-row justify-around items-center w-full max-w-screen-lg px-4 md:px-8">
        {['Naruto', 'Shippuden', 'Boruto'].map((anime, index) => (
          <div className="relative group" key={anime}>
            <Link
              to={index === 0 ? '/naruto' : index === 1 ? '/shippuden' : '/boruto'}
              className="text-white text-lg md:text-3xl font-Koulen"
            >
              {anime}
            </Link>
            <div
              className={`${isMobile ? 'top-7' : 'top-10'} absolute left-1/2 bottom-0 w-[6px] h-[6px] bg-[#CA8300] transition-all duration-500 group-hover:w-full rounded-full ${isActive(index === 0 ? '/naruto' : index === 1 ? '/shippuden' : '/boruto') ? 'w-full left-0' : ''}`}
              style={{ transform: 'translateX(-50%)' }}
            ></div>
            <div className={`absolute hidden group-hover:block bg-gray-700 text-white p-2 rounded-md shadow-lg z-20 mt-0 ${isMobile ? 'w-[45vw]' : 'w-48'}`} style={{ left: '50%', transform: 'translateX(-50%)' }}>
              {dropdownItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.link}
                  className="block px-4 py-2 hover:bg-gray-600 rounded-md text-sm" 
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </header>
  );
};

export default Header;
