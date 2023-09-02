import React, { useState } from 'react';
import { Typography, TextField, Button, Paper, Box, Snackbar } from '@mui/material'; // Добавлен Box
import axios from 'axios'; // Импортируем axios
import { useDispatch } from 'react-redux';
import { login } from '@/redux/authSlice';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  padding: 20,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const inputStyle = {
  marginBottom: 5,
};

const textFieldStyle = {
  width: 150,
};

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Состояние для успешной авторизации
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Отправляем данные на API
      const response = await axios.post('https://dummyjson.com/auth/login', {
        username,
        password,
      });

      // Обрабатываем успешный ответ
      console.log('Успешный вход:', response.data);
      setUsername('');
      setPassword('');
      // Устанавливаем состояние успешной авторизации
      setIsAuthenticated(true);

      // Открываем Snackbar для уведомления
      setSnackbarOpen(true);

      localStorage.setItem('token', response.data.token);

      dispatch(
        login({
          token: response.data.token,
          user: response.data,
        }),
      );
    } catch (err) {
      // Обрабатываем ошибку
      setError('Ошибка входа. Проверьте имя пользователя и пароль.');
    }
  };

  return (
    <Paper sx={modalStyle}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}>
        <Typography variant="h6">Войти в систему</Typography>
        <Box sx={inputStyle}>
          <TextField
            label="Имя пользователя"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            sx={textFieldStyle}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Box>
        <Box sx={inputStyle}>
          <TextField
            label="Пароль"
            type="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            sx={textFieldStyle}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        {error && <Typography color="error">{error}</Typography>}
        <Button sx={{ color: 'black' }} type="submit" variant="contained" color="primary" fullWidth>
          Войти
        </Button>
      </form>
      {/* Snackbar для уведомления об успешной авторизации */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // Длительность отображения Snackbar
        onClose={() => setSnackbarOpen(false)}
        message="Успешный вход!"
      />
    </Paper>
  );
};

export default LoginForm;
