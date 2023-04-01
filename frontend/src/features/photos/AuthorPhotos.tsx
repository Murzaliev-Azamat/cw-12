import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectFetchAllPhotosLoading, selectPhotos } from './photosSlice';
import { selectUser } from '../users/usersSlise';
import { deletePhoto, fetchPhotos } from './photosThunks';
import Spinner from '../../components/UI/Spinner/Spinner';
import { apiUrl } from '../../constants';
import { NavLink, useParams } from 'react-router-dom';
import { Button, Grid, Typography } from '@mui/material';
import AlertDialog from '../../components/UI/Dialog/Dialog';

const AuthorPhotos = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const photos = useAppSelector(selectPhotos);
  const fetchAllPhotosLoading = useAppSelector(selectFetchAllPhotosLoading);
  const user = useAppSelector(selectUser);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState('');

  const cancelAlertDialog = () => setShowAlertDialog(false);

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
        <AlertDialog show={showAlertDialog} onClose={cancelAlertDialog}>
          <img src={apiUrl + '/' + selectedPhoto} style={{ width: '100%' }} alt="image"></img>
        </AlertDialog>
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
              <img
                onClick={() => {
                  setSelectedPhoto(photo.image);
                  setShowAlertDialog(true);
                }}
                src={apiUrl + '/' + photo.image}
                style={{ marginRight: '10px', width: '200px' }}
                alt="image"
              ></img>
              <Typography sx={{ mr: 1 }}>{photo.name}</Typography>
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
