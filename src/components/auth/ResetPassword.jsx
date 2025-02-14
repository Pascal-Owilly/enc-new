import { useState, useContext } from "react";
import AuthContext from "./AuthContext"; 
import { BASE_URL } from "../config/config";

export default function ResetPassword() {
  const { resetPassword } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const onSubmit = async () => {
    setLoading(true); // Start loading
    setMessage("");
    setError("");

    try {
      const response = await fetch(`${BASE_URL}/api/auth/password-reset/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Check your email to reset your password.");
      } else {
        setError(result.message || "An error occurred");
      }
    } catch (error) {
      setError("Network error");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div style={{ height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <form 
        onSubmit={(e) => { e.preventDefault(); onSubmit(); }}
        style={{ textAlign: "center", padding: "20px", border: "1px solid #ccc", borderRadius: "8px", width: "300px" }}
      >
        <h3>Reset Password</h3>
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          style={{ padding: "10px", marginBottom: "10px", width: "100%" }}
        />
        <button 
          type="submit" 
          style={{ 
            padding: "10px 20px", 
            cursor: "pointer", 
            backgroundColor: loading ? "#ccc" : "#007bff", 
            color: "white", 
            border: "none",
            borderRadius: "5px"
          }} 
          disabled={loading} // Disable button when loading
        >
          {loading ? "Sending..." : "Send Reset Email"}
        </button>
      </form>
    </div>
  );
}
