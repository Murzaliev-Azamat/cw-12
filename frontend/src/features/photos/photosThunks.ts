import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Photo, PhotoApi } from '../../../types';

export const fetchPhotos = createAsyncThunk<Photo[], string | undefined>('photos/fetchAll', async (id) => {
  if (id) {
    const photosResponse = await axiosApi.get<Photo[]>('/photos?user=' + id);
    return photosResponse.data;
  }
  const photosResponse = await axiosApi.get<Photo[]>('/photos');
  return photosResponse.data;
});

export const fetchOnePhoto = createAsyncThunk<Photo, string>('photos/fetchOne', async (id) => {
  const photoResponse = await axiosApi.get<Photo | null>('photos/' + id);
  const photo = photoResponse.data;

  if (photo === null) {
    throw new Error('Not found!');
  }

  return photo;
});

export const addPhoto = createAsyncThunk<void, PhotoApi>('photos/addPhoto', async (photo) => {
  const formData = new FormData();

  const keys = Object.keys(photo) as (keyof PhotoApi)[];
  keys.forEach((key) => {
    const value = photo[key];

    if (value !== null) {
      formData.append(key, value);
    }
  });

  await axiosApi.post<PhotoApi>('/photos', formData);
});

export const deletePhoto = createAsyncThunk<void, string>('photos/deletePhoto', async (id) => {
  await axiosApi.delete('/photos/' + id);
});
