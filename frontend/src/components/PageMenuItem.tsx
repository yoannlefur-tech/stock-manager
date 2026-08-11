import type { FC, ReactNode } from 'react'
import { Link as RouterLink } from 'react-router'

import { Button, Divider, Typography } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

type Props = {
  icon: ReactNode
  label: string
  to?: string
  onClick?: () => void
  isWrappedInCategory?: boolean
}

export const PageMenuItem: FC<Props> = ({
  icon,
  label,
  to = '',
  onClick,
  isWrappedInCategory = false,
}) => (
  <>
    <Button
      component={RouterLink}
      onClick={onClick}
      startIcon={icon}
      sx={{
        justifyContent: 'flex-start',
        color: 'text.primary',
        borderRadius: 0,
        bgcolor: 'background.paper',
        p: '32px !important',
        '& .MuiButton-startIcon': {
          color: 'text.secondary',
        },
        width: '100%',
        m: 0
      }}
      size="small"
      to={to}
    >
      <Typography
        component="div"
        sx={{
          fontWeight: 500,
          ...(isWrappedInCategory ? { paddingLeft: 4 } : {}),
        }}
      >
        {label}
      </Typography>
      <ChevronRightIcon sx={{ ml: 'auto', mr: -1, color: 'text.secondary' }} />
    </Button>
    <Divider />
  </>
)
