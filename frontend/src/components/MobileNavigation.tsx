import { Avatar, BottomNavigation, BottomNavigationAction, fabClasses, useTheme } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { formatUserNameInitials } from "../utils/user";

export default function MobileNavigation() {

    const theme = useTheme()
    const navigate = useNavigate()
    const [value, setValue] = useState('recents');
    const { user } = useAuth()

    const NAV_ITEMS_MOBILE = [
        { label: 'Accueil', icon: <HomeIcon />, path: '/home' },
        { 
            label: '', 
            icon: 
                user ? 
                    <Avatar sx={{ width: '32px', height: '32px', margin: 0, fontSize: '13px'}}>
                        {formatUserNameInitials(
                            {
                                firstName: user.firstName,
                                lastName: user.lastName,
                            }
                        )}
                    </Avatar>
                : <AccountCircleIcon />,
            path: '/profil' 
        },
    ]

    const handleChange = (e: React.SyntheticEvent, newValue: string) => {
        e.preventDefault()
        setValue(newValue);
    };

        
    return (
        <BottomNavigation
            showLabels
            value={value}
            onChange={handleChange}
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: theme.zIndex.appBar,
                borderTop: `1px solid ${theme.palette.divider}`,
            }}
        >
            {NAV_ITEMS_MOBILE.map(item => (
                <BottomNavigationAction
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    label={item.label}
                    icon={item.icon}
                />
            ))}
        </BottomNavigation>
    )
}
