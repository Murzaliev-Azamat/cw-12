import { createSlice } from '@reduxjs/toolkit';
import { Cocktail } from '../../../types';
import { RootState } from '../../app/store';
import { addCocktail, fetchCocktails, fetchOneCocktail } from './cocktailsThunks';

interface CocktailsState {
  cocktails: Cocktail[] | [];
  cocktail: Cocktail | null;
  fetchAllCocktailsLoading: boolean;
  addCocktailLoading: boolean;
}

const initialState: CocktailsState = {
  cocktails: [],
  cocktail: null,
  fetchAllCocktailsLoading: false,
  addCocktailLoading: false,
};

export const CocktailsSlice = createSlice({
  name: 'cocktails',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCocktails.pending, (state) => {
      state.fetchAllCocktailsLoading = true;
    });
    builder.addCase(fetchCocktails.fulfilled, (state, action) => {
      state.fetchAllCocktailsLoading = false;
      state.cocktails = action.payload;
    });
    builder.addCase(fetchCocktails.rejected, (state) => {
      state.fetchAllCocktailsLoading = false;
    });
    builder.addCase(addCocktail.pending, (state) => {
      state.addCocktailLoading = true;
    });
    builder.addCase(addCocktail.fulfilled, (state) => {
      state.addCocktailLoading = false;
    });
    builder.addCase(addCocktail.rejected, (state) => {
      state.addCocktailLoading = false;
    });
    builder.addCase(fetchOneCocktail.pending, (state) => {
      state.fetchAllCocktailsLoading = true;
    });
    builder.addCase(fetchOneCocktail.fulfilled, (state, action) => {
      state.fetchAllCocktailsLoading = false;
      state.cocktail = action.payload;
    });
    builder.addCase(fetchOneCocktail.rejected, (state) => {
      state.fetchAllCocktailsLoading = false;
    });
  },
});

export const cocktailsReducer = CocktailsSlice.reducer;
export const selectCocktails = (state: RootState) => state.cocktails.cocktails;
export const selectCocktail = (state: RootState) => state.cocktails.cocktail;

export const selectFetchAllCocktailsLoading = (state: RootState) => state.cocktails.fetchAllCocktailsLoading;
export const selectAddCocktailLoading = (state: RootState) => state.cocktails.addCocktailLoading;
