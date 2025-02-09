import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config/config";

export default function ResetPasswordConfirm() {
  const { uidb64, token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setMessage("");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`${BASE_URL}/api/auth/password/reset/confirm/${uidb64}/${token}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: uidb64,
          token: token,
          new_password1: newPassword,
          new_password2: confirmPassword,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Password reset successful. Redirecting to login...");
        setTimeout(() => navigate("/auth/login"), 3000);
      } else {
        setError(
          result?.new_password1?.[0] ||
          result?.token?.[0] ||
          result?.detail ||
          "An error occurred. Please try again."
        );
      }
    } catch (error) {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <form 
        onSubmit={onSubmit}
        style={{ textAlign: "center", padding: "20px", border: "1px solid #ccc", borderRadius: "8px", width: "300px" }}
      >
        <h3>Set New Password</h3>
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
          required
          style={{ padding: "10px", marginBottom: "10px", width: "100%" }}
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
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
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
