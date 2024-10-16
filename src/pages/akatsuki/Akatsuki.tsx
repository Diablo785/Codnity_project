import React, { useEffect, useState, useCallback } from 'react';
import { getAllAkatsuki } from '../../api/api';
import { Box, Typography, Grid, CircularProgress, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CharacterCard from '../../components/cards/CharacterCard';
import { Character } from '../../api/types';
import { RootState, AppDispatch } from '../../store/store'; // Import types for Redux
import { setSearchQuery, setSortOption } from '../../store/searchSlice'; // Import actions from Redux slice
import { useDispatch, useSelector } from 'react-redux'; // Import hooks to use Redux

const Akatsuki: React.FC<{ isSidebarOpen: boolean }> = ({ isSidebarOpen }) => {
  const dispatch = useDispatch<AppDispatch>();

  // Access search query and sort option from Redux store
  const searchTerm = useSelector((state: RootState) => state.search.searchQuery || ''); // Corrected property name
  const sortOption = useSelector((state: RootState) => state.search.sortOption || 'default');

  const [akatsuki, setAkatsuki] = useState<Character[]>([]);
  const [filteredAkatsuki, setFilteredAkatsuki] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const headerHeight = 64; 

  useEffect(() => {
    const fetchAkatsuki = async () => {
      try {
        let allMembers: Character[] = [];
        let page = 1;
        const totalCharacters = 44; 
        
        while (allMembers.length < totalCharacters) {
          const response = await getAllAkatsuki(page);
          allMembers = [...allMembers, ...response.akatsuki];
          page += 1;
        }
        
        setAkatsuki(allMembers);
        setFilteredAkatsuki(allMembers);
      } catch (error) {
        setError('Failed to fetch Akatsuki members');
      } finally {
        setLoading(false);
      }
    };

    fetchAkatsuki();
  }, []);

  useEffect(() => {
    const filtered = akatsuki.filter((member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) // Use searchTerm from Redux
    );
    setFilteredAkatsuki(filtered);
  }, [searchTerm, akatsuki]);

  const handleSort = (option: string) => {
    dispatch(setSortOption(option)); // Dispatch the sort option
    let sortedMembers = [...filteredAkatsuki];

    switch (option) {
      case 'nameAsc':
        sortedMembers.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameDesc':
        sortedMembers.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setFilteredAkatsuki(sortedMembers);
  };

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
            Akatsuki Members
          </Typography>

          <Grid container spacing={2} marginBottom={3} justifyContent="center">
            <Grid item xs={12} sm={8}>
              <TextField
                label="Search"
                variant="outlined"
                fullWidth
                value={searchTerm} // Use searchTerm from Redux
                onChange={(e) => dispatch(setSearchQuery(e.target.value))} // Dispatch action to update search query
                sx={{ minWidth: { sm: 200, md: 400 } }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortOption} // Use sortOption from Redux
                  onChange={(e) => handleSort(e.target.value)} // Sort using the local method
                  label="Sort By"
                  sx={{ minWidth: 100, fontSize: '0.875rem' }}
                >
                  <MenuItem value="default">Default</MenuItem>
                  <MenuItem value="nameAsc">Name Ascending</MenuItem>
                  <MenuItem value="nameDesc">Name Descending</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={2} justifyContent="center">
            {filteredAkatsuki.length > 0 ? (
              filteredAkatsuki.map((character) => (
                <Grid item xs={12} sm={6} md={4} lg={2.4} key={character.id}>
                  <CharacterCard character={character} />
                </Grid>
              ))
            ) : (
              <Typography variant="body1" align="center" sx={{ width: '100%', marginTop: 4 }}>
                No characters found.
              </Typography>
            )}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default Akatsuki;
