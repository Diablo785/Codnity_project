import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getKekkeiGenkaiDetails, getCharactersByIds } from '../../api/api'; // Adjust the API call according to your API structure
import { Character } from '../../api/types';
import { Box, Typography, Grid, CircularProgress, } from '@mui/material';
import CharacterCard from '../../components/cards/CharacterCard';

const KekkeiGenkaiDetailsPage: React.FC<{ isSidebarOpen: boolean }> = ({ isSidebarOpen }) => {
  const { kekkeiGenkaiId } = useParams<{ kekkeiGenkaiId: string }>();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [kekkeiGenkaiName, setKekkeiGenkaiName] = useState<string>('');

  const headerHeight = 64; // Adjust this value as per your header's actual height

  useEffect(() => {
    const fetchKekkeiGenkaiDetails = async () => {
      if (!kekkeiGenkaiId) {
        setError('Kekkei Genkai ID is required.');
        setLoading(false);
        return;
      }

      setError('');
      try {
        const kekkeiGenkaiDetails = await getKekkeiGenkaiDetails(Number(kekkeiGenkaiId)); // Adjust according to your API
        setKekkeiGenkaiName(kekkeiGenkaiDetails.name);

        const charactersData = await getCharactersByIds(kekkeiGenkaiDetails.characters);
        setCharacters(charactersData);
      } catch (err) {
        console.error(err);
        setError(`Failed to fetch characters for Kekkei Genkai ${kekkeiGenkaiId}`);
      } finally {
        setLoading(false);
      }
    };

    fetchKekkeiGenkaiDetails();
  }, [kekkeiGenkaiId]);

  return (
    <Box
      sx={{
        padding: { xs: 2, md: 4 },
        maxWidth: '100%',
        width: isSidebarOpen ? `calc(100vw - 275px)` : `calc(100vw - 55px)`,
        height: `calc(100vh - ${headerHeight}px)`,
        overflow: 'auto',
      }}
    >
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
          <CircularProgress />
        </Box>
      )}
      {error && <Typography color="error">{error}</Typography>}
      {!loading && !error && (
        <Box>
          <Typography variant="h4" sx={{ marginBottom: 3, textAlign: 'center' }}>
            {kekkeiGenkaiName}
          </Typography>

          <Grid container spacing={2} justifyContent="center">
            {characters.map((character) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={2.4}
                key={character.id}
              >
                <CharacterCard character={character} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default KekkeiGenkaiDetailsPage;
