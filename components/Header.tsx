import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Modal } from '@mui/material';
import LoginForm from './LoginForm';
import Link from 'next/link';

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  const handleLoginClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link href="/">
            <Typography variant="h6" component="div">
              My app
            </Typography>
          </Link>
          <Button color="inherit" onClick={handleLoginClick}>
            Логин
          </Button>
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
