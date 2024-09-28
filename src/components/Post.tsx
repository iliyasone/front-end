import React, { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { API_URL } from "@/config";

export interface Post {
  id: number;
  label: string;
  content: string;
  hideRating: boolean;
  rating: number;
  published_time: number;
  vote: number; // -1 for downvote, 0 for no vote, 1 for upvote
}

interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const [vote, setVote] = useState(post.vote);
  const [rating, setRating] = useState(post.rating);
  const formattedTime = format(new Date(post.published_time * 1000), "PPpp");

  const handleVote = async (newVote: number) => {
    if (vote === newVote) {
      await fetch(`${API_URL}/posts/${post.id}/vote`, {
        method: "DELETE",
      });
      setVote(0);
      setRating(rating - newVote); // Adjust rating accordingly
    } else {
      await fetch(`${API_URL}/posts/${post.id}/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vote: newVote }),
      });
      setRating(rating + newVote - vote); // Adjust rating accordingly
      setVote(newVote); // Update vote to new value
    }
  };

  return (
    <div className="border rounded-lg p-6 shadow-lg bg-white relative">
      <h2 className="text-2xl font-semibold mb-2">
        <Link href={`/posts/${post.id}`}>{post.label}</Link>
      </h2>
      <p className="text-lg mb-4 whitespace-pre-wrap">{post.content}</p>
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">{formattedTime}</div>
        {!post.hideRating && (
          <div className="flex items-center text-sm">
            <button
              onClick={() => handleVote(1)}
              className={`mr-2 ${vote === 1 ? "font-bold text-green-500" : "text-gray-500"}`}
            >
              + {rating}
            </button>
            <button
              onClick={() => handleVote(-1)}
              className={`${vote === -1 ? "font-bold text-red-500" : "text-gray-500"}`}
            >
              -
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostItem;
