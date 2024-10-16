import { Character } from './types';

const baseUrl = 'https://dattebayo-api.onrender.com';

export const getAllCharacters = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(`${baseUrl}/characters?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch characters');
    }
    const data = await response.json();
    console.log('API Response:', data);
    return { characters: data.characters, total: data.total };
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
};

export const fetchAllCharacters = async () => {
  const allCharacters = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const { characters, total } = await getAllCharacters(page);
    allCharacters.push(...characters);
    hasMore = allCharacters.length < total;
    page++;
  }

  return allCharacters;
};

export const getCharactersByIds = async (ids: number[]) => {
  try {
    const characterPromises = ids.map(async (id) => {
      const response = await fetch(`${baseUrl}/characters/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch character with ID ${id}`);
      }
      return response.json();
    });

    return Promise.all(characterPromises);
  } catch (error) {
    console.error('Error fetching characters by IDs:', error);
    throw error;
  }
};

export const getCharacterById = async (id: number): Promise<Character> => {
  const response = await fetch(`${baseUrl}/characters/${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

export const getClanDetails = async (clanId: number) => {
  const response = await fetch(`${baseUrl}/clans/${clanId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch clan details');
  }
  return response.json();
};

export const getAllClans = async (page: number) => {
  const limit = 20;
  try {
    const response = await fetch(`${baseUrl}/clans?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch clans');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching clans:', error);
    throw error;
  }
};

export const getAllVillages = async (page: number) => {
  const limit = 20;
  try {
    const response = await fetch(`${baseUrl}/villages?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch villages');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching villages:', error);
    throw error;
  }
};

export const getVillageDetails = async (villageId: number) => {
  const response = await fetch(`${baseUrl}/villages/${villageId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch village details');
  }
  return response.json();
};

export const getAllKekkeiGenkai = async (page: number) => {
  const limit = 39;
  try {
    const response = await fetch(`${baseUrl}/kekkei-genkai?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch kekkei genkai');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching kekkei genkai:', error);
    throw error;
  }
};

export const getKekkeiGenkaiDetails = async (kekkeiGenkaiId: number) => {
  try {
    const response = await fetch(`${baseUrl}/kekkei-genkai/${kekkeiGenkaiId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch kekkei genkai details for ID ${kekkeiGenkaiId}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching kekkei genkai details:', error);
    throw error;
  }
};

export const getAllTailedBeasts = async (page: number) => {
  const response = await fetch(`${baseUrl}/tailed-beasts?page=${page}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log("Response Data:", data);

  return {
    tailedBeasts: data['tailed-beasts'], 
    total: data.total,
  };
};

export const getTailedBeastById = async (id: number) => {
  try {
    const response = await fetch(`${baseUrl}/tailed-beasts/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch tailed beast with ID ${id}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching tailed beast by ID ${id}:`, error);
    throw error;
  }
};

export const getAllTeams = async (page: number) => {
  const limit = 20;
  try {
    const response = await fetch(`${baseUrl}/teams?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch teams');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw error;
  }
};

export const getTeamDetails = async (teamId: number) => {
  try {
    const response = await fetch(`${baseUrl}/teams/${teamId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch team with ID ${teamId}`);
    }
    const team = await response.json();
    console.log('Fetched Team Details:', team);
    return team;
  } catch (error) {
    console.error(`Error fetching team details for ID ${teamId}:`, error);
    throw error;
  }
};

export const getAllAkatsuki = async (page: number = 1) => {
  try {
    const response = await fetch(`${baseUrl}/akatsuki?page=${page}`);
    if (!response.ok) {
      throw new Error('Failed to fetch akatsuki');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching akatsuki:', error);
    throw error;
  }
};

export const getAllKara = async (page: number = 1) => {
  const limit = 44;
  try {
    const response = await fetch(`${baseUrl}/kara?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch kara');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching kara:', error);
    throw error;
  }
};

