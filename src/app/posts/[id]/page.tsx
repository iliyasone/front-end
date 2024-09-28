"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { API_URL } from "@/config";
import PostItem from "@/components/Post"; // Import the PostItem component
import { Post } from "@/components/Post";

const fetchPostById = async (id: number): Promise<Post | null> => {
  try {
    const response = await fetch(`${API_URL}/posts/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 404) {
      return null; // Return null if post is not found
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch post:", error);
    return null; // Handle other errors
  }
};

const PostDetailPage = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Get the post ID from the URL

  useEffect(() => {
    const getPost = async () => {
      const postData = await fetchPostById(Number(id));
      setPost(postData);
      setLoading(false); // Mark loading as finished
    };

    getPost();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!post) {
    return (
      <div className="p-4 max-w-full mx-auto">
        <h2 className="text-3xl font-semibold mb-4 text-center">
          Post Not Found
        </h2>
        <p className="text-lg text-center text-gray-500">
          The post you are looking for does not exist or has been deleted.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-full mx-auto">
      <PostItem post={post} />
    </div>
  );
};

export default PostDetailPage;
