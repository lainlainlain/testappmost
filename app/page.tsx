'use client';
import React, { useState } from 'react';
import { Container, Grid, Button, IconButton, Menu, MenuItem } from '@mui/material';
import ProductCard from '@/components/ProductCard';
import axios from 'axios';
import { Product } from '@/types';
import ProductForm from '@/components/ProductForm';
import { Categories } from '@/components/Categories';
import { ArrowDropDown } from '@mui/icons-material';

export default function Home() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [categories, setCategories] = React.useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [all, setAll] = React.useState(false);
  const [sortDirection, setSortDirection] = React.useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products/categories');

        const categories = response.data;
        setCategories(categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
      }
    };
    fetchCategories();
  }, []);

  React.useEffect(() => {
    fetchProducts();
  }, []);

  React.useEffect(() => {
    if (all) {
      setSelectedCategory('');
      fetchProducts();
      setAll(false);
    } else if (selectedCategory) {
      fetchProductsByCategory(selectedCategory);
    }
  }, [selectedCategory, all]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get<{ products: Product[] }>('https://dummyjson.com/products');
      setProducts(data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchProductsByCategory = async (category: string) => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/category/${category}`);
      // Получаем список продуктов из ответа
      const productsData = response.data.products;
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

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

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    // Дополнительные действия, которые вы хотите выполнить при выборе категории
  };

  const handleSort = (direction: 'asc' | 'desc') => {
    const sorted = [...products];

    if (direction === 'asc') {
      sorted.sort((a, b) => a.price - b.price);
      setSortDirection('asc');
    } else {
      sorted.sort((a, b) => b.price - a.price);
      setSortDirection('desc');
    }

    setProducts(sorted);
    setAnchorEl(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <main className="flex min-h-screen items-center pt-24">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3} display={'flex'}>
          <div className="flex flex-col w-36">
            <Button
              onClick={() => setAll(true)}
              sx={{ color: 'black' }}
              variant="contained"
              color="primary"
              className="mb-2">
              All
            </Button>
            <Categories onCategoryClick={handleCategorySelect} categories={categories}></Categories>
          </div>
        </Grid>

        <Grid item xs={12} md={6}>
          <Container>
            {!selectedCategory && (
              <ProductForm onSubmitSuccess={handleProductSubmitSuccess}></ProductForm>
            )}
            <div className="flex justify-end">
              <IconButton
                size="small"
                aria-controls="sort-menu"
                aria-haspopup="true"
                onClick={handleClick}>
                Сортировать <ArrowDropDown />
              </IconButton>
              <Menu
                id="sort-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                <MenuItem onClick={() => handleSort('asc')}>По возрастанию цены</MenuItem>
                <MenuItem onClick={() => handleSort('desc')}>По убыванию цены</MenuItem>
              </Menu>
            </div>
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
        </Grid>
        {/* Пустая боковая колонка для растяжения */}
        <Grid item md={3}></Grid>
      </Grid>
    </main>
  );
}
