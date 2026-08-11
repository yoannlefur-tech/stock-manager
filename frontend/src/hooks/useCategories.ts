import { useState, useEffect } from "react";
import { useFetchWithAuth } from "./useFetchWithAuth";
import type { Categories } from "../types/category";

export function useCategories(search?: string | null) {
  const [categories, setCategories] = useState<Categories>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { fetchWithAuth } = useFetchWithAuth();

  useEffect(() => {
    const url = search 
      ? `/api/categories?search=${encodeURIComponent(search)}`
      : '/api/categories'

    fetchWithAuth(url)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false); // ← manquant aussi en cas d'erreur
      });
  }, [search]);

  return { categories, isLoading, error };
}
