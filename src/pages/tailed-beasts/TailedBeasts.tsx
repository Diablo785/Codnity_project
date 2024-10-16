import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { getAllTailedBeasts } from '../../api/api'; 
import { Box, Typography, CircularProgress, TextField, MenuItem, Select, InputLabel, FormControl, SelectChangeEvent, Grid } from '@mui/material';
import TailedBeastCard from '../../components/cards/TailedBeastCard'; 
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, setSortOption } from '../../store/searchSlice'; // Import actions from Redux slice

interface TailedBeastsProps {
  isSidebarOpen: boolean;
}

const TailedBeasts: React.FC<TailedBeastsProps> = ({ isSidebarOpen }) => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: any) => state.search.searchQuery);
  const sortOption = useSelector((state: any) => state.search.sortOption);

  const [tailedBeasts, setTailedBeasts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [totalTailedBeasts, setTotalTailedBeasts] = useState(0);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const fetchTailedBeasts = async () => {
      setLoading(true);
      setError('');
  
      await new Promise((resolve) => setTimeout(resolve, 1000));
  
      try {
        const response = await getAllTailedBeasts(page);
        console.log('Fetched Tailed Beasts:', response);
  
        const fetchedTailedBeasts = response.tailedBeasts;
        const total = response.total;
  
        if (Array.isArray(fetchedTailedBeasts)) {
          const filteredTailedBeasts = fetchedTailedBeasts.filter((tailedBeast: any) =>
            tailedBeast.name
          );
  
          setTotalTailedBeasts(total);
  
          const uniqueTailedBeasts = filteredTailedBeasts.filter((newTailedBeast) => {
            const exists = tailedBeasts.some(
              (existingTailedBeast) => existingTailedBeast.id === newTailedBeast.id
            );
            return !exists;
          });
  
          if (uniqueTailedBeasts.length === 0) {
            setHasMore(false);
          } else {
            setTailedBeasts((prevTailedBeasts) => {
              const updatedTailedBeasts = [...prevTailedBeasts, ...uniqueTailedBeasts];
              return Array.from(new Map(updatedTailedBeasts.map((item) => [item.id, item])).values());
            });
          }
        } else {
          throw new Error('Unexpected data format');
        }
      } catch (err) {
        setError('An error occurred while fetching tailed beasts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchTailedBeasts();
  }, [page]);

  const lastTailedBeastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading || searchQuery) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prevPage => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, searchQuery]
  );

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  }, [dispatch]);

  const handleSortChange = useCallback((event: SelectChangeEvent<string>) => {
    dispatch(setSortOption(event.target.value as string));
  }, [dispatch]);

  const filteredAndSortedTailedBeasts = useMemo(() => {
    return tailedBeasts
      .filter((tailedBeast) => tailedBeast.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => {
        if (sortOption === 'loaded') return 0;
        if (sortOption === 'nameAsc') return a.name.localeCompare(b.name);
        if (sortOption === 'nameDesc') return b.name.localeCompare(a.name);
        return 0;
      });
  }, [tailedBeasts, searchQuery, sortOption]);

  return (
    <main
      className="flex-1 bg-gray-100 p-0 md:p-8 transition-all duration-300 overflow-hidden"
      style={{
        width: isSidebarOpen ? `calc(100vw - 275px)` : `calc(100vw - 55px)`,
      }}
    >
      <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom align="center">
        Tailed Beasts
      </Typography>

      <Grid container spacing={2} marginBottom={3} justifyContent="center">
        <Grid item xs={12} sm={8}>
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ minWidth: { sm: 200, md: 400 } }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortOption}
              onChange={handleSortChange}
              label="Sort By"
              sx={{ minWidth: 100, fontSize: '0.875rem' }}
            >
              <MenuItem value="loaded">Loaded Order</MenuItem>
              <MenuItem value="nameAsc">Name (A-Z)</MenuItem>
              <MenuItem value="nameDesc">Name (Z-A)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Typography variant="h6" marginBottom={2} align="center">
        {`Total Tailed Beasts Loaded: ${tailedBeasts.length}/${totalTailedBeasts}`}
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {filteredAndSortedTailedBeasts.length === 0 && !loading && (
          <Typography variant="body1">No tailed beasts found.</Typography>
        )}
        {filteredAndSortedTailedBeasts.map((tailedBeast, index) => {
          const isLastTailedBeast = filteredAndSortedTailedBeasts.length === index + 1;
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={2.4}
              key={tailedBeast.id}
              ref={isLastTailedBeast ? lastTailedBeastElementRef : null}
            >
              <TailedBeastCard tailedBeast={tailedBeast} />
            </Grid>
          );
        })}
      </Grid>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
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

export default React.memo(TailedBeasts);
