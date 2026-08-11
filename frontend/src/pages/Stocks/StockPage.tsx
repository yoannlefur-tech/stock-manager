import { Box, useMediaQuery, useTheme } from "@mui/material";
import { PageMenuItem } from "../../components/PageMenuItem";
import CategoryIcon from '@mui/icons-material/Category';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Paths } from "../../types/router";

export default function StockPage() {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    return (isMobile 
        ?   
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <PageMenuItem
                    icon={<ShoppingBasketIcon />}
                    label={'Produits'}
                    to={Paths.ProductList}
                />
                <PageMenuItem
                    icon={<CategoryIcon />}
                    label={'Categories'}
                    to={Paths.CategoryList}
                />
                <PageMenuItem
                    icon={<LocalOfferIcon />}
                    label={'Marques'}
                    to={Paths.BrandList}
                />
            </Box>
        : <Box></Box>
    );
}