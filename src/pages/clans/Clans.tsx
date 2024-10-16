import React, { useEffect, useState, useCallback } from 'react';
import { getAllClans } from '../../api/api';
import { Box, Typography, CircularProgress, Grid, Card, CardContent, Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../../store/store';
import { setSearchQuery, setSortOption } from '../../store/searchSlice';
import { useDispatch, useSelector } from 'react-redux';

interface Clan {
  id: number;
  name: string;
  characters: number[];
}

interface ClansProps {
  isSidebarOpen: boolean;
}

const Clans: React.FC<ClansProps> = ({ isSidebarOpen }) => {
  const dispatch = useDispatch<AppDispatch>();

  // Access search query and sort option from Redux store
  const searchQuery = useSelector((state: RootState) => state.search.searchQuery || '');
  const sortOption = useSelector((state: RootState) => state.search.sortOption || 'loaded');

  const [clans, setClans] = useState<Clan[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false); 
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalClans, setTotalClans] = useState(0);
  const [duplicateCount, setDuplicateCount] = useState(0); 
  const navigate = useNavigate();

  // Fetch clans function
  const fetchClans = async (page: number) => {
    setLoading(true);
    setShowSpinner(false); 
    setDuplicateCount(0); 

    try {
      const response = await getAllClans(page);
      setTotalClans(response.total);

      setClans((prevClans) => {
        const existingNames = new Set(prevClans.map((clan) => clan.name.trim().toLowerCase()));
        const duplicates = response.clans.filter((clan: Clan) =>
          existingNames.has(clan.name.trim().toLowerCase())
        );
        setDuplicateCount(duplicates.length);
        const uniqueClans = response.clans.filter(
          (clan: Clan) => !existingNames.has(clan.name.trim().toLowerCase())
        );
        setHasMore(response.clans.length > 0);
        return [...prevClans, ...uniqueClans];
      });

      setTimeout(() => setShowSpinner(true), 500);
    } catch (err) {
      setError('An error occurred while fetching clans. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClans(page);
  }, [page]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight - 1 &&
      hasMore &&
      !loading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [hasMore, loading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // Use the searchQuery from Redux instead of local state
  const filteredClans = clans.filter((clan) =>
    clan.name.toLowerCase().includes(searchQuery.toLowerCase()) // Change searchTerm to searchQuery
  );

  const sortedClans = () => {
    switch (sortOption) {
      case 'memberCountAsc':
        return [...filteredClans].sort((a, b) => a.characters.length - b.characters.length);
      case 'memberCountDesc':
        return [...filteredClans].sort((a, b) => b.characters.length - a.characters.length);
      default:
        return filteredClans;
    }
  };

  return (
    <main
      className="flex-1 bg-gray-100 p-4 md:p-8 transition-all duration-300 overflow-hidden"
      style={{
        width: isSidebarOpen ? `calc(100vw - 275px)` : `calc(100vw - 55px)`,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{
          fontWeight: 'bold',
          color: '#333',
          textTransform: 'uppercase',
          letterSpacing: '2px',
        }}
      >
        Clans
      </Typography>

      <Grid container spacing={2} marginBottom={3} justifyContent="center">
        <Grid item xs={12} sm={8}>
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={searchQuery} // Use searchQuery from Redux
            onChange={(e) => dispatch(setSearchQuery(e.target.value))} // Dispatch action to update search query
            sx={{ minWidth: { sm: 200, md: 400 } }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortOption} // Use sortOption from Redux
              onChange={(e) => dispatch(setSortOption(e.target.value))} // Dispatch action to update sort option
              label="Sort By"
              sx={{ minWidth: 100, fontSize: '0.875rem' }}
            >
              <MenuItem value="default">Default</MenuItem>
              <MenuItem value="memberCountAsc">Member Count Ascending</MenuItem>
              <MenuItem value="memberCountDesc">Member Count Descending</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Typography
        variant="subtitle1"
        align="center"
        sx={{
          color: '#666',
          fontStyle: 'italic',
          marginBottom: 3,
        }}
      >
        {filteredClans.length} of {totalClans} clans displayed{' '}
      </Typography>

      <Grid container spacing={3}>
        {sortedClans().map((clan) => (
          <Grid item xs={12} sm={6} md={4} key={clan.id}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
                transition: '0.3s',
                backgroundColor: '#fff',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    fontWeight: 'bold',
                    color: '#1976d2',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                  }}
                >
                  {clan.name}
                </Typography>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ marginTop: 1, textAlign: 'center' }}
                >
                  {clan.characters.length} characters
                </Typography>

                <Box display="flex" justifyContent="center" marginTop={2}>
                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    sx={{
                      borderRadius: 20,
                      paddingLeft: 3,
                      paddingRight: 3,
                      backgroundImage: 'linear-gradient(45deg, #1976d2, #2196f3)',
                      textTransform: 'none',
                      color: '#fff',
                      '&:hover': {
                        backgroundImage: 'linear-gradient(45deg, #145ea8, #1976d2)',
                      },
                    }}
                    onClick={() => navigate(`/clans/${clan.id}`)}
                  >
                    View Details
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {loading && showSpinner && (
        <Box display="flex" justifyContent="center" marginTop={2}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography variant="body1" color="error" sx={{ marginTop: 3 }}>
          {error}
        </Typography>
      )}
    </main>
  );
};

export default Clans;
