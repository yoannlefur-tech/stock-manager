import BarcodeScanner from "../components/Scan/BarcodeScanner";
import { generatePath, useNavigate } from "react-router-dom";
import { Paths } from "../types/router";
import type { ScannedProduct } from "../types/product";
import { useFetchWithAuth } from "../hooks/useFetchWithAuth";
import CustomizedAppBar from "../components/CustomisedAppBar";

export default function ScanPage() {
    const navigate = useNavigate()

    const { fetchWithAuth } = useFetchWithAuth();

    const parseBrands = (brands: string): string[] => {
        return brands
            .split(',')
            .map(b => b.trim())
            .filter(Boolean)
    }

    const handleScan = async (barcode: string) => {
        const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`)
        const data = await res.json()
        
        if (data.status === 0) {
            // Produit non trouvé
            return
        }
        
        const product = data.product
        const scannedProduct: ScannedProduct = {
            barcode,
            name:  product.product_name ?? 'Nom inconnu',
            brands: parseBrands(product.brands ?? ''),
            image: product.image_url ?? '',
        }

        // Vérifie si le produit existe
        const products = await fetchWithAuth(`/api/products?barcode=${barcode}`)
        const dataProducts = await products.json()
        
        if (dataProducts.data.length > 0) {
            // Produit déjà en stock — naviguer vers le détail ou incrémenter la quantité
            navigate(generatePath(Paths.ProductDetails, { id: String(dataProducts.data[0].id) }))
            return
        }

        navigate(
            Paths.ProductNew,
            { 
                state: { scannedProduct: scannedProduct },
            }
        )
    }

    return (
        <>
            <CustomizedAppBar
                title={'Scanner un nouveau produit'}
                sx={{ backgroundColor: '#FFF',  color: 'text.secondary', justifyContent: 'center'}}
            />    
            <BarcodeScanner onScan={handleScan} />
        </>
    )
}
