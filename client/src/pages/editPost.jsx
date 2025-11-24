import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { postService, categoryService } from "../services/api";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // ✅ Load categories + post data
  useEffect(() => {
    async function load() {
      try {
        const catData = await categoryService.getCategories();
        setCategories(catData.categories || catData);

        const post = await postService.getPost(id);
        setTitle(post.title);
        setContent(post.content);
        setCategory(post.category?._id || "");
      } catch (err) {
        console.error(err);
        setError("Failed to load post");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  //  Submit update
  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      await postService.updatePost(id, { title, content, category });
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Failed to update post");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-center p-6">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Post</h2>

      {error && <p className="text-red-600 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-medium block">Title</label>
          <input
            className="w-full border rounded p-2 text-gray-900"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="font-medium block">Category</label>
          <select
            className="w-full border rounded p-2 text-gray-900"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-medium block">Content</label>
          <textarea
            className="w-full border rounded p-2 text-gray-900 min-h-40"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <button
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "Updating..." : "Update Post"}
        </button>
      </form>
    </div>
  );
}
