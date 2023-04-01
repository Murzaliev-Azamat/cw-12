import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Cocktail, CocktailApi } from '../../../types';

export const fetchCocktails = createAsyncThunk<Cocktail[], string | undefined>('cocktails/fetchAll', async (id) => {
  if (id) {
    const cocktailsResponse = await axiosApi.get<Cocktail[]>('/cocktails?user=' + id);
    return cocktailsResponse.data;
  }
  const cocktailsResponse = await axiosApi.get<Cocktail[]>('/cocktails');
  return cocktailsResponse.data;
});

export const fetchOneCocktail = createAsyncThunk<Cocktail, string>('cocktails/fetchOne', async (id) => {
  const cocktailResponse = await axiosApi.get<Cocktail | null>('cocktails/' + id);
  const cocktail = cocktailResponse.data;

  if (cocktail === null) {
    throw new Error('Not found!');
  }

  return cocktail;
});

export const addCocktail = createAsyncThunk<void, CocktailApi>('cocktails/addCocktail', async (cocktail) => {
  const formData = new FormData();

  Object.entries(cocktail).forEach(([key, value]) => {
    if (value !== null) {
      if (Array.isArray(value) && key === 'ingredients') {
        formData.append('ingredients', JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    }
  });

  await axiosApi.post<CocktailApi>('/cocktails', formData);
});

export const publishCocktail = createAsyncThunk<void, string>('cocktails/publishCocktail', async (id) => {
  await axiosApi.patch('/cocktails/' + id + '/togglePublished');
});

export const deleteCocktail = createAsyncThunk<void, string>('cocktails/deleteCocktail', async (id) => {
  await axiosApi.delete('/cocktails/' + id);
});
