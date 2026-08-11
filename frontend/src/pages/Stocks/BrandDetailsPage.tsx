import { Box, useMediaQuery, useTheme } from "@mui/material";

import { useParams } from "react-router-dom"
import { useBrand } from "../../hooks/useBrand";
import BrandDetailMobileComponent from "../../components/Brand/BrandDetailMobileComponent";
import CustomizedAppBar from "../../components/CustomisedAppBar";

export default function BrandDetailsPage() {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    
    const { id } = useParams();
    const { brand } = useBrand(id ?? '');

    return (isMobile && brand
        ?
            <>
                <CustomizedAppBar
                    title={brand.name}
                    withBackIcon={true}
                    sx={{ backgroundColor: '#FFF',  color: 'text.secondary'}}
                />
                <BrandDetailMobileComponent brand={brand} />
            </>
        : <Box></Box>
    );
}