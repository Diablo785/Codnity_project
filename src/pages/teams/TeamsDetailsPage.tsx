import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTeamDetails, getCharactersByIds } from '../../api/api';
import { Character } from '../../api/types';
import { Box, Typography, Grid, CircularProgress, } from '@mui/material';
import CharacterCard from '../../components/cards/CharacterCard';

const TeamDetailsPage: React.FC<{ isSidebarOpen: boolean }> = ({ isSidebarOpen }) => {
  const { teamId } = useParams<{ teamId: string }>();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [teamName, setTeamName] = useState<string>('');

  const headerHeight = 64; 

  useEffect(() => {
    const fetchTeamDetails = async () => {
      if (!teamId) {
        setError('Team ID is required.');
        setLoading(false);
        return;
      }

      setError('');
      try {
        const teamDetails = await getTeamDetails(Number(teamId));
        setTeamName(teamDetails.name);

        const memberIds = teamDetails.characters; 
        const characterData = await getCharactersByIds(memberIds);
        setCharacters(characterData);
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching team details.');
      } finally {
        setLoading(false);
      }
    };

    fetchTeamDetails();
  }, [teamId]);

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
      {loading ? (
        <Box display="flex" justifyContent="center" marginTop={3}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography variant="body1" color="error" align="center" marginTop={3}>
          {error}
        </Typography>
      ) : (
        <Box>
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{
              fontWeight: 'bold',
              color: '#333',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: 3,
            }}
          >
            {teamName}
          </Typography>

          <Grid container spacing={2} justifyContent="center">
            {characters.length > 0 ? (
              characters.map((character) => (
                <Grid item xs={12} sm={6} md={4} lg={2.4} key={character.id}>
                  <CharacterCard character={character} />
                </Grid>
              ))
            ) : (
              <Typography variant="body1" align="center" sx={{ width: '100%', marginTop: 4 }}>
                No characters found for this team.
              </Typography>
            )}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default TeamDetailsPage;
