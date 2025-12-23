import { Navigate } from "react-router-dom";
import { useProfile } from "../context/ProfileContext";

export default function AdminRoute({ children }) {
  const { user } = useProfile();

  // Not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Logged in but not admin
  if (user.role !== "admin") {
    return <Navigate to="/home" replace />;
  }

  // Admin → allow access
  return children;
}