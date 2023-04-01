import React from 'react';
import { Button, Container, Grid } from '@mui/material';
import { NavLink, Route, Routes } from 'react-router-dom';
import Photos from './features/photos/Photos';
import AppToolBar from './components/UI/AppToolBar/AppToolBar';
import Register from './features/users/Register';
import Login from './features/users/Login';
import { useAppSelector } from './app/hooks';
import { selectUser } from './features/users/usersSlise';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import FormForPhotos from './features/photos/FormForPhotos';
import OnePhoto from './features/photos/OnePhoto';
import AuthorPhotos from './features/photos/AuthorPhotos';

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
                to={'/add-photo'}
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
                to={'/my-photos'}
              >
                My photos
              </Button>
            </Grid>
          </Grid>
        )}
        <Routes>
          <Route path="/" element={<Photos />} />
          <Route
            path="/add-photo"
            element={
              <ProtectedRoute isAllowed={(user && user.role === 'admin') || (user && user.role === 'user')}>
                <FormForPhotos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-photos"
            element={
              <ProtectedRoute isAllowed={user !== null}>
                <AuthorPhotos />
              </ProtectedRoute>
            }
          />
          <Route path="/photos/:id" element={<OnePhoto />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<span>Такой страницы не существует</span>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
