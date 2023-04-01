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
          <Route path="/author-photos/:id" element={<AuthorPhotos />} />
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
