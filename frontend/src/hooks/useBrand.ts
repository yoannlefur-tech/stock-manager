import { useState, useEffect } from "react";
import { useFetchWithAuth } from "./useFetchWithAuth";
import type { Brand } from "../types/brand";

export function useBrand(id: string) {
  const [brand, setBrand] = useState<Brand>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { fetchWithAuth } = useFetchWithAuth();

  useEffect(() => {

    if (!id) return

    const url = `/api/brands/${id}`;

    fetchWithAuth(url)
      .then((res) => res.json())
      .then((data) => {
        setBrand(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false); // ← manquant aussi en cas d'erreur
      });
  }, [id]);

  
  return { brand, isLoading, error };
}
