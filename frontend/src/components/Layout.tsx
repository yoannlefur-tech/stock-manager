import { matchPath, Outlet, useLocation } from 'react-router-dom'
import { Box, CssBaseline, useMediaQuery, useTheme } from '@mui/material'
import MobileNavigation from './MobileNavigation'
import { Paths } from '../types/router'
import CustomizedAppBar from './CustomisedAppBar'


export default function Layout() {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const location = useLocation()

    const hideAppBar = matchPath(Paths.ProductDetails, location.pathname) 
                    || matchPath(Paths.ProductEdit, location.pathname)
                    || matchPath(Paths.ProductNew, location.pathname)
                    || matchPath(Paths.CategoryDetails, location.pathname)
                    || matchPath(Paths.CategoryEdit, location.pathname)
                    || matchPath(Paths.CategoryNew, location.pathname)
                    || matchPath(Paths.BrandDetails, location.pathname)
                    || matchPath(Paths.BrandEdit, location.pathname)
                    || matchPath(Paths.BrandNew, location.pathname)

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* sidebar fixe */}
            {!hideAppBar && (
                <CustomizedAppBar
                    title={'Gestion des stocks'}
                    withUserDesktop={true}
                    sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between' 
                    }}
                />
            )}

            {/* Mobile nav bar fixe */}
            {isMobile && <MobileNavigation /> }

            <Box component="main" 
                sx={{
                    flexGrow: 1, 
                    pb: isMobile ? '56px' : 3,
                    mt: hideAppBar ? 0 : '50px',
                }}
            >
                <Outlet />
            </Box>
        </Box>
    )
}