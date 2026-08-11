import { Box, Chip, Divider, IconButton, Typography } from "@mui/material";
import { dateFormater } from "../../utils/dateFormater";
import type { Product } from "../../types/product";
import StockFormModal from "../Stock/StockFormModal";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { CATEGORY_COLORS, DEFAULT_CATEGORY_COLOR } from "../../utils/category";

interface Props {
    product: Product | undefined
}

export default function ProductDetailMobileComponent({ product }: Props) {

    const [ openStockModal, setOpenStockModal] = useState(false)
     
    const catColor = product && product.category
        ? CATEGORY_COLORS[product.category.name] ?? DEFAULT_CATEGORY_COLOR
        : null
    

    return product ? ( 
        <Box sx={{ backgroundColor: 'background.paper' }}>

            <Box  sx={{ height: 'calc(100vh - 106px)', mt: '50px' }}>     
                <Box sx={{ padding: 2, gap: 3 }} >
                    {product.barcode &&
                        <Box sx={{ display: 'flex'}}>
                            <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                                Code-barre :
                            </Typography> 
                            <Typography variant="body1" sx={{ ml: 1, color: 'text.secondary' }}>
                                {product.barcode}
                            </Typography> 
                        </Box>
                    }
                    {product.dlc &&
                        <Box sx={{ display: 'flex'}}>
                            <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                                DLC :
                            </Typography> 
                            <Typography variant="body1" sx={{ ml: 1, color: 'text.secondary' }}>
                                {dateFormater(product.dlc)}
                            </Typography> 
                        </Box>
                    }
                    <Box sx={{ display: 'flex'}}>
                        <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                            Créé le :
                        </Typography> 
                        <Typography variant="body1" sx={{ ml: 1, color: 'text.secondary' }}>
                            {dateFormater(product.createdAt)}
                        </Typography> 
                    </Box>
                    {product.createdBy && 
                        <Box sx={{ display: 'flex'}}>
                            <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                                Créé par :
                            </Typography> 
                            <Typography variant="body1" sx={{ ml: 1, color: 'text.secondary' }}>
                                {product.createdBy?.firstName} {product.createdBy?.lastName}
                            </Typography> 
                        </Box>
                    }
                    <Box sx={{ display: 'flex'}}>
                        <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                            Modifié le :
                        </Typography> 
                        <Typography variant="body1" sx={{ ml: 1, color: 'text.secondary' }}>
                            {dateFormater(product.updatedAt)}
                        </Typography> 
                    </Box>
                    {product.updatedBy && 
                        <Box sx={{ display: 'flex'}}>
                            <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                                Modifié par :
                            </Typography> 
                            <Typography variant="body1" sx={{ ml: 1, color: 'text.secondary' }}>
                                {product.updatedBy?.firstName} {product.updatedBy?.lastName}
                            </Typography> 
                        </Box>
                    }
                </Box>
                    
                <Divider />
                {product.category && 
                    <Box>

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: 2,
                                gap: 2
                            }}
                        >
                            <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                                Categorie :
                            </Typography> 
                            {catColor && (
                                <Chip
                                    label={product.category.name}
                                    size="small"
                                    sx={{
                                        bgcolor: catColor.bg,
                                        color: catColor.fg,
                                        border: `1px solid ${catColor.border}`,
                                        fontWeight: 600,
                                        fontSize: '0.7rem',
                                    }}
                                />
                            )}
                        </Box>
                    </Box>
                }

                <Divider /> 
                {product.brand && (
                    <Box >
                        <Box 
                            sx={{ 
                                display: 'flex', 
                                alignItems: 'center',
                                padding: 2, 
                                gap: 2
                            }}
                        >
                            <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                                Marque :
                            </Typography> 
                            <Chip
                                label={product.brand.name}
                                size="small"
                                variant="outlined"
                                sx={{ fontWeight: 500 }}
                            />
                        </Box>
                    </Box>
                )}

                <Divider />
                <Box> 
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
                        <Box sx={{ display: 'flex' }}>
                            <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                                Stock (Qté) :
                            </Typography> 
                            <Typography variant="body1" sx={{ ml: 1, color: 'text.secondary' }}>
                                {product.stock?.quantity}
                            </Typography>
                        </Box>
                        <Box sx={{ p: 0, m: 0 }}>
                            <IconButton 
                                color="primary" 
                                aria-label="edit stock quantity"
                                onClick={() => { setOpenStockModal(true) }}
                                sx={{ p:0 }}
                            >
                                <EditIcon />
                            </IconButton>
                        </Box>
                    </Box>

                    {openStockModal ? (
                        <StockFormModal stock={product.stock} productId={product.id} open={openStockModal} setOpen={setOpenStockModal}/>
                    ) :null}
                </Box>
                <Divider />
            </Box>
        </Box>
    ) : null
}