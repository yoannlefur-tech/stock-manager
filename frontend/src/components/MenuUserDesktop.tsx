import { Avatar, Box, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { formatUserName, formatUserNameInitials } from "../utils/user";
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import UserProfilForm from "./Profil/UserProfileForm";
import { Paths } from "../types/router";

export default function MenuUserDesktop() {

    const navigate = useNavigate()
    const [ openSettingsModal, setOpenSettingsModal ] = useState(false);
    const { user, logout } = useAuth()

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenSettingsModal = () => setOpenSettingsModal(true);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return user && (
        <Box sx={{ display: { xs: 'none', md: 'flex' }}}>
            <Box onClick={handleOpenUserMenu} sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer'}}>
                <IconButton sx={{ p: 0 }}>
                    {user ? 
                        <Avatar sx={{ width: '56px', height: '56px', margin: 0 }}>
                            {formatUserNameInitials(
                                {
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                },
                                false
                            )}
                        </Avatar>
                    : <AccountCircleIcon />}
                </IconButton>
                {user &&
                    <Typography
                        sx={{
                            textOverflow: 'ellipsis',
                            whiteSpace: 'wrap',
                            overflow: 'hidden',
                        }}
                        variant={'h3'}
                    >
                        {formatUserName(
                            {
                                firstName: user.firstName,
                                lastName: user.lastName,
                            },
                            true
                        )}
                    </Typography>
                }
            </Box>
          
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={handleOpenSettingsModal}>
                    <ListItemIcon><SettingsIcon /></ListItemIcon>
                    <ListItemText>Mon Profil</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => { 
                    logout(); 
                    navigate(Paths.Login) 
                }}>
                    <ListItemIcon><LogoutIcon /></ListItemIcon>
                    <ListItemText>Déconnexion</ListItemText>
                </MenuItem>
            </Menu>
            <UserProfilForm user={user} open={openSettingsModal} setOpen={setOpenSettingsModal} />
        </Box>
    )
}