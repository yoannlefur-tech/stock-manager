import {
  forwardRef,
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
  type SyntheticEvent,
} from 'react'

import { Box, IconButton, InputAdornment, TextField } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'

type Props = {
  search?: string | null
  setSearch: (search: string | null) => void
  setBatchNumber?: (batchNumber: string | null) => void
  noMarginBottom?: boolean
  placeholder?: string | null
}

interface SyntheticChangeEvent<T> extends SyntheticEvent<T, InputEvent> {
  target: EventTarget & T
}
const MIN_EAN_SIZE = 5

// eslint-disable-next-line react/display-name
export const ItemSearchInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      search = null,
      setSearch,
      setBatchNumber,
      noMarginBottom,
      placeholder,
    }: Props,
    ref
  ) => {

    const [value, setValue] = useState<null | string>(search)

    const onChange = useCallback(
      (e: SyntheticChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (
          e.nativeEvent.inputType === 'insertText' &&
          e.nativeEvent.data &&
          e.nativeEvent.data.length > MIN_EAN_SIZE
        ) {
          if (e.nativeEvent.data !== value) {
            setValue(e.nativeEvent.data)
          }
        } else {
          setValue(e.target.value)
        }
      },
      [value]
    )
    const onBlur = useCallback(
      (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target.value !== value) {
          setValue(e.target.value)
        }
      },
      [value]
    )

    useEffect(() => {
      setValue(search ?? '')
    }, [search])

    useEffect(() => {
      if (!value || value.length < 3) return

      setSearch(value)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, setSearch, setBatchNumber])

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 76,
          left: 0,
          right: 0,
          backgroundColor: 'background.paper',
          padding: 2,
          zIndex: 500,
          marginTop: -3.5,
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
        }}
      >
        <TextField
          autoFocus
          inputRef={ref} // La ref externe contrôle l’input ici !
          name="search"
          onBlur={onBlur}
          onChange={onChange}
          placeholder={placeholder ?? 'Quel produits ?'}
          slotProps={{
            input: {
              endAdornment: value ? (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      setValue('')
                      setSearch(null)
                      setBatchNumber?.(null)
                    }}
                    size="small"
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null,
            },
          }}
          sx={{
            width: '100%',
            flexGrow: 2,
            marginBottom: noMarginBottom ? 0 : 2,
          }}
          value={value ?? ''}
          size="small"
        />
      </Box>
    )
  }
)
