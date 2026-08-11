import { Alert, Box, CircularProgress } from '@mui/material'
import { useProducts } from '../../hooks/useProducts'
import ProductCardComponent from './ProductCardComponent'

type Props = {
  search?: string | null
}

export const ProductListMobileComponent = ({ search } : Props) => {

  const { products, isLoading, error } = useProducts(search)

  return products 
    ? (
      
      <Box sx={{ mt: 11, mx: 1, mb: 7 }}>
        
        {isLoading && <CircularProgress sx={{ mb: 2 }} />}

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {products.data.map((row) => (
          <ProductCardComponent key={row.id} product={row}></ProductCardComponent>
        ))}

      </Box>
    
    ) : null
}
