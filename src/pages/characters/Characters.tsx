import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { getAllCharacters } from '../../api/api';
import { Box, Typography, CircularProgress, TextField, MenuItem, Select, InputLabel, FormControl, SelectChangeEvent, Grid, } from '@mui/material';
import CharacterCard from '../../components/cards/CharacterCard';
import { RootState, AppDispatch } from '../../store/store';
import { setSearchQuery, setSortOption } from '../../store/searchSlice';
import { useDispatch, useSelector } from 'react-redux';

interface CharactersProps {
  isSidebarOpen: boolean;
}

const Characters: React.FC<CharactersProps> = ({ isSidebarOpen }) => {
  const dispatch = useDispatch<AppDispatch>();

  const searchQuery = useSelector((state: RootState) => state.search?.searchQuery || '');
  const sortOption = useSelector((state: RootState) => state.search?.sortOption || 'loaded');

  const [characters, setCharacters] = React.useState<any[]>([]);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [hasMore, setHasMore] = React.useState(true);
  const [totalCharacters, setTotalCharacters] = React.useState(0);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setError('');

      await new Promise((resolve) => setTimeout(resolve, 1000));

      try {
        const { characters: fetchedCharacters, total } = await getAllCharacters(page);

        if (Array.isArray(fetchedCharacters)) {
          const filteredCharacters = fetchedCharacters.filter(
            (character: any) => character.images && character.images.length > 0 && character.name
          );

          setTotalCharacters(total);

          const uniqueCharacters = filteredCharacters.filter(
            (newCharacter) => !characters.some((existingCharacter) => existingCharacter.id === newCharacter.id)
          );

          if (uniqueCharacters.length === 0) {
            setHasMore(false);
          } else {
            setCharacters((prevCharacters) => {
              const updatedCharacters = [...prevCharacters, ...uniqueCharacters];
              return Array.from(new Map(updatedCharacters.map((item) => [item.id, item])).values());
            });
          }
        } else {
          throw new Error('Unexpected data format');
        }
      } catch (err) {
        setError('An error occurred while fetching characters. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [page]);

  const lastCharacterElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading || searchQuery) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, searchQuery]
  );

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setSearchQuery(event.target.value));
    },
    [dispatch]
  );

  const handleSortChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      dispatch(setSortOption(event.target.value as string));
    },
    [dispatch]
  );

  const filteredAndSortedCharacters = useMemo(() => {
    return characters
      .filter((character) => character.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => {
        if (sortOption === 'loaded') return 0;
        if (sortOption === 'nameAsc') return a.name.localeCompare(b.name);
        if (sortOption === 'nameDesc') return b.name.localeCompare(a.name);
        return 0;
      });
  }, [characters, searchQuery, sortOption]);

  return (
    <main
      className="flex-1 bg-gray-100 p-0 md:p-8 transition-all duration-300 overflow-hidden"
      style={{
        width: isSidebarOpen ? `calc(100vw - 275px)` : `calc(100vw - 55px)`,
      }}
    >
      <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom align="center">
        Naruto Characters
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
        {`Total Characters Loaded: ${characters.length}/${totalCharacters}`}
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {filteredAndSortedCharacters.length === 0 && !loading && (
          <Typography variant="body1">No characters found.</Typography>
        )}
        {filteredAndSortedCharacters.map((character, index) => {
          const isLastCharacter = filteredAndSortedCharacters.length === index + 1;
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={2.4}
              key={character.id}
              ref={isLastCharacter ? lastCharacterElementRef : null}
            >
              <CharacterCard character={character} />
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

export default React.memo(Characters);