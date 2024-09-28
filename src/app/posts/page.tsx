"use client";

import React, { useEffect, useState } from "react";
import { API_URL } from "@/config";
import PostItem, { Post } from "@/components/Post";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface PostSubmission {
  label: string;
  content: string;
  hideRating: boolean;
}

const submitPost = async (newPost: PostSubmission) => {
  const response = await fetch(`${API_URL}/posts`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  });

  if (!response.ok) {
    throw new Error("Failed to create a post");
  }

  return response.json();
};

const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${API_URL}/posts`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

const PostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [formData, setFormData] = useState({
    label: "",
    content: "",
    hideRating: false,
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [touchedFields, setTouchedFields] = useState({
    label: false,
    content: false,
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getPosts = async () => {
      const postsData = await fetchPosts();
      setPosts(postsData);
    };

    getPosts();
    const intervalId = setInterval(getPosts, 10000); // Poll every 10 seconds

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, []);

  useEffect(() => {
    // Validate the form to enable/disable the button
    const isLabelValid =
      formData.label.length >= 1 && formData.label.length <= 50;
    const isContentValid =
      formData.content.length >= 1 && formData.content.length <= 4000;

    setIsButtonDisabled(!(isLabelValid && isContentValid));

    if (!isLabelValid && touchedFields.label) {
      setErrorMessage("Label must be between 1 and 50 characters.");
    } else if (!isContentValid && touchedFields.content) {
      setErrorMessage("Content must be between 1 and 4000 characters.");
    } else {
      setErrorMessage("");
    }
  }, [formData, touchedFields]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newPost = await submitPost(formData);
      setPosts((prevPosts) => [newPost, ...prevPosts]); // Prepend new post
      setFormData({ label: "", content: "", hideRating: false }); // Reset the form
      setTouchedFields({ label: false, content: false }); // Reset touch state
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement; // Type assertion to ensure it's an HTMLInputElement
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleFocus = (field: "label" | "content") => {
    setTouchedFields({ ...touchedFields, [field]: true });
  };

  return (
    <div className="p-4 max-w-full mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Posts</h1>

      <form
        onSubmit={handleSubmit}
        className="mb-6 border p-6 rounded-lg shadow-lg"
      >
        <label
          htmlFor="label"
          className="block text-lg font-black font-montserrat mb-2"
        >
          Share your ideas
        </label>

        <div className="mb-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Input
              type="text"
              name="label"
              value={formData.label}
              onChange={handleInputChange}
              onFocus={() => handleFocus("label")}
              placeholder="Label"
              required
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>

        <div className="mb-4">
          <Textarea
            placeholder="Type your message here."
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            onFocus={() => handleFocus("content")}
            required
            className="w-full p-2 border rounded-lg"
            rows={6}
          />
        </div>

        <div className="mb-4">
          <label className="flex items-center">
            <Checkbox
              name="hideRating"
              checked={formData.hideRating}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, hideRating: !!checked })
              }
              className="mr-2"
            />
            Hide Rating
          </label>
        </div>

        <Button
          type="submit"
          disabled={isButtonDisabled}
          className={`w-full p-2 rounded-lg ${isButtonDisabled ? "bg-white text-black" : "bg-black text-white"}`}
          onMouseOver={() => {
            if (
              isButtonDisabled &&
              (touchedFields.label || touchedFields.content)
            ) {
              setErrorMessage(
                "Please meet the label and content requirements.",
              );
            }
          }}
          onMouseLeave={() => setErrorMessage("")}
        >
          Submit Post
        </Button>

        {/* Show error message below the button */}
        {errorMessage && (
          <p className="mt-2 text-red-600 text-sm">{errorMessage}</p>
        )}
      </form>

      <div className="space-y-6">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostsPage;
