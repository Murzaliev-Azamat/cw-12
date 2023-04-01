import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectFetchAllPhotosLoading, selectPhotos } from './photosSlice';
import { selectUser } from '../users/usersSlise';
import { deletePhoto, fetchPhotos } from './photosThunks';
import Spinner from '../../components/UI/Spinner/Spinner';
import { apiUrl } from '../../constants';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const AuthorPhotos = () => {
  const dispatch = useAppDispatch();
  const photos = useAppSelector(selectPhotos);
  const fetchAllPhotosLoading = useAppSelector(selectFetchAllPhotosLoading);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchPhotos(user?._id));
  }, [dispatch, user?._id]);

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
        {photos.map((photo) => {
          return (
            <div
              key={photo._id}
              style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', position: 'relative' }}
            >
              <img src={apiUrl + '/' + photo.image} style={{ marginRight: '10px', width: '200px' }} alt="image"></img>
              <Link to={'/photos/' + photo._id} style={{ marginRight: '10px' }}>
                {photo.name}
              </Link>
              {user && user.role === 'admin' && (
                <Button onClick={() => removePhoto(photo._id)} variant="contained" style={{ marginRight: '10px' }}>
                  Delete
                </Button>
              )}
              {user && user.role === 'admin' && (
                <>
                  <div
                    style={{
                      backgroundColor: 'white',
                      width: '185px',
                      height: '25px',
                      position: 'absolute',
                      top: '5%',
                      left: '1%',
                    }}
                  >
                    <p style={{ color: 'red' }}>Неопубликовано</p>
                  </div>
                </>
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
