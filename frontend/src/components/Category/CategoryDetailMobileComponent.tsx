import { Box, Typography } from "@mui/material";
import { dateFormater } from "../../utils/dateFormater";
import type { Category } from "../../types/category";

interface Props {
    category: Category | undefined
}

export default function CategoryDetailMobileComponent({ category }: Props) {

    return category ? ( 
        <Box sx={{ backgroundColor: 'background.paper' }}>
        
            <Box  sx={{ height: 'calc(100vh - 106px)', mt: '50px' }}>  
                <Box sx={{ padding: 2, gap: 3 }} >

                    <Box sx={{ display: 'flex'}}>
                        <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                            Créé le :
                        </Typography> 
                        <Typography variant="body1" sx={{ ml: 1, color: 'text.secondary' }}>
                            {dateFormater(category.createdAt)}
                        </Typography> 
                    </Box>

                    <Box sx={{ display: 'flex'}}>
                        <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                            Modifié le :
                        </Typography> 
                        <Typography variant="body1" sx={{ ml: 1, color: 'text.secondary' }}>
                            {dateFormater(category.updatedAt)}
                        </Typography> 
                    </Box>
                    
                </Box>
            </Box>

        </Box>
    ) : null
}