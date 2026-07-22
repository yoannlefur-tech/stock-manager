import { capitalize } from '@mui/material'

export const capitalizeString = (str?: string | null) =>
  str ? capitalize(str) : ''
