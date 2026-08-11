import { useState, useEffect } from "react";
import type { Products } from "../types/product";
import { useFetchWithAuth } from "./useFetchWithAuth";

export function useProducts(search?: string | null, barcode?: string | null) {
  const [products, setProducts] = useState<Products>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { fetchWithAuth } = useFetchWithAuth();

  useEffect(() => {
    const params = new URLSearchParams()
    if (search)  params.append('search', search)
    if (barcode) params.append('barcode', barcode)

    const url = params.size > 0 
      ? `/api/products?${params.toString()}` 
      : '/api/products'

    fetchWithAuth(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false); // ← manquant aussi en cas d'erreur
      });
  }, [search, barcode]);

  return { products, isLoading, error };
}
