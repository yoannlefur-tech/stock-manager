import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";
import CategoryFormMobileComponent from "../../components/Category/CategoryFormMobileComponent";
import { useCategory } from "../../hooks/useCategory";
import CustomizedAppBar from "../../components/CustomisedAppBar";

export default function CategoryFormPage() {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const { id } = useParams();
    const { category } = useCategory(id ?? '');
    const isEdit = (category && 'id' in category) ?? false

    return (isMobile
        ? 
            <>
                <CustomizedAppBar
                    title={isEdit && category ? `Modifier la catégorie ${category.name}` : 'Ajouter une catégorie'}
                    withBackIcon={true}
                    sx={{ backgroundColor: '#FFF',  color: 'text.secondary'}}
                />    
                <CategoryFormMobileComponent isEdit={isEdit}  category={category} />
            </> 
        : <Box></Box>
    );
}