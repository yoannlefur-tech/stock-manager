import { AppBar, Box, IconButton, Toolbar, Typography, type SxProps } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import MenuUserDesktop from "./MenuUserDesktop";

interface Props {
    title?: string
    withBackIcon?: boolean
    withUserDesktop?: boolean
    onClick?: () => void
    sx?: SxProps
}

export default function CustomizedAppBar({ title, withBackIcon = false, withUserDesktop = false, onClick, sx = {} }: Props) {

    const navigate = useNavigate();

    return (           
        <AppBar position="fixed" sx={{ width: `100%`, borderRadius: 0 }}>
            <Toolbar variant="dense" sx={{ padding: 1, ...sx }}>
                { withBackIcon ? (
                    <IconButton sx={{ mr: 3 }} onClick={() => onClick ?? navigate(-1)} aria-label="retour" size="small">
                        <ArrowBackIcon />
                    </IconButton>
                ) : null }
                
                <Box sx={{ display: { md: 'flex' }}}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                        {title}
                    </Typography>
                </Box>

                { withUserDesktop ? (
                    <MenuUserDesktop />
                ) : null }
            </Toolbar>
        </AppBar>
    )
}