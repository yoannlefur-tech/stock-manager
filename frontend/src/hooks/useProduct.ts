import { useState, useEffect } from "react";
import type { Product } from "../types/product";
import { useFetchWithAuth } from "./useFetchWithAuth";

export function useProduct(id: string) {
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { fetchWithAuth } = useFetchWithAuth();

  useEffect(() => {

    if (!id) return

    const url = `/api/products/${id}`;

    fetchWithAuth(url)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false); // ← manquant aussi en cas d'erreur
      });
  }, [id]);

  
  return { product, isLoading, error };
}
