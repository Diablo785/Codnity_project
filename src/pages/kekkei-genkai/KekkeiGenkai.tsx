import React, { useEffect, useState, useCallback } from 'react';
import { getAllKekkeiGenkai } from '../../api/api';
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../../store/store'; // Import types for Redux
import { setSearchQuery, setSortOption } from '../../store/searchSlice'; // Import actions from Redux slice
import { useDispatch, useSelector } from 'react-redux'; // Import hooks to use Redux

interface KekkeiGenkai {
  id: number;
  name: string;
  characters: number[];
}

interface KekkeiGenkaiProps {
  isSidebarOpen: boolean;
}

const KekkeiGenkai: React.FC<KekkeiGenkaiProps> = ({ isSidebarOpen }) => {
  const dispatch = useDispatch<AppDispatch>();

  // Access search query and sort option from Redux store
  const searchQuery = useSelector((state: RootState) => state.search.searchQuery || '');
  const sortOption = useSelector((state: RootState) => state.search.sortOption || 'default');

  const [kekkeiGenkai, setKekkeiGenkai] = useState<KekkeiGenkai[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalKekkeiGenkai, setTotalKekkeiGenkai] = useState(0);
  const [duplicateCount, setDuplicateCount] = useState(0);
  const navigate = useNavigate();

  const fetchKekkeiGenkai = async (page: number) => {
    setLoading(true);
    setShowSpinner(false);
    setDuplicateCount(0);

    try {
      const response = await getAllKekkeiGenkai(page);
      setTotalKekkeiGenkai(response.total);

      setKekkeiGenkai((prevKekkeiGenkai) => {
        const existingNames = new Set(prevKekkeiGenkai.map((kg) => kg.name.trim().toLowerCase()));
        const duplicates = response['kekkei-genkai'].filter((kg: KekkeiGenkai) =>
          existingNames.has(kg.name.trim().toLowerCase())
        );
        setDuplicateCount(duplicates.length);

        const uniqueKekkeiGenkai = response['kekkei-genkai'].filter(
          (kg: KekkeiGenkai) => !existingNames.has(kg.name.trim().toLowerCase())
        );

        setHasMore(uniqueKekkeiGenkai.length > 0);
        return [...prevKekkeiGenkai, ...uniqueKekkeiGenkai];
      });

      setTimeout(() => {
        setShowSpinner(true);
      }, 500);
    } catch (err) {
      setError('An error occurred while fetching Kekkei Genkai. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKekkeiGenkai(page);
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
  const filteredKekkeiGenkai = kekkeiGenkai.filter((kg) =>
    kg.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedKekkeiGenkai = () => {
    switch (sortOption) {
      case 'memberCountAsc':
        return [...filteredKekkeiGenkai].sort((a, b) => a.characters.length - b.characters.length);
      case 'memberCountDesc':
        return [...filteredKekkeiGenkai].sort((a, b) => b.characters.length - a.characters.length);
      default:
        return filteredKekkeiGenkai;
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
        Kekkei Genkai
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
        {filteredKekkeiGenkai.length} of {totalKekkeiGenkai} Kekkei Genkai displayed
      </Typography>

      <Grid container spacing={3}>
        {sortedKekkeiGenkai().map((kg) => (
          <Grid item xs={12} sm={6} md={4} key={kg.id}>
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
                  {kg.name}
                </Typography>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ marginTop: 1, textAlign: 'center' }}
                >
                  {kg.characters.length} characters
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
                      backgroundImage: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                      '&:hover': {
                        backgroundColor: '#42a5f5',
                      },
                    }}
                    onClick={() => navigate(`/kekkei-genkai/${kg.id}`)}
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
        <Box display="flex" justifyContent="center" marginTop={4}>
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

export default KekkeiGenkai
