import { API_URL } from "@/config";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const postId = params.id;

  const response = await fetch(`${API_URL}/posts/${postId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return {
      title: "Post Not Found",
      description:
        "The post you are looking for does not exist or has been deleted.",
    };
  }

  const post = await response.json();

  return {
    title: post.label ? `${post.label}` : "Post Detail",
    description: post.content
      ? post.content.substring(0, 150)
      : "Read more about this post.",
  };
}

export const dynamic = "force-dynamic";
