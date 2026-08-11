import { Box, useMediaQuery, useTheme } from "@mui/material";
import { ProductListMobileComponent } from "../../components/Product/ProductListMobileComponent";
import { ItemSearchInput } from "../../components/ItemSearchInput";
import { NewButton } from "../../components/NewButton";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../types/router";
import { useDebounce } from "use-debounce";

export default function ProductPage() {

    const navigate = useNavigate()
    
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const [ search, setSearch ] = useDebounce<null | string>(null, 500)  
    
    return (isMobile 
        ? 
            <>
                <ItemSearchInput noMarginBottom search={search} setSearch={setSearch} />
                <NewButton ariaLabel="new product" onClick={() => navigate(Paths.ProductNew)} title={'Ajouter'} />
                <ProductListMobileComponent search={search} />
            </>
        : <Box></Box>
    );
}