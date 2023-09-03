import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Modal } from '@mui/material';
import LoginForm from './LoginForm';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLoginClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
