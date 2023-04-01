import { createSlice } from '@reduxjs/toolkit';
import { Photo } from '../../../types';
import { RootState } from '../../app/store';
import { addPhoto, fetchOnePhoto, fetchPhotos } from './photosThunks';

interface PhotosState {
  photos: Photo[] | [];
  photo: Photo | null;
  fetchAllPhotosLoading: boolean;
  addPhotoLoading: boolean;
}

const initialState: PhotosState = {
  photos: [],
  photo: null,
  fetchAllPhotosLoading: false,
  addPhotoLoading: false,
};

export const PhotosSlice = createSlice({
  name: 'photos',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPhotos.pending, (state) => {
      state.fetchAllPhotosLoading = true;
    });
    builder.addCase(fetchPhotos.fulfilled, (state, action) => {
      state.fetchAllPhotosLoading = false;
      state.photos = action.payload;
    });
    builder.addCase(fetchPhotos.rejected, (state) => {
      state.fetchAllPhotosLoading = false;
    });
    builder.addCase(addPhoto.pending, (state) => {
      state.addPhotoLoading = true;
    });
    builder.addCase(addPhoto.fulfilled, (state) => {
      state.addPhotoLoading = false;
    });
    builder.addCase(addPhoto.rejected, (state) => {
      state.addPhotoLoading = false;
    });
    builder.addCase(fetchOnePhoto.pending, (state) => {
      state.fetchAllPhotosLoading = true;
    });
    builder.addCase(fetchOnePhoto.fulfilled, (state, action) => {
      state.fetchAllPhotosLoading = false;
      state.photo = action.payload;
    });
    builder.addCase(fetchOnePhoto.rejected, (state) => {
      state.fetchAllPhotosLoading = false;
    });
  },
});

export const photosReducer = PhotosSlice.reducer;
export const selectPhotos = (state: RootState) => state.photos.photos;

export const selectFetchAllPhotosLoading = (state: RootState) => state.photos.fetchAllPhotosLoading;
export const selectAddPhotoLoading = (state: RootState) => state.photos.addPhotoLoading;
