import { Box, useMediaQuery, useTheme } from "@mui/material";
import ProductFormMobileComponent from "../../components/Product/ProductFormMobileComponent";
import { useLocation, useParams } from "react-router-dom";
import { useProduct } from "../../hooks/useProduct";
import type { ScannedProduct } from "../../types/product";
import CustomizedAppBar from "../../components/CustomisedAppBar";

export default function ProductFormPage() {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const { id } = useParams();
    const { product } = useProduct(id ?? '');
    const location = useLocation()
    const scannedProduct = location.state?.scannedProduct as ScannedProduct | undefined
    const isEdit = ((product) && 'id' in product) ?? false


    return (isMobile
        ? 
            <>
                <CustomizedAppBar
                    title={isEdit && product ? `Modifier le produit ${(scannedProduct ?? product).name}` : 'Ajouter un produit'}
                    withBackIcon={true}
                    sx={{ backgroundColor: '#FFF',  color: 'text.secondary'}}
                />   
                <ProductFormMobileComponent 
                    isEdit={isEdit}
                    product={scannedProduct ?? product} 
                    scan={!!scannedProduct} 
                />
            </>
        :   
            <Box></Box>
    );
}