import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import type { Product } from "../../types/product";
import { dateFormater } from "../../utils/dateFormater";


interface Props {
    product: Product
    open: boolean
    setOpen: (value: boolean) => void
}

export default function ProductDetailModal({product, open, setOpen}: Props) {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    
    const handleClose = () => setOpen(false);

    return ( 
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            PaperComponent={Paper}
            aria-labelledby="draggable-dialog-title"
            fullWidth
        >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                Résumé de {product.name}
            </DialogTitle>
            <DialogContent dividers={true}>
                <Box sx={{ display: 'flex'}}>
                    <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                        Qté :
                    </Typography> 
                    <Typography variant="body1" sx={{ ml: 1, color: 'text.secondary' }}>
                        {product.quantity}
                    </Typography> 
                </Box>
                <Box sx={{ display: 'flex'}}>
                    <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                        Marque :
                    </Typography> 
                    <Typography variant="body1" sx={{ ml: 1, color: 'text.secondary' }}>
                        {product.brand?.name}
                    </Typography> 
                </Box>
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
                        Créer le :
                    </Typography> 
                    <Typography variant="body1" sx={{ ml: 1, color: 'text.secondary' }}>
                        {dateFormater(product.createdAt)}
                    </Typography> 
                </Box>
                <Box sx={{ display: 'flex'}}>
                    <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                        Créé par :
                    </Typography> 
                    <Typography variant="body1" sx={{ ml: 1, color: 'text.secondary' }}>
                        {product.createdBy?.firstName} {product.createdBy?.lastName}
                    </Typography> 
                </Box>
                <Box sx={{ display: 'flex'}}>
                    <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                        Modifié le :
                    </Typography> 
                    <Typography variant="body1" sx={{ ml: 1, color: 'text.secondary' }}>
                        {dateFormater(product.updatedAt)}
                    </Typography> 
                </Box>
                <Box sx={{ display: 'flex'}}>
                    <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                        Modifié par :
                    </Typography> 
                    <Typography variant="body1" sx={{ ml: 1, color: 'text.secondary' }}>
                        {product.updatedBy?.firstName}
                    </Typography> 
                </Box>
                <Box sx={{ display: 'flex'}}>
                    <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                        Categorie :
                    </Typography> 
                    <Typography variant="body1" sx={{ ml: 1, color: 'text.secondary' }}>
                        {product.category?.name}
                    </Typography> 
                </Box>
            </DialogContent>
            <DialogActions>
                <Button 
                    autoFocus 
                    onClick={handleClose}
                    size="small"
                >
                    Fermer
                </Button>
            </DialogActions>
        </Dialog>
    )
}