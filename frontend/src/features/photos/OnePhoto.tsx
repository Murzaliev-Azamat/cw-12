import React, { useEffect } from 'react';
import { apiUrl } from '../../constants';
import { useParams } from 'react-router-dom';
import { fetchOnePhoto } from './photosThunks';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectPhoto } from './photosSlice';

const OnePhoto = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const photo = useAppSelector(selectPhoto);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchOnePhoto(params.id));
    }
  }, [dispatch, params.id]);

  return (
    photo && (
      <div>
        <div style={{ display: 'flex', marginBottom: '15px', position: 'relative' }}>
          <img src={apiUrl + '/' + photo.image} style={{ marginRight: '10px', width: '200px' }} alt="image"></img>
          <div>
            <h3>{photo.name}</h3>
          </div>
        </div>
      </div>
    )
  );
};

export default OnePhoto;
