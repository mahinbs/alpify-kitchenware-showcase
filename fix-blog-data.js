// Fix blog data script
console.log('=== FIXING BLOG DATA ===');

// Clear existing blogs
localStorage.removeItem('adminBlogs');
console.log('Cleared existing blogs');

// Create properly structured sample blogs
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

// Save to localStorage
localStorage.setItem('adminBlogs', JSON.stringify(sampleBlogs));
console.log('Fixed blog data saved to localStorage');

// Verify the data
const storedBlogs = localStorage.getItem('adminBlogs');
const parsedBlogs = JSON.parse(storedBlogs);
console.log('Verified blogs:', parsedBlogs);
console.log('Number of blogs:', parsedBlogs.length);

// Check each blog structure
parsedBlogs.forEach((blog, index) => {
  console.log(`Blog ${index + 1} structure check:`, {
    id: blog.id,
    title: blog.title,
    isPublished: blog.isPublished,
    hasImage: !!blog.image,
    hasPublishedAt: !!blog.publishedAt,
    hasReadTime: typeof blog.readTime === 'number',
    hasViews: typeof blog.views === 'number',
    hasExcerpt: !!blog.excerpt,
    hasAuthor: !!blog.author,
    hasCategory: !!blog.category
  });
});

console.log('=== BLOG DATA FIXED ===');
console.log('Now refresh the blog page to see the changes!'); 