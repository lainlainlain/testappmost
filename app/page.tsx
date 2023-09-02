'use client';
import React from 'react';
import { Container, Grid } from '@mui/material';
import ProductCard from '@/components/ProductCard';
import axios from 'axios';
import { Product } from '@/types';
import ProductForm from '@/components/ProductForm';

export default function Home() {
  const [products, setProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get<{ products: Product[] }>('https://dummyjson.com/products');
        setProducts(data.products);
        console.log(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Test</h1>
      <Container>
        <ProductForm></ProductForm>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
}
