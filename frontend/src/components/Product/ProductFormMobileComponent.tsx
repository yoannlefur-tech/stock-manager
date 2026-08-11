import { Alert, Box, Button, CircularProgress, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useFetchWithAuth } from "../../hooks/useFetchWithAuth";
import type { Product, ScannedProduct } from "../../types/product";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../../hooks/useCategories";
import { useBrands } from "../../hooks/useBrands";
import { ActionFooter } from "../ActionFooter";
import { Paths } from "../../types/router";
import { formatDateForInput } from "../../utils/dateFormater";

interface Props {
    product?: Product | ScannedProduct
    scan: boolean
    isEdit: boolean
}

interface FormState {
    name: string
    barcode: string
    brandId: number | null
    brandName: string
    stockId: number | null
    stockQuantity: number
    dlc: string
    categoryId: number | null
    categoryName: string
}

const emptyForm = (product?: Product | ScannedProduct): FormState => ({
    name:           product?.name ?? '',
    barcode:        product?.barcode ?? '',
    brandId:        'brand' in (product ?? {}) ? (product as Product).brand?.id ?? null : null,
    brandName:      'brand' in (product ?? {}) ? (product as Product).brand?.name ?? '' : (product as ScannedProduct)?.brands ?? '',
    stockId:        'stock' in (product ?? {}) ? (product as Product).stock?.id ?? null : null,
    stockQuantity:  'stock' in (product ?? {}) ? (product as Product).stock?.quantity ?? 0 : 0,
    dlc:            'dlc' in (product ?? {}) ? formatDateForInput((product as Product).dlc) ?? '' : '',
    categoryId:     'category' in (product ?? {}) ? (product as Product).category?.id ?? null : null,
    categoryName:   'category' in (product ?? {}) ? (product as Product).category?.name ?? '' : '',
})

