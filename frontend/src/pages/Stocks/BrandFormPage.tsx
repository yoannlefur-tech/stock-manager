import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";
import { useBrand } from "../../hooks/useBrand";
import BrandFormMobileComponent from "../../components/Brand/BrandFormMobileComponent";
import CustomizedAppBar from "../../components/CustomisedAppBar";

export default function BrandFormPage() {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const { id } = useParams();
    const { brand } = useBrand(id ?? '');
    const isEdit = (brand && 'id' in brand) ?? false

    return (isMobile
        ? 
            <>
                <CustomizedAppBar
                    title={isEdit && brand ? `Modifier la marque ${brand.name}` : 'Ajouter une marque'}
                    withBackIcon={true}
                    sx={{ backgroundColor: '#FFF',  color: 'text.secondary'}}
                />
                <BrandFormMobileComponent isEdit={isEdit} brand={brand} />
            </>
        : <Box></Box>
    );
}