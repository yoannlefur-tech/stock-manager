import { Box, useMediaQuery, useTheme } from "@mui/material";

import { useParams } from "react-router-dom";
import { useCategory } from "../../hooks/useCategory";
import CategoryDetailMobileComponent from "../../components/Category/CategoryDetailMobileComponent";
import CustomizedAppBar from "../../components/CustomisedAppBar";

export default function CategoryDetailsPage() {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    
    const { id } = useParams();
    const { category } = useCategory(id ?? '');

    return (isMobile && category
        ? 
            <>
                <CustomizedAppBar
                    title={category.name}
                    withBackIcon={true}
                    sx={{ backgroundColor: '#FFF',  color: 'text.secondary'}}
                />
                <CategoryDetailMobileComponent category={category} />
            </>
        : <Box></Box>
    );
}