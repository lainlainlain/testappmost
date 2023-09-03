'use client';
import { useParams } from 'next/navigation';
import { Container, Grid, Typography, Button } from '@mui/material';
import { Product } from '@/types';
import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/cartSlice';

const ProductDetailPage = () => {
  const [product, setProduct] = React.useState<Product>();
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  const params = useParams();

  React.useEffect(() => {
    const getOneProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Product>(`https://dummyjson.com/products/${params.slug}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    getOneProduct();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Товар не найден</div>;
  }

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  return (
    <Container sx={{ margin: '150px' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <img src={product.images[0]} alt={product.title} style={{ maxWidth: '100%' }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {product.title}
          </Typography>
          <Typography variant="h4" gutterBottom>
            Цена: ${product.price.toFixed(2)}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Скидка по акции:{product.discountPercentage}%
          </Typography>
          <Typography variant="body1" paragraph>
            Описание: {product.description}
          </Typography>
          <Typography variant="body1" paragraph>
            Категория: {product.category}
          </Typography>
          <Typography variant="body2" paragraph>
            Рейтинг: {product.rating}
          </Typography>
          <Typography variant="body2" paragraph>
            Бренд: {product.brand}
          </Typography>

          <Typography variant="body2" paragraph>
            В наличии: {product.stock} шт.
          </Typography>
          <Button onClick={() => handleAddToCart(product)} variant="contained" color="inherit">
            Добавить в корзину
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetailPage;
