import type { FC, ReactNode } from 'react'
import type { SxProps } from '@mui/material'
import { Button, useMediaQuery, useTheme } from '@mui/material'

const ACTION_FOOTER_BUTTON_HEIGHT = '56px'
const ACTION_FOOTER_DESKTOP_BUTTON_HEIGHT = '40px'

type Props = {
  label: string
  variant?: 'contained' | 'outlined' | 'text'
  size?: 'small' | 'medium' | 'large'
  height?: string
  width?: string
  startIcon?: ReactNode
  endIcon?: ReactNode
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  disabled?: boolean
  sx?: SxProps
}

export const ActionFooterButton: FC<Props> = ({
  label,
  variant = 'contained',
  size = 'large',
  height,
  width,
  endIcon = null,
  startIcon = null,
  type = 'button',
  onClick,
  disabled,
  sx = {},
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Button
      disabled={disabled}
      endIcon={endIcon}
      onClick={onClick}
      size={size}
      startIcon={startIcon}
      sx={{
        height:
          height ??
          (isMobile
            ? ACTION_FOOTER_BUTTON_HEIGHT
            : ACTION_FOOTER_DESKTOP_BUTTON_HEIGHT),
        width: width ?? (isMobile ? '100%' : 'fit-content'),
        ...sx,
      }}
      type={type}
      variant={variant}
    >
      {label}
    </Button>
  )
}
