import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllVillages, getCharactersByIds } from '../../api/api';
import { Character } from '../../api/types';
import { Box, Typography, Grid, CircularProgress, } from '@mui/material';
import CharacterCard from '../../components/cards/CharacterCard';

const VillageDetailsPage: React.FC<{ isSidebarOpen: boolean }> = ({ isSidebarOpen }) => {
  const { villageId } = useParams<{ villageId: string }>();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [villageName, setVillageName] = useState<string>('');

  useEffect(() => {
    const fetchVillageDetails = async () => {
      if (!villageId) {
        setError('Village ID is required.');
        setLoading(false);
        return;
      }

      setError('');
      try {
        const { villages } = await getAllVillages(1);
        const selectedVillage = villages.find((v: any) => v.id === parseInt(villageId));
        
        if (!selectedVillage) {
          throw new Error('Village not found.');
        }

        setVillageName(selectedVillage.name);

        const charactersData = await getCharactersByIds(selectedVillage.characters);
        setCharacters(charactersData);
      } catch (err) {
        console.error(err);
        setError(`Failed to fetch characters for village ${villageId}`);
      } finally {
        setLoading(false);
      }
    };

    fetchVillageDetails();
  }, [villageId]);

  return (
    <Box 
      sx={{ 
        padding: { xs: 2, md: 4 }, 
        maxWidth: '100%',
        width: isSidebarOpen ? `calc(100vw - 275px)` : `calc(100vw - 55px)`,
      }}>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
          <CircularProgress />
        </Box>
      )}
      {error && <Typography color="error">{error}</Typography>}
      {!loading && !error && (
        <Box>
          <Typography variant="h4" sx={{ marginBottom: 3, textAlign: 'center' }}>
            {villageName}
          </Typography>

          <Grid container spacing={2} justifyContent="center">
            {characters.map((character) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4} key={character.id}>
                <CharacterCard character={character} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default VillageDetailsPage;
