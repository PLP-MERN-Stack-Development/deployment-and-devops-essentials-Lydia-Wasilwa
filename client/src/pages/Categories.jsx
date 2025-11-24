import { useEffect, useState } from "react";
import { categoryService } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const data = await categoryService.getAllCategories();
      setCategories(data.categories || data);
    } catch (err) {
      console.error(err);
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;

    setSaving(true);
    try {
      await categoryService.createCategory({ name });
      setName("");
      loadCategories();
    } catch (err) {
      console.error(err);
      setError("Failed to add category");
    } finally {
      setSaving(false);
    }
  }

  async function deleteCategory(id) {
    if (!window.confirm("Delete this category?")) return;

    try {
      await categoryService.deleteCategory(id);
      loadCategories();
    } catch (err) {
      console.error(err);
      alert("Failed to delete category");
    }
  }

  if (loading) return <p className="text-center p-6">Loading...</p>;

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Categories</h2>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      {/* Create Category Form */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          className="border rounded p-2 w-full text-gray-900"
          placeholder="New category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          disabled={saving}
          className="bg-green-600 text-white px-4 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Add"}
        </button>
      </form>

      {/* Category List */}
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li
            key={cat._id}
            className="flex justify-between items-center p-2 border rounded bg-white"
          >
            {cat.name}
            <button
              onClick={() => deleteCategory(cat._id)}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
