import { Box, useMediaQuery, useTheme } from "@mui/material";
import ProductDetailMobileComponent from "../../components/Product/ProductDetailMobileComponent";
import { useParams } from "react-router-dom";
import { useProduct } from "../../hooks/useProduct";
import CustomizedAppBar from "../../components/CustomisedAppBar";

export default function ProductDetailsPage() {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    
    const { id: productId } = useParams();
    const { product } = useProduct(productId ?? '');

    return (isMobile && product
        ? 
            <>
                <CustomizedAppBar
                    title={product.name}
                    withBackIcon={true}
                    sx={{ backgroundColor: '#FFF',  color: 'text.secondary'}}
                />
                <ProductDetailMobileComponent product={product} />
            </>
            
        : <Box></Box>
    );
}