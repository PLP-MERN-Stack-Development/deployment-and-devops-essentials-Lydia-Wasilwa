import { useState, useEffect } from "react";

function PostForm({ initialData = {}, onSubmit, submitLabel }) {
  const [title, setTitle] = useState(initialData.title || "");
  const [content, setContent] = useState(initialData.content || "");
  const [category, setCategory] = useState(initialData.category || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content, category });
  };

  // update when editing existing values
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setContent(initialData.content || "");
      setCategory(initialData.category || "");
    }
  }, [initialData]);

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
      <div>
        <label>Title</label><br />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div style={{ marginTop: "10px" }}>
        <label>Content</label><br />
        <textarea
          rows="6"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
      </div>

      <div style={{ marginTop: "10px" }}>
        <label>Category</label><br />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      <button style={{ marginTop: "15px" }} type="submit">
        {submitLabel}
      </button>
    </form>
  );
}

export default PostForm;

