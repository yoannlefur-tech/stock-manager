import { Box, Typography } from "@mui/material";
import { dateFormater } from "../../utils/dateFormater";
import type { Brand } from "../../types/brand";


interface Props {
    brand: Brand | undefined
}

export default function BrandDetailMobileComponent({ brand }: Props) {

    return brand ? ( 
        <Box sx={{ backgroundColor: 'background.paper' }}>
            <Box  sx={{ height: 'calc(100vh - 106px)', mt: '50px' }}> 
                <Box sx={{ padding: 2, gap: 3 }} >

                    <Box sx={{ display: 'flex'}}>
                        <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                            Créer le :
                        </Typography> 
                        <Typography variant="body1" sx={{ ml: 1, color: 'text.secondary' }}>
                            {dateFormater(brand.createdAt)}
                        </Typography> 
                    </Box>

                    <Box sx={{ display: 'flex'}}>
                        <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                            Modifié le :
                        </Typography> 
                        <Typography variant="body1" sx={{ ml: 1, color: 'text.secondary' }}>
                            {dateFormater(brand.updatedAt)}
                        </Typography> 
                    </Box>
                    
                </Box>
            </Box>

        </Box>
    ) : null
}