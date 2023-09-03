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

  const handleProductSubmitSuccess = (data: Product) => {
    setProducts((prevProducts) => [...prevProducts, data]);
  };

  const handleTextChange = (productId: number, newText: string) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        return product.id === productId ? { ...product, title: newText } : product;
      }),
    );
  };

  const handleDelete = (productId: number) => {
    // Удаляем продукт из стейта
    if (confirm('Вы действительно хотите удалить товар?')) {
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
    }
  };

  console.log(products[0]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Container>
        <ProductForm onSubmitSuccess={handleProductSubmitSuccess}></ProductForm>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <ProductCard
                product={product}
                onTextChange={handleTextChange}
                onDelete={handleDelete}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
}
