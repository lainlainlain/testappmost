import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, IconButton } from '@mui/material';
import { AddShoppingCart, Favorite } from '@mui/icons-material';
import { Product } from '@/types';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // Предотвращаем переход по ссылке
    e.preventDefault();
    // Перенаправляем пользователя на подробную страницу товара
    window.location.href = `/product/${product.id}`;
  };

  return (
    <Link href={`/product/${product.id}`}>
      <Card onClick={() => handleCardClick}>
        <CardMedia component="img" height="140" image={product.thumbnail} alt={product.title} />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton aria-label="Add to Cart">
            <AddShoppingCart />
          </IconButton>
          <IconButton aria-label="Add to Favorites">
            <Favorite />
          </IconButton>
        </CardActions>
      </Card>
    </Link>
  );
};

export default ProductCard;
