import { useEffect, useState } from "react";
import { postService, categoryService } from "../services/api";
import { Link } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState("all");

  useEffect(() => {
    loadPosts();
    loadCategories();
  }, []);

  async function loadPosts(category = "all") {
    try {
      const data =
        category === "all"
          ? await postService.getPosts()
          : await postService.getPostsByCategory(category);

      setPosts(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function loadCategories() {
    try {
      const data = await categoryService.getCategories();
      setCategories(data.categories || data);
    } catch (err) {
      console.error(err);
    }
  }

  function handleFilter(cat) {
    setSelected(cat);
    loadPosts(cat);
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Latest Posts</h2>

      {/* Category Tabs */}
      <div className="flex gap-2 mb-5 overflow-x-auto">
        <button
          onClick={() => handleFilter("all")}
          className={`px-3 py-1 rounded ${selected === "all" ? "bg-black text-white" : "bg-gray-200"}`}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => handleFilter(cat._id)}
            className={`px-3 py-1 rounded ${
              selected === cat._id ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {posts.length === 0 && (
          <p className="text-gray-500">No posts found.</p>
        )}

        {posts.map((post) => (
          <Link
            key={post._id}
            to={`/post/${post._id}`}
            className="block p-4 border rounded hover:bg-gray-50"
          >
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
