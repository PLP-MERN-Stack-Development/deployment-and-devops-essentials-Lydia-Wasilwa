import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { postService } from "../services/api";

function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await postService.getPost(id);
        setPost(data);
      } catch (err) {
        setError("Post not found");
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await postService.deletePost(id);
        navigate("/");
      } catch (err) {
        alert("Error deleting post");
      }
    }
  };

  if (loading) return <p>Loading post...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>No post data.</p>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>

      <div style={{ marginTop: "20px" }}>
        {user && post?.author?._id === user?._id && (
          <Link
            to={`/edit/${id}`}
            className="bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600"
          >
            Edit
          </Link>
        )}

        <button onClick={handleDelete} style={{ marginLeft: "10px" }}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default PostDetails;
