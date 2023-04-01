import React, { useEffect, useState } from 'react';
import { deletePhoto, fetchPhotos } from './photosThunks';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectFetchAllPhotosLoading, selectPhotos } from './photosSlice';
import Spinner from '../../components/UI/Spinner/Spinner';
import { apiUrl } from '../../constants';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { selectUser } from '../users/usersSlise';
import AlertDialog from '../../components/UI/Dialog/Dialog';

const Photos = () => {
  const dispatch = useAppDispatch();
  const photos = useAppSelector(selectPhotos);
  const fetchAllPhotosLoading = useAppSelector(selectFetchAllPhotosLoading);
  const user = useAppSelector(selectUser);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState('');

  const cancelAlertDialog = () => setShowAlertDialog(false);

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

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
              <Typography>
                {photo.name + ' By: '}
                <Link to={'/author-photos/' + photo.user._id} style={{ marginRight: '10px' }}>
                  {photo.user.displayName}
                </Link>
              </Typography>
              {user && user.role === 'admin' && (
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

export default Photos;
