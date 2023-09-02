'use client';
import React from 'react';
import { Typography, Paper, Avatar, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const UserPage: React.FC = () => {
  // Используйте useSelector для получения данных о пользователе из хранилища
  const user = useSelector((state: RootState) => state.auth.user);

  // Проверяем наличие токена в Local Storage при загрузке страницы
  React.useEffect(() => {
    const token = localStorage.getItem('token');

    // if (!token) {
    //   // Если токен отсутствует, перенаправляем пользователя на страницу входа
    //   router.push('/login');
    // }
  }, []);

  if (!user) {
    return <div>Пользователь не найден.</div>;
  }

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
        <Avatar
          alt={user.username}
          src={user.image}
          sx={{ width: 100, height: 100, marginBottom: '10px' }}
        />
        <Typography variant="h4" gutterBottom>
          {user.firstName} {user.lastName}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          {user.username}
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Email: {user.email}
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Пол: {user.gender}
        </Typography>
      </Paper>
    </Grid>
  );
};

export default UserPage;
