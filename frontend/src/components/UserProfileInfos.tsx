
import {
  Avatar,
  Box,
  Button,
  Tooltip,
  Typography,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import type { SxProps } from '@mui/material'
import type { User } from '../types/user'
import { formatUserName, formatUserNameInitials } from '../utils/user'
import type { FC } from 'react'

type Props = {
  onClick?: () => void
  connectedUser: User
  sxAvatar?: SxProps
  variant: 'h3' | 'h4'
}

export const UserProfileInfos: FC<Props> = ({
  onClick,
  connectedUser,
  sxAvatar,
  variant,
}) => {
  
  return connectedUser ? (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: 'background.paper',
        alignItems: 'center',
        padding: 2,
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Avatar sx={{ width: '56px', height: '56px', margin: 0, ...sxAvatar }}>
          {formatUserNameInitials(
            {
              firstName: connectedUser.firstName,
              lastName: connectedUser.lastName,
            },
            false
          )}
        </Avatar>
        <Typography
          sx={{
            textOverflow: 'ellipsis',
            whiteSpace: 'wrap',
            overflow: 'hidden',
          }}
          variant={variant}
        >
          {formatUserName(
            {
              firstName: connectedUser.firstName,
              lastName: connectedUser.lastName,
            },
            true
          )}
        </Typography>
      </Box>

      <Tooltip arrow title={'edit'}>
        <Button
          onClick={e => {
            e.stopPropagation()
            onClick && onClick()
          }}
          sx={{
            p: 0,
            minWidth: 40,
            maxWidth: 40,
            height: 40,
            borderRadius: '50%',
          }}
        >
          <EditIcon sx={{ color: 'text.secondary' }} />
        </Button>
      </Tooltip>
    </Box>
  ) : null
}
