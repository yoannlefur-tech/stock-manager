import { useFetchWithAuth } from "./useFetchWithAuth";

export function useDelete(resource: 'products' | 'categories' | 'brands') {
  const { fetchWithAuth } = useFetchWithAuth();

  const deleteRessource = async (id: number | string): Promise<void> => {
    const res = await fetchWithAuth(`/api/${resource}/${id}`, { method: "DELETE" });

    if (!res.ok) throw new Error("Erreur lors de la suppression");
  };

  return { deleteRessource };
}
