import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectFetchAllPhotosLoading, selectPhotos } from './photosSlice';
import { selectUser } from '../users/usersSlise';
import { deletePhoto, fetchPhotos } from './photosThunks';
import Spinner from '../../components/UI/Spinner/Spinner';
import { apiUrl } from '../../constants';
import { Link, NavLink, useParams } from 'react-router-dom';
import { Button, Grid, Typography } from '@mui/material';

const AuthorPhotos = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const photos = useAppSelector(selectPhotos);
  const fetchAllPhotosLoading = useAppSelector(selectFetchAllPhotosLoading);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchPhotos(params.id));
  }, [dispatch, params.id]);

  const removePhoto = async (id: string) => {
    await dispatch(deletePhoto(id));
    await dispatch(fetchPhotos());
  };

  let info = null;

  if (fetchAllPhotosLoading) {
    info = <Spinner />;
  } else {
    info = (
      <>
        {user && user._id === params.id && (
          <Grid container sx={{ mb: 2 }}>
            <Grid item xs={2}>
              <Button
                component={NavLink}
                variant="contained"
                size="small"
                disableElevation
                style={{ color: 'white' }}
                to={'/add-photo'}
              >
                Add new photo
              </Button>
            </Grid>
          </Grid>
        )}
        {photos.map((photo) => {
          return (
            <div
              key={photo._id}
              style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', position: 'relative' }}
            >
              <img src={apiUrl + '/' + photo.image} style={{ marginRight: '10px', width: '200px' }} alt="image"></img>
              <Typography sx={{ mr: 1 }}>{photo.name}</Typography>
              {/*<Link to={'/photos/' + photo._id} style={{ marginRight: '10px' }}>*/}
              {/*  {photo.name}*/}
              {/*</Link>*/}
              {((user && user.role === 'admin') || (user && user._id === photo.user._id)) && (
                <Button onClick={() => removePhoto(photo._id)} variant="contained" style={{ marginRight: '10px' }}>
                  Delete
                </Button>
              )}
            </div>
          );
        })}
      </>
    );
  }

  return <div>{info}</div>;
};

export default AuthorPhotos;
