import React from 'react';
import Characters from './characters/Characters';

interface HomePageProps {
  isSidebarOpen: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ isSidebarOpen }) => {
  return (
    <main 
      className="flex-1 bg-gray-100 transition-all duration-300 overflow-hidden"
      style={{
        width: isSidebarOpen ? `calc(100vw - 275px)` : `calc(100vw - 55px)`,
      }}
    >
      <div 
        className="p-4 md:p-8"
      >
        <h1 className="text-3xl md:text-5xl font-extrabold text-center mb-6 text-[#FF6347] tracking-wider">
          Welcome to the Naruto Universe!
        </h1>

        <p className="text-lg md:text-xl font-light text-gray-700 mb-6 leading-7 tracking-wider">
          Dive into the captivating world of <em className="font-semibold">Naruto</em>, a timeless series that follows the journey of Naruto Uzumaki, a spirited young ninja with dreams of becoming the Hokage, the leader of his village. Through trials and tribulations, Naruto's story is one of perseverance, friendship, and self-discovery.
        </p>

        <h2 className="text-2xl md:text-4xl font-semibold mt-10 mb-6 text-[#CA8A04] underline decoration-solid decoration-2 underline-offset-4">
          Series Overview
        </h2>

        <p className="text-base md:text-lg text-gray-700 mb-6 leading-8 tracking-wide">
          Set in a vibrant, fictional world where ninjas harness extraordinary abilities known as jutsu, <em className="font-semibold">Naruto</em> explores deep themes of ambition, loyalty, and the bonds of friendship. The original series transitions into <em className="font-semibold">Naruto: Shippuden</em>, which follows an older Naruto as he confronts more formidable enemies and uncovers his true potential. In <em className="font-semibold">Boruto: Naruto Next Generations</em>, the focus shifts to Naruto’s son, Boruto, who grapples with living in the shadow of his father's legacy while striving to forge his own path in a world that balances tradition and innovation.
        </p>

        <h2 className="text-2xl md:text-4xl font-semibold mt-10 mb-6 text-[#CA8A04] underline decoration-solid decoration-2 underline-offset-4">
          Key Characters
        </h2>

        <ul className="list-disc pl-4 md:pl-6 text-base md:text-lg text-gray-700 leading-8 tracking-wide">
          <li><span className="font-bold text-[#FF6347]">Naruto Uzumaki</span> – The determined protagonist aiming to become Hokage.</li>
          <li><span className="font-bold text-[#FF6347]">Sasuke Uchiha</span> – Naruto's rival, driven by a quest for revenge and redemption.</li>
          <li><span className="font-bold text-[#FF6347]">Sakura Haruno</span> – A powerful kunoichi and a key member of Team 7, known for her strength and intelligence.</li>
          <li><span className="font-bold text-[#FF6347]">Kakashi Hatake</span> – The wise and skilled leader of Team 7, recognized for his unique Sharingan eye.</li>
          <li><span className="font-bold text-[#FF6347]">Hinata Hyuga</span> – A kind-hearted kunoichi with a strong sense of loyalty and determination.</li>
        </ul>

        <p className="text-base md:text-lg text-gray-700 mt-8 leading-8 tracking-wide">
          With rich storytelling and unforgettable character arcs, <em className="font-semibold">Naruto</em> has become a cultural phenomenon that resonates with fans of all ages. Join us as we explore the adventures of these beloved characters!
        </p>
      </div>

      <div>
        <Characters isSidebarOpen={isSidebarOpen} />
      </div>
    </main>
  );
};

export default HomePage;
