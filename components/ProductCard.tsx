import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Button,
  TextField,
} from '@mui/material';
import { AddShoppingCart, Favorite } from '@mui/icons-material';
import { Product } from '@/types';
import Link from 'next/link';
import axios from 'axios';

interface ProductCardProps {
  product: Product;
  onTextChange?: (id: number, newText: string) => void; // Обработчик для изменения текста
  onDelete?: (id: number) => void; // Обработчик для удаления продукта
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onTextChange, onDelete }) => {
  const [newText, setNewText] = useState(product.title);
  const [isVisible, setVisible] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const handleTextChange = async () => {
    try {
      const response = await axios.patch<Product>(`https://dummyjson.com/products/${product.id}`, {
        title: newText,
      });

      // Вызываем колбэк для передачи измененных данных в верхний компонент
      if (onTextChange) {
        onTextChange(product.id, response.data.title);
      }
    } catch (error) {
      console.error('Error updating text:', error);
    }
  };

  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // Предотвращаем переход по ссылке
    e.preventDefault();
    // Перенаправляем пользователя на подробную страницу товара
    window.location.href = `/product/${product.id}`;
  };

  const handleDeleteClick = async () => {
    setButtonDisabled(true);

    try {
      const response = await axios.delete<{ isDeleted: boolean }>(
        `https://dummyjson.com/products/${product.id}`,
      );

      if (response.data.isDeleted && onDelete) {
        onDelete(product.id);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    } finally {
      setButtonDisabled(false);
    }
  };
  return (
    <Card>
      <Link href={`/product/${product.id}`}>
        <CardMedia
          onClick={() => handleCardClick}
          component="img"
          image={product.thumbnail}
          alt={product.title}
          sx={{
            height: '150px',
          }}
        />
      </Link>
      <CardContent>
        {onTextChange && <Button onClick={() => setVisible(!isVisible)}>Change name</Button>}
        {isVisible && (
          <Typography gutterBottom variant="h6" component="div">
            <TextField type="text" value={newText} onChange={(e) => setNewText(e.target.value)} />
            <IconButton onClick={handleTextChange}>Save</IconButton>
          </Typography>
        )}
        <Typography gutterBottom variant="h6" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b> Price: ${product.price}</b>
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="Add to Cart">
          <AddShoppingCart />
        </IconButton>
        <IconButton aria-label="Add to Favorites">
          <Favorite />
        </IconButton>
        {onDelete && (
          <IconButton
            disabled={isButtonDisabled}
            size="small"
            aria-label="Delete"
            onClick={handleDeleteClick} // Добавляем обработчик удаления
          >
            Delete
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

export default ProductCard;
