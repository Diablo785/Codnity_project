import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCharacterById } from '../../api/api'; 
import { CircularProgress } from '@mui/material';

interface Debut {
  manga?: string;
  anime?: string;
}

interface Family {
  [key: string]: string;
}

interface VoiceActors {
  japanese?: string | string[];
  english?: string | string[];
}

interface NinjaRank {
  [key: string]: string;
}

interface Rank {
  ninjaRank?: NinjaRank;
  ninjaRegistration?: string;
}

interface CharacterPersonal {
  affiliation?: string | string[];
  clan?: string;
  village?: string;
  birthdate?: string;
  sex?: string;
  age?: { [key: string]: string };
  occupation?: string | string[];
  status?: string;
  classification?: string | string[];
  tailedBeast?: string;
  partner?: string;
  family?: Family;
  species?: string;
  height?: { [key: string]: string };
  weight?: { [key: string]: string };
  kekkeiGenkai?: string | string[];
  team?: string[];
  titles?: string[];
}

export interface Character {
  id: number;
  name: string;
  images: string[];
  debut?: Debut;
  family?: Family;
  jutsu?: string[];
  natureType?: string[];
  personal?: CharacterPersonal;
  rank?: Rank;
  tools?: string[];
  voiceActors?: VoiceActors;
  uniqueTraits?: string[];
}

interface CharacterDetailsProps {
  isSidebarOpen: boolean;
  headerHeight: string;
}

