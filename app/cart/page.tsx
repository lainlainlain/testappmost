'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '@/redux/cartSlice';
import { RootState } from '@/redux/store';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Container,
  Paper,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  // Вычисляем общее количество товаров в корзине
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Вычисляем суммарную стоимость всех товаров в корзине
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  // Создаем объект формы с помощью Formik
  const formik = useFormik({
    initialValues: {
      fullName: '',
      address: '',
      email: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Пожалуйста, введите ваше полное имя'),
      address: Yup.string().required('Пожалуйста, введите ваш адрес'),
      email: Yup.string().email('Неверный формат email').required('Пожалуйста, введите ваш email'),
    }),
    onSubmit: (values, { resetForm }) => {
      // Ваши действия при отправке формы, например, отправка данных на сервер
      console.log('Отправка данных на сервер:', values);
      alert('Данные были отправлены');

      // Очистка полей формы после успешной отправки
      resetForm();
    },
  });

  return (
    <Container maxWidth="md" className="mt-36">
      <Paper elevation={3} className="p-4">
        <Typography variant="h4" gutterBottom>
          Корзина ({totalQuantity} товаров)
        </Typography>
        <List>
          {cartItems &&
            cartItems.map((item) => (
              <ListItem key={item.product.id}>
                <ListItemText
                  primary={`${item.product.title} - $${item.product.price} x ${item.quantity}`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="Удалить"
                    onClick={() => handleRemoveFromCart(item.product.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
        </List>
        <Typography variant="h5" className="mt-4">
          Итого: ${totalPrice.toFixed(2)}
        </Typography>
        <form onSubmit={formik.handleSubmit} style={{ marginTop: '30px' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="fullName"
                name="fullName"
                label="Полное имя"
                variant="outlined"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                helperText={formik.touched.fullName && formik.errors.fullName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="address"
                name="address"
                label="Адрес"
                variant="outlined"
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="inherit"
                disabled={totalQuantity === 0}>
                Оформить заказ
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default CartPage;
