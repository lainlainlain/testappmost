'use client';
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Modal, IconButton } from '@mui/material';
import LoginForm from './LoginForm';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleLoginClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Вычисляем общее количество товаров в корзине
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Вычисляем суммарную стоимость всех товаров в корзине
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link href="/">
            <Typography variant="h6" component="div">
              My app
            </Typography>
          </Link>
          <div>
            <Link href="/cart" className="mr-5">
              <IconButton color="inherit">
                <ShoppingCartIcon />
              </IconButton>
              {totalQuantity} | {totalPrice}$
            </Link>

            <Link href="/search">
              <Button color="inherit">Поиск</Button>
            </Link>
            {user ? (
              <Link href={'/user'}>
                {' '}
                <Button color="inherit">Профиль</Button>
              </Link>
            ) : (
              <Button color="inherit" onClick={handleLoginClick}>
                Логин
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>

      <Modal open={open} onClose={handleClose}>
        <div>
          <LoginForm></LoginForm>
        </div>
      </Modal>
    </div>
  );
};

export default Header;
