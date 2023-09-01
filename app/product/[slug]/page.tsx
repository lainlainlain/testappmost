'use client';
import { useParams } from 'next/navigation';
import { Container, Grid, Typography, Button } from '@mui/material';
import { Product } from '@/types';
import axios from 'axios';
import React from 'react';

const ProductDetailPage = () => {
  const params = useParams();

  const [products, setProducts] = React.useState<Product>();

  React.useEffect(() => {
    const getOneProduct = async () => {
      try {
        const { data } = await axios.get<Product>(`https://dummyjson.com/products/${params.slug}`);
        setProducts(data);
        console.log(params.id);

        console.log(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    getOneProduct();
  }, []);

  if (!products) {
    return <div>Товар не найден.</div>;
  }

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <img src={products.images[0]} alt={products.title} style={{ maxWidth: '100%' }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {products.title}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Цена: ${products.price.toFixed(2)}
          </Typography>
          <Typography variant="body1" paragraph>
            {products.description}
          </Typography>
          <Typography variant="body2" paragraph>
            Рейтинг: {products.rating}
          </Typography>
          <Typography variant="body2" paragraph>
            В наличии: {products.stock} шт.
          </Typography>
          <Button variant="contained" color="primary">
            Добавить в корзину
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetailPage;