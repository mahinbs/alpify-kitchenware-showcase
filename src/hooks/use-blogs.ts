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
      console.log('=== useBlogs Hook Debug ===');
      try {
        const storedBlogs = localStorage.getItem('adminBlogs');
        console.log('Raw stored blogs:', storedBlogs);
        
        if (storedBlogs) {
          const allBlogs = JSON.parse(storedBlogs);
          console.log('Parsed all blogs:', allBlogs);
          console.log('Number of blogs:', allBlogs.length);
          
          // Check if blogs have proper structure
          const hasValidStructure = allBlogs.every((blog: Blog) => 
            blog && 
            blog.id && 
            blog.title && 
            blog.excerpt && 
            blog.author && 
            blog.category && 
            blog.image && 
            blog.publishedAt && 
            blog.readTime !== undefined && 
            blog.views !== undefined &&
            blog.title !== "jgvygcfhjcfu" // Check for placeholder title
          );
          
          if (!hasValidStructure) {
            console.log('Detected corrupted blog data, reinitializing...');
            localStorage.removeItem('adminBlogs');
            throw new Error('Corrupted data detected');
          }
          
          if (category) {
            const filteredBlogs = allBlogs.filter((blog: Blog) =>
              blog.category.toLowerCase() === category.toLowerCase()
            );
            console.log('Category filtered blogs:', filteredBlogs);
            setBlogs(filteredBlogs);
          } else {
            console.log('Setting all blogs:', allBlogs);
            setBlogs(allBlogs);
          }
        } else {
          console.log('No blogs in localStorage, initializing sample blogs...');
          // Initialize with sample blogs if none exist
          const sampleBlogs: Blog[] = [
            {
              id: "1",
              title: "The Future of Stainless Steel Kitchenware",
              content: "Stainless steel kitchenware has been a staple in professional kitchens for decades. Its durability, resistance to corrosion, and ease of maintenance make it an ideal choice for both commercial and residential use. In this comprehensive guide, we explore the latest innovations in stainless steel manufacturing and how they're shaping the future of kitchenware...",
              excerpt: "Discover the latest innovations in stainless steel kitchenware manufacturing and how they're revolutionizing the industry.",
              author: "Alpify Global Team",
              category: "Industry Insights",
              tags: ["stainless steel", "innovation", "manufacturing", "kitchenware"],
              image: "https://res.cloudinary.com/dknafpppp/image/upload/v1754593817/ChatGPT_Image_Aug_8_2025_12_40_02_AM_o1rxt0.png",
              publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
              updatedAt: new Date().toISOString(),
              isPublished: true,
              readTime: 5,
              views: 1250
            },
            {
              id: "2",
              title: "Choosing the Right Cookware for Your Kitchen",
              content: "Selecting the perfect cookware set can be overwhelming with so many options available. From stainless steel to non-stick coatings, each material offers unique benefits. This guide will help you understand the differences between various cookware materials and choose the best option for your cooking needs...",
              excerpt: "A comprehensive guide to selecting the perfect cookware set for your kitchen needs and cooking style.",
              author: "Kitchen Expert",
              category: "Buying Guide",
              tags: ["cookware", "buying guide", "kitchen essentials", "cooking"],
              image: "https://res.cloudinary.com/dknafpppp/image/upload/v1754593817/ChatGPT_Image_Aug_8_2025_12_40_02_AM_o1rxt0.png",
              publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
              updatedAt: new Date().toISOString(),
              isPublished: true,
              readTime: 8,
              views: 890
            },
            {
              id: "3",
              title: "Professional Kitchen Equipment Guide",
              content: "Professional kitchens require equipment that can withstand heavy use, high temperatures, and rigorous cleaning protocols. This guide covers the essential equipment every professional kitchen needs, from commercial-grade cookware to specialized tools...",
              excerpt: "Essential equipment and tools for professional kitchens, from commercial cookware to specialized utensils.",
              author: "Chef's Corner",
              category: "Professional Guide",
              tags: ["professional", "equipment", "commercial", "kitchen tools"],
              image: "https://res.cloudinary.com/dknafpppp/image/upload/v1754593817/ChatGPT_Image_Aug_8_2025_12_40_02_AM_o1rxt0.png",
              publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
              updatedAt: new Date().toISOString(),
              isPublished: true,
              readTime: 6,
              views: 567
            }
          ];
          localStorage.setItem("adminBlogs", JSON.stringify(sampleBlogs));
          console.log('Sample blogs saved to localStorage');
          
          if (category) {
            const filteredBlogs = sampleBlogs.filter((blog: Blog) =>
              blog.category.toLowerCase() === category.toLowerCase()
            );
            console.log('Category filtered sample blogs:', filteredBlogs);
            setBlogs(filteredBlogs);
          } else {
            console.log('Setting sample blogs:', sampleBlogs);
            setBlogs(sampleBlogs);
          }
        }
      } catch (error) {
        console.error('Error loading blogs:', error);
        setBlogs([]);
      } finally {
        console.log('Setting loading to false');
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