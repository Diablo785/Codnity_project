import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store/store';
import Header from './layout/Header';
import Sidebar from './layout/Sidebar';
import HomePage from './pages/HomePage';
import Characters from './pages/characters/Characters';
import CharacterDetails from './pages/characters/CharacterDetailsPage';
import Clans from './pages/clans/Clans';
import ClanDetailsPage from './pages/clans/ClanDetailsPage';
import Villages from './pages/villages/Villages';
import VillageDetailsPage from './pages/villages/VillageDetailsPage';
import KekkeiGenkai from './pages/kekkei-genkai/KekkeiGenkai';
import KekkeiGenkaiDetailsPage from './pages/kekkei-genkai/KekkeiGenkaiDetailsPage';
import TailedBeasts from './pages/tailed-beasts/TailedBeasts';
import Teams from './pages/teams/Teams';
import TeamsDetailsPage from './pages/teams/TeamsDetailsPage';
import Akatsuki from './pages/akatsuki/Akatsuki';
import Kara from './pages/kara/Kara';
import Footer from './layout/Footer';
import Naruto from './pages/headerPages/Naruto';
import Shippuden from './pages/headerPages/Shippuden';
import Boruto from './pages/headerPages/Boruto';
import './index.css';

const App: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

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

  const headerHeight = isMobile ? '70px' : '125px';

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div className="flex flex-col min-h-screen overflow-hidden">
            <Header />
            <div className="flex flex-row flex-1" style={{ paddingTop: headerHeight }}>
              <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} isMobile={isMobile} />

              <main className={`flex-1 bg-gray-100 transition-all duration-300 ${isSidebarOpen ? 'ml-[275px]' : 'ml-[50px]'}`}>
                <Routes>
                  <Route path="/" element={<HomePage isSidebarOpen={isSidebarOpen} />} />
                  <Route path="/characters" element={<Characters isSidebarOpen={isSidebarOpen} />} />
                  <Route 
                    path="/characters/:id" 
                    element={<CharacterDetails isSidebarOpen={isSidebarOpen} headerHeight={headerHeight} />} 
                  />
                  <Route path="/clans" element={<Clans isSidebarOpen={isSidebarOpen} />} />
                  <Route path="/clans/:clanId" element={<ClanDetailsPage isSidebarOpen={isSidebarOpen} />} />
                  <Route path="/villages" element={<Villages isSidebarOpen={isSidebarOpen} />} />
                  <Route path="/villages/:villageId" element={<VillageDetailsPage isSidebarOpen={isSidebarOpen} />} />
                  <Route path="/kekkei-genkai" element={<KekkeiGenkai isSidebarOpen={isSidebarOpen} />} />
                  <Route path="/kekkei-genkai/:kekkeiGenkaiId" element={<KekkeiGenkaiDetailsPage isSidebarOpen={isSidebarOpen} />} /> 
                  <Route path="/tailed-beasts" element={<TailedBeasts isSidebarOpen={isSidebarOpen}/>} />
                  <Route path="/teams" element={<Teams isSidebarOpen={isSidebarOpen} />} />
                  <Route path="/teams/:teamId" element={<TeamsDetailsPage isSidebarOpen={isSidebarOpen} />} />
                  <Route path="/akatsuki" element={<Akatsuki isSidebarOpen={isSidebarOpen}/>} />
                  <Route path="/kara" element={<Kara isSidebarOpen={isSidebarOpen}/>} />
                  <Route path="/naruto" element={<Naruto isSidebarOpen={isSidebarOpen} headerHeight={headerHeight}/>} />
                  <Route path="/shippuden" element={<Shippuden isSidebarOpen={isSidebarOpen} headerHeight={headerHeight}/>} />
                  <Route path="/boruto" element={<Boruto isSidebarOpen={isSidebarOpen} headerHeight={headerHeight}/>} />
                </Routes>
              </main>
            </div>
            <Footer />
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
