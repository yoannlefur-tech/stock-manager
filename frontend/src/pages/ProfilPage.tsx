import { Box, Divider, useMediaQuery, useTheme } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { UserProfileInfos } from "../components/Profil/UserProfileInfos";
import { useState } from "react";
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { PageMenuItem } from "../components/PageMenuItem";
import UserProfilFormMobile from "../components/Profil/UserProfileFormMobile";

export default function ProfilPage() {
   
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const navigate = useNavigate()
    const [isEdit, setIsEdit] = useState(false)
    const { user, logout } = useAuth()

    if (!isMobile) {
        navigate('/home')
    }

    return (
        user &&
        (!isEdit ? (    
            <Box
                sx={{
                    margin: '24px -24px 16px',
                }}
            >
                <UserProfileInfos
                    connectedUser={user}
                    onClick={() => setIsEdit(true)}
                    sxAvatar={{ width: '100px', height: '100px' }}
                    variant="h3"
                />
                <Divider />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: 72,
                    }}
                >
                    <PageMenuItem
                        icon={<ExitToAppIcon />}
                        label={'Déconnexion'}
                        onClick={logout}
                    />
                </Box>
            </Box>
        ) : (
            <UserProfilFormMobile 
                onClose={() => {
                    setIsEdit(false)
                }}
                user={user} />
        ))
    )
}