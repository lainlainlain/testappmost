// ProductForm.tsx

import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Container, Paper } from '@mui/material';

const initialFormData = {
  id: 1,
  title: '',
  description: '',
  price: 0,
  discountPercentage: 0,
  rating: 0,
  stock: 0,
  brand: '',
  category: '',
  thumbnail: '',
  images: '',
};

const ProductForm: React.FC = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Отправляем POST-запрос на API
      await axios.post('https://dummyjson.com/products/add', formData);

      // Успешно отправлено
      alert('Продукт успешно добавлен.');

      // Сброс формы
      setFormData(initialFormData);
    } catch (error) {
      // Ошибка при отправке
      alert('Произошла ошибка при добавлении продукта.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
      {!isVisible ? (
        <Button variant="outlined" onClick={() => setIsVisible(true)}>
          Добавить
        </Button>
      ) : (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Название"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Описание"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Цена"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Скидка (%)"
                name="discountPercentage"
                type="number"
                value={formData.discountPercentage}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Рейтинг"
                name="rating"
                type="number"
                value={formData.rating}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Наличие"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Бренд"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Категория"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Ссылка на изображение (Thumbnail)"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Ссылки на изображения (через запятую)"
                name="images"
                value={formData.images}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid container justifyContent="center" spacing={3} sx={{ marginTop: '10px' }}>
              <Grid item>
                <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                  Добавить продукт
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => setIsVisible(false)}
                  type="submit"
                  variant="contained"
                  color="primary">
                  Закрыть
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      )}
    </Container>
  );
};

export default ProductForm;
