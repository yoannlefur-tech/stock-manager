import { Box, useMediaQuery, useTheme } from "@mui/material";
import { BrandListMobileComponent } from "../../components/Brand/BrandListMobileComponent";
import { Paths } from "../../types/router";
import { ItemSearchInput } from "../../components/ItemSearchInput";
import { NewButton } from "../../components/NewButton";
import { useDebounce } from "use-debounce";
import { useNavigate } from "react-router-dom";

export default function BrandPage() {
    const navigate = useNavigate()

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    
    const [ search, setSearch ] = useDebounce<null | string>(null, 500)  
    
    return (isMobile
        ? 
            <>
                <ItemSearchInput noMarginBottom search={search} setSearch={setSearch} />
                <NewButton ariaLabel="new brand" onClick={() => navigate(Paths.BrandNew)} title={'Ajouter'} />
                <BrandListMobileComponent search={search} />
            </>
        : <Box></Box>
    );
}