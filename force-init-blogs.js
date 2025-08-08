// Force initialize blogs script
console.log('=== FORCE INITIALIZE BLOGS ===');

// Clear existing blogs
localStorage.removeItem('adminBlogs');
console.log('Cleared existing blogs');

// Create fresh sample blogs
const sampleBlogs = [
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
  }
];

// Save to localStorage
localStorage.setItem('adminBlogs', JSON.stringify(sampleBlogs));
console.log('Sample blogs saved to localStorage');

// Verify the data
const storedBlogs = localStorage.getItem('adminBlogs');
console.log('Stored blogs:', storedBlogs);

const parsedBlogs = JSON.parse(storedBlogs);
console.log('Parsed blogs:', parsedBlogs);
console.log('Number of blogs:', parsedBlogs.length);

const publishedBlogs = parsedBlogs.filter(blog => blog.isPublished === true);
console.log('Published blogs:', publishedBlogs);
console.log('Number of published blogs:', publishedBlogs.length);

// Test each blog structure
parsedBlogs.forEach((blog, index) => {
  console.log(`Blog ${index + 1} structure:`, {
    id: blog.id,
    title: blog.title,
    isPublished: blog.isPublished,
    isPublishedType: typeof blog.isPublished,
    category: blog.category,
    author: blog.author,
    excerpt: blog.excerpt,
    image: blog.image
  });
});

console.log('=== END FORCE INITIALIZE ==='); 