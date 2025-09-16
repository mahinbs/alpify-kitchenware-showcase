import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  image: string | null;
  published_at: string;
  updated_at: string;
  is_published: boolean;
  read_time: number;
  views: number;
}

export const useBlogs = (category?: string) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        let query = supabase
          .from('blogs')
          .select('*')
          .eq('is_published', true)
          .order('published_at', { ascending: false });

        if (category) {
          query = query.eq('category', category);
        }

        const { data, error } = await query;

        if (error) {
          console.error('Error loading blogs:', error);
          setBlogs([]);
        } else {
          setBlogs(data || []);
        }
      } catch (error) {
        console.error('Error loading blogs:', error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, [category]);

  return { blogs, loading };
}; 