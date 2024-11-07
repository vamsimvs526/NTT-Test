// src/Posts.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostsResponse {
  posts: Post[];
}


const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Fetch posts using Axios with a defined response type
    axios.get<PostsResponse>('https://dummyjson.com/posts')
      .then(response => {
        setPosts(response.data.posts.slice(0, 10)); // Display first 10 posts
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {posts.map(post => (
          <div key={post.id} style={{ flex: '1 0 21%', margin: '10px', padding: '10px', border: '1px solid #ddd' }}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;