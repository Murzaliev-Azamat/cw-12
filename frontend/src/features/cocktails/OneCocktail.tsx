import React, { useEffect } from 'react';
import { apiUrl } from '../../constants';
import { useParams } from 'react-router-dom';
import { fetchOneCocktail } from './cocktailsThunks';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCocktail } from './cocktailsSlice';

const OneCocktail = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const cocktail = useAppSelector(selectCocktail);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchOneCocktail(params.id));
    }
  }, [dispatch, params.id]);

  return (
    cocktail && (
      <div>
        <div style={{ display: 'flex', marginBottom: '15px', position: 'relative' }}>
          <img src={apiUrl + '/' + cocktail.image} style={{ marginRight: '10px', width: '200px' }} alt="image"></img>
          <div>
            <h3>{cocktail.name}</h3>
            <p>Ingredients:</p>
            <ul>
              {cocktail.ingredients.map((ingredient) => (
                <li key={ingredient._id}>{ingredient.name + ' ' + ingredient.amount}</li>
              ))}
            </ul>
          </div>
        </div>
        <h4>Recipe:</h4>
        <p>{cocktail.recipe}</p>
      </div>
    )
  );
};

export default OneCocktail;
