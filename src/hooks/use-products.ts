import { useState, useEffect } from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  features: string[];
  specifications: {
    material?: string;
    coating?: string;
    handles?: string;
    warranty?: string;
    origin?: string;
    thickness?: string;
    base?: string;
    lids?: string;
    [key: string]: string | undefined;
  };
  inStock: boolean;
  rating: number;
  reviews: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export const useProducts = (category?: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = () => {
      try {
        const storedProducts = localStorage.getItem('adminProducts');
        if (storedProducts) {
          const allProducts = JSON.parse(storedProducts);
          if (category) {
            const filteredProducts = allProducts.filter((product: Product) => 
              product.category.toLowerCase() === category.toLowerCase()
            );
            setProducts(filteredProducts);
          } else {
            setProducts(allProducts);
          }
        } else {
          // Fallback to empty array if no products in localStorage
          setProducts([]);
        }
      } catch (error) {
        console.error('Error loading products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();

    // Listen for changes to localStorage
    const handleStorageChange = () => {
      loadProducts();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events (for same-tab updates)
    window.addEventListener('productsUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('productsUpdated', handleStorageChange);
    };
  }, [category]);

  return { products, loading };
}; 