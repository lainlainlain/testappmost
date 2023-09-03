'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from '@/types';
import { Container, TextField, Button, Grid } from '@mui/material';
import ProductCard from '@/components/ProductCard';

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get<{ products: Product[] }>(
        `https://dummyjson.com/products/search?q=${searchQuery}`,
      );
      setSearchResults(response.data.products);
      console.log(response.data.products);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  useEffect(() => {
    // Выполняем поиск при загрузке страницы (или по какому-либо другому событию)
    handleSearch();
  }, []);

  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '100px 0' }}>
        <TextField
          label="Поиск по товарам"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          sx={{ marginLeft: '15px' }}
          variant="contained"
          color="inherit"
          onClick={handleSearch}>
          Поиск
        </Button>
      </div>

      <Grid container spacing={3}>
        {searchResults.length !== 0
          ? searchResults.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))
          : 'Товар не найден'}
      </Grid>
    </Container>
  );
};

export default SearchPage;
