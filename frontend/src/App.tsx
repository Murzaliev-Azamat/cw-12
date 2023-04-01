import React from 'react';
import { Button, Container, Grid } from '@mui/material';
import { NavLink, Route, Routes } from 'react-router-dom';
import Cocktails from './features/cocktails/Cocktails';
import AppToolBar from './components/UI/AppToolBar/AppToolBar';
import Register from './features/users/Register';
import Login from './features/users/Login';
import { useAppSelector } from './app/hooks';
import { selectUser } from './features/users/usersSlise';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import FormForCocktails from './features/cocktails/FormForCocktails';
import OneCocktail from './features/cocktails/OneCocktail';
import MyCocktails from './features/cocktails/MyCocktails';

function App() {
  const user = useAppSelector(selectUser);

  return (
    <div className="App">
      <AppToolBar />
      <Container maxWidth="md" sx={{ mt: 2 }}>
        {user && (
          <Grid container sx={{ mb: 2 }}>
            <Grid item xs={2}>
              <Button
                component={NavLink}
                variant="contained"
                size="small"
                disableElevation
                style={{ color: 'white' }}
                to={'/add-cocktail'}
              >
                Add Cocktail
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button
                component={NavLink}
                variant="contained"
                size="small"
                disableElevation
                style={{ color: 'white' }}
                to={'/my-cocktails'}
              >
                My cocktails
              </Button>
            </Grid>
          </Grid>
        )}
        <Routes>
          <Route path="/" element={<Cocktails />} />
          <Route
            path="/add-cocktail"
            element={
              <ProtectedRoute isAllowed={(user && user.role === 'admin') || (user && user.role === 'user')}>
                <FormForCocktails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-cocktails"
            element={
              <ProtectedRoute isAllowed={user !== null}>
                <MyCocktails />
              </ProtectedRoute>
            }
          />
          <Route path="/cocktails/:id" element={<OneCocktail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<span>Такой страницы не существует</span>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