export default function ProductFormMobileComponent({ product, scan, isEdit }: Props) {
    
    const navigate = useNavigate()

    console.log
   
    const { brands, isLoading: isLoadingBrand } = useBrands()
    const { categories, isLoading: isLoadingCategory  } = useCategories()
    const { fetchWithAuth } = useFetchWithAuth()

    const [form, setForm] = useState<FormState>(emptyForm(product))
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
    const [submitError, setSubmitError] = useState<string | null>(null)
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, stockQuantity: Number(e.target.value) })
    }

    const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = brands?.data.find(c => c.name === e.target.value)
        setForm({
            ...form,
            brandName: e.target.value,
            brandId: selected?.id ?? null,
        })
    }

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = categories?.data.find(c => c.name === e.target.value)
        setForm({
            ...form,
            categoryName: e.target.value,
            categoryId: selected?.id ?? null,
        })
    }

    const validate = (): Partial<Record<keyof FormState, string>> => ({
        name: form.name ? undefined : 'Le nom est obligatoire',
        barcode: form.barcode ? undefined : 'Le barcode est obligatoire',
        stockQuantity: form.stockQuantity < 0 ? 'La quantité doit être positive' : undefined
    })

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()

        const newErrors = validate()
        setErrors(newErrors)
        if (Object.values(newErrors).some(Boolean)) return

        setIsSubmitting(true)
        setSubmitError(null)

        try {

            const res = await fetchWithAuth(
                isEdit && product ? `/api/products/${(product as Product).id}` : '/api/products',
                {
                    method: isEdit ? 'PUT' : 'POST',
                    body: JSON.stringify({
                        name: form.name,
                        barcode: form.barcode,
                        brandId: form.brandId,
                        brandName: form.brandName,
                        stockId: form.stockId,
                        stockQuantity: form.stockQuantity,
                        dlc: form.dlc,
                        categoryId: form.categoryId,
                        categoryName: form.categoryName
                }),
            })

            if (!res.ok) throw new Error('Erreur lors de la création du produit')

            navigate(Paths.ProductList)
        } catch (err) {
            setSubmitError(err instanceof Error ? err.message : 'Erreur inconnue')
        } finally {
            setIsSubmitting(false)
        }
    }

    useEffect(() => {
        setForm(emptyForm(product))
    }, [product])

    return (
        <Box sx={{ backgroundColor: 'background.paper' }}>
            <Box component="form" onSubmit={handleSubmit}
                sx={{ height: 'calc(100vh - 106px)', mt: '50px'  }} 
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: 2,
                    }}
                >

                    {submitError && <Alert severity="error" sx={{ mb: 2 }}>{submitError}</Alert>}

                    <TextField
                        label="Nom"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        size="small"
                        fullWidth
                    />

                    <TextField
                        label="Code barre"
                        name="barcode"
                        value={form.barcode}
                        onChange={handleChange}
                        error={!!errors.barcode}
                        helperText={errors.barcode}
                        size="small"
                        fullWidth
                    />

                    {scan ? (
                        <TextField
                            label="Marque" 
                            name="brandName" 
                            value={form.brandName}
                            onChange={handleChange}
                            error={!!errors.brandName}
                            helperText={errors.brandName}
                            size="small"
                            fullWidth
                        />
                    ) : (
                        isLoadingBrand ? (
                            <TextField
                                select 
                                label="Marque" 
                                size="small"
                                fullWidth
                                disabled
                                value=""
                                slotProps={{
                                    input: {
                                        endAdornment: <CircularProgress size={16} sx={{ mr: 2 }} />,
                                    },
                                }}
                            >
                                <MenuItem value="" />
                            </TextField>
                            
                        ) : brands?.data.length ? (
                            <TextField
                                select 
                                label="Marque" 
                                name="brandName" 
                                value={form.brandName}
                                onChange={handleBrandChange} 
                                error={!!errors.brandName}
                                helperText={errors.brandName}
                                size="small"
                                fullWidth
                            >
                                {brands.data.map(brand => (
                                    <MenuItem key={brand.id} value={brand.name}>{brand.name}</MenuItem>
                                ))}
                            </TextField>
                        ) : null
                    )}

                    <TextField
                        label="Quantité"
                        type="number"
                        name="stockQuantity"
                        value={form.stockQuantity}
                        onChange={handleQuantityChange}
                        error={!!errors.stockQuantity}
                        helperText={errors.stockQuantity}
                        size="small"
                        fullWidth
                    />

                    <TextField
                        label="DLC"
                        type="date"
                        name="dlc"
                        value={form.dlc}
                        onChange={handleChange}
                        size="small"
                        fullWidth
                        slotProps={{
                            inputLabel: { shrink: true },
                        }}
                    />

                    {isLoadingCategory ? (
                        <TextField
                            select 
                            label="Catégorie" 
                            size="small"
                            fullWidth
                            disabled
                            value=""
                            slotProps={{
                                input: {
                                    endAdornment: <CircularProgress size={16} sx={{ mr: 2 }} />,
                                },
                            }}
                        >
                            <MenuItem value="" />
                        </TextField>

                    ) : categories?.data.length ? (
                        <TextField
                            select 
                            label="Catégorie" 
                            name="categoryName" 
                            value={form.categoryName}
                            onChange={handleCategoryChange} 
                            error={!!errors.categoryName}
                            helperText={errors.categoryName}
                            size="small"
                            fullWidth
                        >
                            {categories.data.map(cat => (
                                <MenuItem key={cat.id} value={cat.name}>{cat.name}</MenuItem>
                            ))}
                        </TextField>
                    ) : null}

                </Box>

                <ActionFooter>
                    
                    <Button 
                        autoFocus
                        variant="outlined"
                        size="small" 
                        onClick={() => navigate(-1)}
                    >
                        Annuler
                    </Button>

                    <Button
                        type="submit"
                        variant="contained"
                        size="small"
                        disabled={isSubmitting}
                        startIcon={isSubmitting ? <CircularProgress size={18} color="inherit" /> : null}
                    >
                        {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
                    </Button>

                </ActionFooter>
            </Box>
        </Box>
    )
}