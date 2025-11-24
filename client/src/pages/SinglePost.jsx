import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { postService } from "../services/api";

export default function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await postService.getPostById(id);
        setPost(data.post || data);
      } catch (err) {
        console.error(err);
        setError("Post not found");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <p className="text-lg p-6">Loading post...</p>;
  if (error) return <p className="text-red-600 p-6">{error}</p>;

  return (
    <div>
      <Link to="/" className="text-blue-600 underline mb-4 inline-block">
        ← Back to posts
      </Link>

      <h1 className="text-3xl font-bold mb-3">{post.title}</h1>
      
      <p className="text-gray-400 text-sm mb-4">
        {new Date(post.createdAt).toLocaleString()}
      </p>

      <div className="text-gray-800 leading-relaxed whitespace-pre-line">
        {post.content}
      </div>
    </div>
  );
}
