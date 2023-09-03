import { Button } from '@mui/material';
import React from 'react';

interface CategoriesProps {
  categories: string[];
  onCategoryClick: (category: string) => void;
}

export const Categories: React.FC<CategoriesProps> = ({ categories, onCategoryClick }) => {
  const handleCategoryClick = (category: string) => {
    // Вызываем функцию обратного вызова при клике на категорию
    onCategoryClick(category);
  };
  return (
    <>
      {categories.map((category) => {
        return (
          <Button
            onClick={() => handleCategoryClick(category)}
            sx={{ color: 'black' }}
            key={category}
            variant="contained"
            color="primary"
            className="mb-2">
            {category}
          </Button>
        );
      })}
    </>
  );
};
