import type { FC, PropsWithChildren } from 'react'

import { Box, Button, SpeedDial, useMediaQuery, useTheme } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import AddCircleIcon from '@mui/icons-material/AddCircle';

type Props = {
  onClick: () => void
  title?: string
  ariaLabel: string
}

export const NewButton: FC<PropsWithChildren<Props>> = ({
  onClick,
  title,
  ariaLabel,
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        gap: 1,
        justifyContent: 'flex-end',
      }}
    >
      {isMobile ? (
        <SpeedDial
          ariaLabel={ariaLabel}
          icon={<AddIcon />}
          onClick={onClick}
          sx={{ position: 'fixed', bottom: 72, right: 16 }}
        />
      ) : (
        <Button
          color="primary"
          onClick={onClick}
          size="small"
          startIcon={<AddCircleIcon />}
          variant="contained"
        >
          {title}
        </Button>
      )}
    </Box>
  )
}
