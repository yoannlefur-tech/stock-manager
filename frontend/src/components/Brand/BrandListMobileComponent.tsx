import { Alert, Box, CircularProgress } from '@mui/material'
import { useBrands } from '../../hooks/useBrands';
import BrandCardComponent from './BrandCardComponent';

type Props = {
  search?: string | null
}

export const BrandListMobileComponent = ({ search } : Props) => { 
  
  const { brands, isLoading, error } = useBrands(search)

  return brands 
    ? (
      
      <Box sx={{ mt: 11, mx: 1, mb: 7 }}>

        {isLoading && <CircularProgress sx={{ mb: 2 }} />}

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {brands?.data.map((row) => (
          <BrandCardComponent key={row.id} brand={row}></BrandCardComponent>
        ))}

      </Box>
    ) : null
}
