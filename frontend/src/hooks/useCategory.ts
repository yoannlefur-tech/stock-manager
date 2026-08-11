import { useState, useEffect } from "react";
import { useFetchWithAuth } from "./useFetchWithAuth";
import type { Category } from "../types/category";

export function useCategory(id: string) {
  const [category, setCategory] = useState<Category>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { fetchWithAuth } = useFetchWithAuth();

  useEffect(() => {

    if (!id) return

    const url = `/api/categories/${id}`;

    fetchWithAuth(url)
      .then((res) => res.json())
      .then((data) => {
        setCategory(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false); // ← manquant aussi en cas d'erreur
      });
  }, [id]);

  
  return { category, isLoading, error };
}
