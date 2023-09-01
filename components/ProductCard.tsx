import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, IconButton } from '@mui/material';
import { AddShoppingCart, Favorite } from '@mui/icons-material';

interface Product {
  id: number;
  title: string;
  category: string;
  description: string;
  discountPercentage: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card>
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
  );
};

export default ProductCard;
