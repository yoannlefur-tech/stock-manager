import type { FC, ReactNode } from 'react'
import { Box, useMediaQuery, useTheme } from '@mui/material'

const APP_FOOTER_HEIGHT = '56px' // app footer height

type Props = {
  children: ReactNode
  gap?: number
  padding?: number
  bottom?: string
  position?: 'relative' | 'absolute' | 'fixed'
  noBorder?: boolean
  isInModal?: boolean
}

export const ActionFooter: FC<Props> = ({
  children,
  gap = 2,
  padding = 2,
  bottom,
  position = 'fixed',
  noBorder = false,
  isInModal = false,
}) => {
  const theme = useTheme()

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box
      sx={{
        position,
        bottom: bottom ? bottom : isMobile ? APP_FOOTER_HEIGHT : '4px',
        padding,
        gap,
        right: isMobile ? undefined : '8px',
        left: isMobile ? 0 : undefined,
        width: isMobile
          ? '100%'
          : `calc(100% - ${'74px'})`,
        display: 'flex',
        borderRadius: isMobile || isInModal ? 0 : '8px',
        boxShadow:
          isMobile || isInModal ? undefined : '0 0px 10px rgba(0, 0, 0, 0.15)',
        flexDirection: 'row',
        justifyContent: isMobile || isInModal ? 'center' : 'flex-end',
        alignItems: 'center',
        borderBlock: noBorder ? 'unset' : '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        zIndex: 1000,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }}
    >
      {children}
    </Box>
  )
}
