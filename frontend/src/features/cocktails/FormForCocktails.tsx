import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import FileInput from '../../components/UI/FileInput/FileInput';
import { CocktailApi } from '../../../types';
import { addCocktail, fetchCocktails } from './cocktailsThunks';
import { selectAddCocktailLoading } from './cocktailsSlice';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';

const FormForCocktails = () => {
  const dispatch = useAppDispatch();
  const addCocktailLoading = useAppSelector(selectAddCocktailLoading);
  const [ingredientsFields, setIngredientsFields] = useState<JSX.Element[]>([]);

  const [state, setState] = useState<CocktailApi>({
    name: '',
    recipe: '',
    image: null,
    ingredients: [],
  });

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(
      addCocktail({
        name: state.name,
        recipe: state.recipe,
        image: state.image,
        ingredients: state.ingredients,
      }),
    );
    setState({ name: '', recipe: '', image: null, ingredients: [] });
    setIngredientsFields([]);
    await dispatch(fetchCocktails());
    enqueueSnackbar('Спасибо! Ваш коктейль находится на рассмотрении модератора');
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const inputIngredientsChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setState((prevState) => {
      const newIngredients = [...prevState.ingredients];
      newIngredients[index] = { ...newIngredients[index], [name]: value };
      return { ...prevState, ingredients: newIngredients };
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        [name]: null,
      }));
    }
  };

  const removeInputs = (id: number) => {
    setIngredientsFields((prev) => prev.splice(id, 1));
  };

  const addIngredientField = (index: number) => {
    const newIngredientField = (
      <Grid key={Date.now()} container justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
        <Grid item sx={{ width: '65%' }}>
          <TextField
            id="name"
            label="Ingredient Name"
            value={state.ingredients[index]}
            onChange={(e) => inputIngredientsChangeHandler(e, index)}
            name="name"
            required
          />
        </Grid>
        <Grid item>
          <TextField
            id="amount"
            label="Amount"
            value={state.ingredients[index]}
            onChange={(e) => inputIngredientsChangeHandler(e, index)}
            name="amount"
            required
          />
        </Grid>
        <Grid item>
          <Button onClick={() => removeInputs(ingredientsFields.length)} color="primary" variant="contained">
            Delete
          </Button>
        </Grid>
      </Grid>
    );
    setIngredientsFields((prev) => [...prev, newIngredientField]);
    setState((prevState) => ({ ...prevState, ingredients: [...prevState.ingredients, { name: '', amount: '' }] }));
  };

  let disabled = false;

  if (addCocktailLoading) {
    disabled = true;
  }

  return (
    <form autoComplete="off" onSubmit={submitFormHandler}>
      <SnackbarProvider
        variant="success"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      />
      <Grid item container justifyContent="space-between" alignItems="center" xs sx={{ mb: 1 }}>
        <TextField
          sx={{ width: '100%' }}
          id="name"
          label="Name"
          value={state.name}
          onChange={inputChangeHandler}
          name="name"
          required
        />
      </Grid>

      <Grid item xs sx={{ mb: 1 }}>
        {ingredientsFields}
        <Button onClick={() => addIngredientField(state.ingredients.length)} color="primary" variant="contained">
          Add ingredient
        </Button>
      </Grid>

      <Grid container direction="column" spacing={2} sx={{ mb: 1 }}>
        <Grid item xs>
          <TextField
            sx={{ width: 1 }}
            multiline
            rows={3}
            id="recipe"
            label="Recipe"
            value={state.recipe}
            onChange={inputChangeHandler}
            name="recipe"
            required
          />
        </Grid>

        <Grid item xs>
          <FileInput onChange={fileInputChangeHandler} name="image" label="Image" />
        </Grid>
      </Grid>

      <Button disabled={disabled} type="submit" color="primary" variant="contained">
        Add cocktail
      </Button>
    </form>
  );
};

export default FormForCocktails;