const CharacterDetails: React.FC<CharacterDetailsProps> = ({ isSidebarOpen, headerHeight }) => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const getGenderDisplay = (gender: string | undefined) => {
    if (!gender) return 'Unknown';
    return gender === 'Male' || gender === 'Female' ? gender : 'Various';
  };

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        if (!id) {
          setError('Character ID is missing.');
          setLoading(false);
          return;
        }
        
        setLoading(true);
        setError('');

        const characterData = await getCharacterById(Number(id));
        console.log(characterData); 
        setCharacter(characterData);
      } catch (err) {
        setError('Error fetching character details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacterDetails();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <CircularProgress />
    </div>
  );
  if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;
  if (!character) return <div className="text-center mt-4">No character found.</div>;

  const personal = character.personal;

  const defaultImagePlaceholder = 'https://static.wikia.nocookie.net/naruto/images/2/21/Profile_Jiraiya.png';

  return (
    <div
      className="flex flex-col md:flex-row relative bg-gray-900 text-white"
      style={{
        width: isSidebarOpen ? `calc(100vw - 275px)` : `calc(100vw - 55px)`,
        height: `calc(100vh - ${headerHeight})`,
        backgroundImage: `url(${character.images[1]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-70 z-0"></div>

      <div
        className="flex-1 p-0 md:p-8 overflow-auto relative z-10 custom-scrollbar"
        style={{ height: `calc(100vh - ${headerHeight})` }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#FF6347] mb-4 text-center md:text-left transition-transform duration-300 transform">
          {character.name}
        </h1>
        
        <div className="space-y-6 text-lg">
          {character.debut && (
            <p className="text-gray-300">
              <span className="font-semibold text-[#FF6347]">Debut:</span> {character.debut.anime || character.debut.manga || 'N/A'}
            </p>
          )}
          {character.jutsu && character.jutsu.length > 0 && (
            <div>
              <span className="font-semibold text-[#FF6347]">Jutsu:</span>
              <ul className="list-disc list-inside ml-0 text-gray-300">
                {character.jutsu.map((jutsu, index) => (
                  <li
                    key={index}
                    className="bg-transparent hover:bg-gray-800 hover:bg-opacity-60 transition-all duration-200 p-3 rounded-lg w-full text-left"
                  >
                    {jutsu}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {character.natureType && character.natureType.length > 0 && (
            <p className="text-gray-300">
              <span className="font-semibold text-[#FF6347]">Nature Types:</span> {character.natureType.join(', ')}
            </p>
          )}
          {character.tools && character.tools.length > 0 && (
            <p className="text-gray-300">
              <span className="font-semibold text-[#FF6347]">Tools:</span> {character.tools.join(', ')}
            </p>
          )}
        </div>

        <div className="space-y-6 text-lg mt-6">
          {personal && (
            <div className="space-y-4">
              {character.family && Object.keys(character.family).length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-[#FF6347] mb-2">Family</h2>
                  <ul className="list-disc list-inside ml-0 text-gray-300">
                    {Object.entries(character.family).map(([relation, name]) => (
                      <li key={relation} className="p-1">{relation}: {name}</li>
                    ))}
                  </ul>
                </div>
              )}
              {personal.team && Array.isArray(personal.team) && personal.team.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-[#FF6347] mb-2">Team</h2>
                  <ul className="list-disc list-inside ml-0 text-gray-300">
                    {personal.team.map((teamName, index) => (
                      <li key={index} className="p-1">{teamName}</li>
                    ))}
                  </ul>
                </div>
              )}
              {personal.titles && personal.titles.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-[#FF6347] mb-2">Titles</h2>
                  <ul className="list-disc list-inside ml-0 text-gray-300">
                    {personal.titles.map((title, index) => (
                      <li key={index} className="p-1">{title}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <aside
        className="md:w-1/3 bg-gray-900 p-6 flex flex-col items-center relative z-10 overflow-auto custom-scrollbar"
        style={{
          height: `calc(100vh - ${headerHeight})`,
          paddingTop: '1rem', 
          marginTop: '0',
        }}
      >
        {character.name && (
          <h1 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-6 uppercase tracking-wider">
            {character.name}
          </h1>
        )}

        <img
          src={character.images && character.images.length > 0 ? character.images[0] : defaultImagePlaceholder}
          alt={character.name}
          className="w-full rounded-lg mb-8 shadow-lg transition-transform duration-300 transform"
          style={{ objectFit: 'cover', maxHeight: '50%' }}
        />

        <div className="w-full space-y-6 text-center text-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-200 border-b-2 border-gray-700 pb-2 uppercase tracking-wider">
            Personal Info
          </h2>
          
          {personal && (
            <div className="space-y-4">
              <p className="text-gray-300">
                <span className="font-semibold text-[#FF6347]">Gender:</span> {getGenderDisplay(character.personal?.sex)}
              </p>
              
              {personal.occupation && (
                <p className="text-gray-300">
                  <span className="font-semibold text-[#FF6347]">Occupation:</span> 
                  {Array.isArray(personal.occupation) ? personal.occupation.join(', ') : personal.occupation}
                </p>
              )}
              
              {personal.affiliation && (
                <p className="text-gray-300">
                  <span className="font-semibold text-[#FF6347]">Affiliation:</span> 
                  {Array.isArray(personal.affiliation) ? personal.affiliation.join(', ') : personal.affiliation}
                </p>
              )}
              
              {personal.clan && (
                <p className="text-gray-300">
                  <span className="font-semibold text-[#FF6347]">Clan:</span> {personal.clan}
                </p>
              )}
              
              {personal.village && (
                <p className="text-gray-300">
                  <span className="font-semibold text-[#FF6347]">Village:</span> {personal.village}
                </p>
              )}
              
              {personal.birthdate && (
                <p className="text-gray-300">
                  <span className="font-semibold text-[#FF6347]">Birthdate:</span> {personal.birthdate}
                </p>
              )}
              
              {personal.age && (
                <p className="text-gray-300">
                  <span className="font-semibold text-[#FF6347]">Age:</span> {JSON.stringify(personal.age)}
                </p>
              )}
              
              {personal.height && (
                <p className="text-gray-300">
                  <span className="font-semibold text-[#FF6347]">Height:</span> {JSON.stringify(personal.height)}
                </p>
              )}
              
              {personal.weight && (
                <p className="text-gray-300">
                  <span className="font-semibold text-[#FF6347]">Weight:</span> {JSON.stringify(personal.weight)}
                </p>
              )}
              
              {personal.kekkeiGenkai && (
                <p className="text-gray-300">
                  <span className="font-semibold text-[#FF6347]">Kekkei Genkai:</span> 
                  {Array.isArray(personal.kekkeiGenkai) ? personal.kekkeiGenkai.join(', ') : personal.kekkeiGenkai}
                </p>
              )}
              
              {personal.species && (
                <p className="text-gray-300">
                  <span className="font-semibold text-[#FF6347]">Species:</span> {personal.species}
                </p>
              )}
              
              {personal.status && (
                <p className="text-gray-300">
                  <span className="font-semibold text-[#FF6347]">Status:</span> {personal.status}
                </p>
              )}
              
              {personal.classification && (
                <p className="text-gray-300">
                  <span className="font-semibold text-[#FF6347]">Classification:</span> 
                  {Array.isArray(personal.classification) ? personal.classification.join(', ') : personal.classification}
                </p>
              )}
              
              {personal.tailedBeast && (
                <p className="text-gray-300">
                  <span className="font-semibold text-[#FF6347]">Tailed Beast:</span> {personal.tailedBeast}
                </p>
              )}
              
              {personal.partner && (
                <p className="text-gray-300">
                  <span className="font-semibold text-[#FF6347]">Partner:</span> {personal.partner}
                </p>
              )}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default CharacterDetails;
