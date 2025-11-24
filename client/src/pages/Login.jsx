// src/pages/Login.jsx
import { useState } from "react";
import { authService } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth(); // Access the login function from context

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // Call the service function and await the response data
      const data = await authService.login({ email, password });
      //  Use the login function from context to update state and localStorage
      // This updates the React state AND stores the data in localStorage within AuthContext.js
      login(data.user, data.token); 
      
      // 3. Navigate the user
      navigate("/");

    } catch (err) {
      setError(err?.response?.data?.message || "Invalid login credentials");
    }
  }

  return (
    <div className="max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      {error && <p className="text-red-600 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ... inputs ... */}
        <input
          className="w-full border p-2 rounded text-gray-900"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full border p-2 rounded text-gray-900"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/* ... button ... */}
        <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>

      <p className="mt-3 text-sm">
        Don't have an account? <Link to="/register" className="text-blue-600">Register</Link>
      </p>
    </div>
  );
}
// import { useState } from "react";
// import { authService } from "../services/api";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const navigate = useNavigate();
//   const { login } = useAuth();

//   async function handleSubmit(e) {
//     e.preventDefault();
//     try {
//       await authService.login({ email, password });
//       navigate("/");
//     } catch (err) {
//       setError(err?.response?.data?.message || "Invalid login credentials");
//     }
//   }

//   return (
//     <div className="max-w-sm mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Login</h2>

//       {error && <p className="text-red-600 mb-3">{error}</p>}

//       <form onSubmit={handleSubmit} className="space-y-4">

//         <input
//           className="w-full border p-2 rounded text-gray-900"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <input
//           className="w-full border p-2 rounded text-gray-900"
//           placeholder="Password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
//           Login
//         </button>
//       </form>

//       <p className="mt-3 text-sm">
//         Don't have an account? <Link to="/register" className="text-blue-600">Register</Link>
//       </p>
//     </div>
//   );
// }
