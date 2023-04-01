import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCocktails, selectFetchAllCocktailsLoading } from './cocktailsSlice';
import { selectUser } from '../users/usersSlise';
import { deleteCocktail, fetchCocktails, publishCocktail } from './cocktailsThunks';
import Spinner from '../../components/UI/Spinner/Spinner';
import { apiUrl } from '../../constants';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const MyCocktails = () => {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(selectCocktails);
  const fetchAllCocktailsLoading = useAppSelector(selectFetchAllCocktailsLoading);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchCocktails(user?._id));
  }, [dispatch, user?._id]);

  const removeCocktail = async (id: string) => {
    await dispatch(deleteCocktail(id));
    await dispatch(fetchCocktails());
  };

  const publish = async (id: string) => {
    await dispatch(publishCocktail(id));
    await dispatch(fetchCocktails());
  };

  let info = null;

  if (fetchAllCocktailsLoading) {
    info = <Spinner />;
  } else {
    info = (
      <>
        {cocktails.map((cocktail) => {
          return (
            <div
              key={cocktail._id}
              style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', position: 'relative' }}
            >
              <img
                src={apiUrl + '/' + cocktail.image}
                style={{ marginRight: '10px', width: '200px' }}
                alt="image"
              ></img>
              <Link to={'/cocktails/' + cocktail._id} style={{ marginRight: '10px' }}>
                {cocktail.name}
              </Link>
              {user && user.role === 'admin' && (
                <Button
                  onClick={() => removeCocktail(cocktail._id)}
                  variant="contained"
                  style={{ marginRight: '10px' }}
                >
                  Delete
                </Button>
              )}
              {user && user.role === 'admin' && !cocktail.isPublished && (
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
                  <Button onClick={() => publish(cocktail._id)} variant="contained" color="success">
                    Опубликовать
                  </Button>
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

export default MyCocktails;
