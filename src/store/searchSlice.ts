// searchSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Ensure this interface is exported properly
export interface SearchState {
  searchQuery: string;
  sortOption: string;
}

const initialState: SearchState = {
  searchQuery: '',
  sortOption: 'loaded',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setSortOption(state, action: PayloadAction<string>) {
      state.sortOption = action.payload;
    },
  },
});

export const { setSearchQuery, setSortOption } = searchSlice.actions;
export default searchSlice.reducer;
