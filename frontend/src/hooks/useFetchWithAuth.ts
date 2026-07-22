import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";

export function useFetchWithAuth() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });

    if (res.status === 401) {
      logout();
      navigate("/login");
      throw new Error("Session expirée");
    }

    return res;
  };

  return { fetchWithAuth };
}
