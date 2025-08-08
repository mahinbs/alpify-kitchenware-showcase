import React from 'react';
import { useBlogs } from '@/hooks/use-blogs';

const BlogTest = () => {
  const { blogs, loading } = useBlogs();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Blog Hook Test</h1>
      
      <div className="mb-4">
        <strong>Loading:</strong> {loading ? 'Yes' : 'No'}
      </div>
      
      <div className="mb-4">
        <strong>Total Blogs:</strong> {blogs.length}
      </div>
      
      <div className="mb-4">
        <strong>Published Blogs:</strong> {blogs.filter(blog => blog.isPublished).length}
      </div>
      
      <div className="mb-4">
        <strong>Raw Blog Data:</strong>
        <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto max-h-96">
          {JSON.stringify(blogs, null, 2)}
        </pre>
      </div>
      
      <div className="mb-4">
        <strong>localStorage adminBlogs:</strong>
        <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto max-h-96">
          {localStorage.getItem('adminBlogs') || 'No data found'}
        </pre>
      </div>
    </div>
  );
};

export default BlogTest; 