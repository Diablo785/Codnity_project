import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getClanDetails, getCharactersByIds } from '../../api/api';
import { Character } from '../../api/types';
import { Box, Typography, Grid, CircularProgress, } from '@mui/material';
import CharacterCard from '../../components/cards/CharacterCard';

const ClanDetailsPage: React.FC<{ isSidebarOpen: boolean }> = ({ isSidebarOpen }) => {
  const { clanId } = useParams<{ clanId: string }>();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [clanName, setClanName] = useState<string>('');

  const headerHeight = 64; 

  useEffect(() => {
    const fetchClanDetails = async () => {
      if (!clanId) {
        setError('Clan ID is required.');
        setLoading(false);
        return;
      }

      setError('');
      try {
        const clanDetails = await getClanDetails(Number(clanId));
        setClanName(clanDetails.name);

        const charactersData = await getCharactersByIds(clanDetails.characters);
        setCharacters(charactersData);
      } catch (err) {
        console.error(err);
        setError(`Failed to fetch characters for clan ${clanId}`);
      } finally {
        setLoading(false);
      }
    };

    fetchClanDetails();
  }, [clanId]);

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
            {clanName}
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

export default ClanDetailsPage;
