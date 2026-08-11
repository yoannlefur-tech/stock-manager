import { Alert, Box, CircularProgress } from '@mui/material'
import { useCategories } from '../../hooks/useCategories';
import CategoryCardComponent from './CategoryCardComponent';

type Props = {
  search?: string | null
}

export const CategoryListMobileComponent = ({ search } : Props) => {
  
  const { categories, isLoading, error } = useCategories(search)

  return categories 
    ? (
      
      <Box sx={{ mt: 11, mx: 1, mb: 7 }}>
        
        {isLoading && <CircularProgress sx={{ mb: 2 }} />}

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {categories?.data.map((row) => (
          <CategoryCardComponent key={row.id} category={row}></CategoryCardComponent>
        ))}

      </Box>
    ) : null
}
