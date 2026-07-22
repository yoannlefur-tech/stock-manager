import { Outlet } from 'react-router-dom'
import {
  AppBar, Box, CssBaseline, 
  Toolbar, Typography, useMediaQuery, useTheme,
} from '@mui/material'
import MobileNavigation from './MobileNavigation'
import MenuUserDesktop from './MenuUserDesktop'


export default function Layout() {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* sidebar fixe */}
            <AppBar position="fixed" sx={{ width: `100%`, borderRadius: 0 }}>
                <Toolbar variant="dense" sx={{ display: 'flex', justifyContent: 'space-between', padding: 1 }}>
                    <Box sx={{ display: { md: 'flex' }}}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Gestion des stocks
                        </Typography>
                    </Box>
                    <MenuUserDesktop />
                </Toolbar>
            </AppBar>

            {/* Mobile nav bar fixe */}
            {isMobile && (
                <MobileNavigation />
            )}

            <Box component="main" sx={{ flexGrow: 1, p: 3, pb: isMobile ? '56px' : 3 }}>
                <Outlet />
            </Box>
        </Box>
    )
}