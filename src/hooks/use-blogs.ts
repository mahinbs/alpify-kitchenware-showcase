import { useState, useEffect } from 'react';

export interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  image: string;
  publishedAt: string;
  updatedAt: string;
  isPublished: boolean;
  readTime: number;
  views: number;
}

export const useBlogs = (category?: string) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = () => {
      try {
        const storedBlogs = localStorage.getItem('adminBlogs');
        if (storedBlogs) {
          const allBlogs = JSON.parse(storedBlogs);
          if (category) {
            const filteredBlogs = allBlogs.filter((blog: Blog) =>
              blog.category.toLowerCase() === category.toLowerCase()
            );
            setBlogs(filteredBlogs);
          } else {
            setBlogs(allBlogs);
          }
        } else {
          setBlogs([]);
        }
      } catch (error) {
        console.error('Error loading blogs:', error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();

    const handleStorageChange = () => {
      loadBlogs();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('blogsUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('blogsUpdated', handleStorageChange);
    };
  }, [category]);

  return { blogs, loading };
}; 