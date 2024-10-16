export interface Clan {
  id: number;
  name: string;
  characters: number[];
}

export interface PersonalInfo {
  clan?: string;
  affiliation?: string | string[];
  birthdate?: string;
  sex?: string;
  age?: any;
}

export interface Character {
  id: number;
  name: string;
  images: string[];
  debut?: { anime?: string };
  personal?: PersonalInfo;
  clanId: number;
}

export interface Team {
  id: number;
  name: string;
  members: number[];
}

export interface Village {
  id: number;
  name: string;
  characters: number[];
}

export interface KekkeiGenkai {
  id: number;
  name: string;
  characters: number[];
}