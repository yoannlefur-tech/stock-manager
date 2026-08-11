import { Box, useMediaQuery, useTheme } from "@mui/material";
import { CategoryListMobileComponent } from "../../components/Category/CategoryListMobileComponent";
import { useNavigate } from "react-router-dom";
import { ItemSearchInput } from "../../components/ItemSearchInput";
import { useDebounce } from "use-debounce";
import { NewButton } from "../../components/NewButton";
import { Paths } from "../../types/router";

export default function CategoryPage() {
    const navigate = useNavigate()

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    
    const [ search, setSearch ] = useDebounce<null | string>(null, 500)  
    
    return (isMobile 
        ? 
            <>
                <ItemSearchInput noMarginBottom search={search} setSearch={setSearch} />
                <NewButton ariaLabel="new category" onClick={() => navigate(Paths.CategoryNew)} title={'Ajouter'} />
                <CategoryListMobileComponent search={search} />
            </>
        : <Box></Box>
        
    );
}