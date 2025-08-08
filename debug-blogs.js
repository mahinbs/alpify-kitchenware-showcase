// Debug script to check blog data
console.log('=== BLOG DEBUG SCRIPT ===');

// Check if adminBlogs exists in localStorage
const storedBlogs = localStorage.getItem('adminBlogs');
console.log('Stored blogs:', storedBlogs);

if (storedBlogs) {
  try {
    const blogs = JSON.parse(storedBlogs);
    console.log('Parsed blogs:', blogs);
    console.log('Number of blogs:', blogs.length);
    
    const publishedBlogs = blogs.filter(blog => blog.isPublished);
    console.log('Published blogs:', publishedBlogs);
    console.log('Number of published blogs:', publishedBlogs.length);
    
    blogs.forEach((blog, index) => {
      console.log(`Blog ${index + 1}:`, {
        id: blog.id,
        title: blog.title,
        isPublished: blog.isPublished,
        category: blog.category
      });
    });
  } catch (error) {
    console.error('Error parsing blogs:', error);
  }
} else {
  console.log('No blogs found in localStorage');
  
  // Initialize sample blogs
  const sampleBlogs = [
    {
      id: "1",
      title: "The Future of Stainless Steel Kitchenware",
      content: "Stainless steel kitchenware has been a staple in professional kitchens for decades...",
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
      content: "Selecting the perfect cookware set can be overwhelming with so many options available...",
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
    }
  ];
  
  localStorage.setItem('adminBlogs', JSON.stringify(sampleBlogs));
  console.log('Sample blogs initialized:', sampleBlogs);
}

console.log('=== END DEBUG ==='); 