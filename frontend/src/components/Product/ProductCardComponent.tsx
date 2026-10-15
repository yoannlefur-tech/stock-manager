import { Box, Card, CardActions, CardContent, Chip, IconButton, Tooltip, Typography, type ChipProps, Snackbar, Alert } from "@mui/material";
import { Fragment } from "react/jsx-runtime";
import type { Product } from "../../types/product";
import { dateFormater } from "../../utils/dateFormater";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { generatePath, useNavigate } from "react-router-dom";
import { Paths } from "../../types/router";
import DeleteConfirmModal from "../DeleteConfirmModal";
import { useDelete } from "../../hooks/useDelete";
import { useState } from "react";
import { CATEGORY_COLORS, DEFAULT_CATEGORY_COLOR } from "../../utils/category";
import CustomizedSnackbars from "../CustomizedSnackbars";
import { flushSync } from "react-dom";

interface DlcMeta {
  color: ChipProps['color']
  label: string
}

function getDlcMeta(dlc: string): DlcMeta {
  const target = new Date(dlc)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const days = Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  const formatted = dateFormater(dlc)

  if (days < 0) return { color: 'error', label: `DLC dépassée (${Math.abs(days)}j)` }
  if (days <= 3) return { color: 'error', label: `DLC : ${formatted} (${days}j)` }
  if (days <= 7) return { color: 'warning', label: `DLC : ${formatted} (${days}j)` }
  return { color: 'success', label: `DLC : ${formatted}` }
}

interface Props {
    product: Product | undefined
}

export default function ProductCardComponent({ product }: Props) {

    const navigate = useNavigate()

    const [ selectedProduct, setSelectedProduct ] = useState<Product>()
    const [ openDelete, setOpenDelete ] = useState(false)
    const { deleteRessource } = useDelete('products')

    const [copiedBarcode, setCopiedBarcode] = useState(false)

    const handleCopyBarcode = async (barcode: string | null | undefined) => {
    if (!barcode) return
    await navigator.clipboard.writeText(barcode)
    setCopiedBarcode(true)
    }

    const catColor = product && product.category
        ? CATEGORY_COLORS[product.category.name] ?? DEFAULT_CATEGORY_COLOR
        : null

    return product ? (
        <Fragment key={product.id}>
            <Card>
                <CardContent sx={{ p: 0 }}>
                    <Box sx={{ display:'flex', justifyContent: "space-between", alignItems: "flex-start", mb:1 }}>
                        <Typography variant="h6" sx={{ lineHeight: 1.2, fontWeight: '700', fontSize: 16  }}>
                            {product.name}
                        </Typography>
                        {product.category && catColor && (
                            <Chip
                                label={product.category.name}
                                size="small"
                                sx={{
                                    bgcolor: catColor.bg,
                                    color: catColor.fg,
                                    border: `1px solid ${catColor.border}`,
                                    fontWeight: 600,
                                    fontSize: 14,
                                }}
                            />
                        )}
                    </Box>

                    {product.dlc && (
                        <Box>
                            <Chip
                                icon={<AccessTimeIcon sx={{ fontSize: 14 }} />}
                                label={getDlcMeta(product.dlc).label}
                                color={getDlcMeta(product.dlc).color}
                                size="small"
                                sx={{ fontWeight: 600, fontSize: 14 }}
                            />
                        </Box>
                    )}

                    {product.brands && (
                        <Box sx={{ display: 'flex', justifyContent: "flex-start", alignItems: "center", my: 1  }}>
                            {product.brands.map((brand) => (
                                <Chip
                                    label={brand.name}
                                    size="small"
                                    variant="outlined"
                                    sx={{ fontWeight: 500, fontSize: 14, mr: 1 }}
                                />
                            ))}
                        </Box>
                    )}

                    {product.barcode && (
                        <Box sx={{ display:'flex', justifyContent: "space-between", alignItems: "center", mb:1 }}>
                            <Typography
                                variant="caption"
                                sx={{ fontFamily: 'monospace', fontSize: 14, color: 'text.secondary', display: 'block', mt: 0.5 }}
                            >
                                {product.barcode}
                            </Typography>
                            <Tooltip title="Copier le code-barres">
                                <IconButton
                                    size="small"
                                    onClick={() => handleCopyBarcode(product.barcode)}
                                    sx={{ p: 0.25, color: 'text.disabled' }}
                                >
                                    <ContentCopyIcon fontSize="medium"  />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    )}

                    
                    {product.stock && (
                    
                        <Box sx={{ display: 'flex'}}>
                            <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                                Stock (Qté) :
                            </Typography> 
                            <Typography variant="body1" sx={{ ml: 1, color: 'text.secondary' }}>
                                {product.stock.quantity}
                            </Typography> 
                        </Box>
                    )}
                
                    <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', fontSize: 14, mt: 0.5 }}>
                        Créée le {dateFormater(product.createdAt)}
                        {product.updatedAt !== product.createdAt && ` · modifiée le ${dateFormater(product.updatedAt)}`}
                    </Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, p: 0 }}>
                    <Tooltip title="Voir le produit">
                    <IconButton
                        size="small"
                        sx={{ color: 'text.secondary' }}
                        onClick={() => navigate(generatePath(Paths.ProductDetails, { id: String(product.id) }))}
                    >
                        <VisibilityOutlinedIcon fontSize="medium" />
                    </IconButton>
                    </Tooltip>
 
                    <Tooltip title="Modifier le produit">
                    <IconButton
                        size="small"
                        sx={{ color: 'primary.main' }}
                        onClick={() => navigate(generatePath(Paths.ProductEdit, { id: String(product.id) }))}
                    >
                        <EditOutlinedIcon fontSize="medium" />
                    </IconButton>
                    </Tooltip>

                    <Tooltip title="Supprimer">
                    <IconButton
                        size="small"
                        sx={{
                        color: 'text.secondary',
                        '&:hover': { color: 'error.main', bgcolor: 'error.lighter' },
                        }}
                        onClick={() => { setSelectedProduct(product); setOpenDelete(true) }}
                    >
                        <DeleteOutlinedIcon fontSize="medium" />
                    </IconButton>
                    </Tooltip>
                </CardActions>
            </Card>     
            {selectedProduct && (
                <DeleteConfirmModal
                    entity={selectedProduct}
                    deleteFn={deleteRessource}
                    open={openDelete}
                    setOpen={setOpenDelete}
                    label="ce produit"
                />
            )}

            <CustomizedSnackbars 
                key={`${product.id}_${product.barcode}`}
                message="Code-barres copié"
                severity="info"
                open={copiedBarcode}
                setOpen={setCopiedBarcode}
            />
        
        </Fragment>
        
    ) : null
}