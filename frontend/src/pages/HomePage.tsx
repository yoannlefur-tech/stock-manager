import { useNavigate } from "react-router-dom";
import { Paths } from "../types/router";
import SettingsOverscanIcon from '@mui/icons-material/SettingsOverscan';
import { Box, SpeedDial } from "@mui/material";

export default function HomePage() {
    const navigate = useNavigate()

    return (
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          gap: 1,
          justifyContent: 'flex-end',
        }}
      >
        <SpeedDial
            ariaLabel={'new scan'}
            icon={<SettingsOverscanIcon />}
            onClick={() => navigate(Paths.Scan)}
            sx={{ position: 'fixed', bottom: 72, right: 16 }}
        />
      </Box>  
    )
}