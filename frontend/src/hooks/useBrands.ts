import { useState, useEffect } from "react";
import { useFetchWithAuth } from "./useFetchWithAuth";
import type { Brands } from "../types/brand";

export function useBrands(search?: string | null) {
  const [brands, setBrands] = useState<Brands>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { fetchWithAuth } = useFetchWithAuth();

  useEffect(() => {
    const url = search 
      ? `/api/brands?search=${encodeURIComponent(search)}`
      : '/api/brands'

    fetchWithAuth(url)
      .then((res) => res.json())
      .then((data) => {
        setBrands(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false); // ← manquant aussi en cas d'erreur
      });
  }, [search]);

  return { brands, isLoading, error };
}
