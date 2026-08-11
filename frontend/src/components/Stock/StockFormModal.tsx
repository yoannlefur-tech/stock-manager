import { Alert, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Paper, TextField } from "@mui/material";
import type { Stock } from "../../types/stock";
import { useEffect, useState } from "react";
import { useFetchWithAuth } from "../../hooks/useFetchWithAuth";


interface Props {
    stock: Stock | undefined
    productId: number | string
    open: boolean
    setOpen: (value: boolean) => void
}

interface FormState {
    quantity: number
    productId: number | string
}

const emptyForm = ( idProduct: number | string, stock?: Stock): FormState => ({
    quantity: stock?.quantity ?? 0,
    productId: idProduct 
})

export default function StockFormModal({stock, productId, open, setOpen}: Props) {

    const { fetchWithAuth } = useFetchWithAuth()

    const [form, setForm] = useState<FormState>(emptyForm(productId, stock))
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
    const [submitError, setSubmitError] = useState<string | null>(null)
    const isEdit = stock && 'id' in stock

    const handleClose = () => setOpen(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const validate = (): Partial<Record<keyof FormState, string>> => ({
        quantity: form.quantity ? '' : 'La quantité est obligatoire',
        productId: form.productId ? '' : "L'id du produit est obligatoire",
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
                isEdit ? `/api/stocks/${stock.id}` : '/api/stocks',
                {
                    method: isEdit ? 'PUT' : 'POST',
                    body: JSON.stringify({
                    quantity: form.quantity,
                    productId: form.productId,
                }),
            })

            if (!res.ok) throw new Error('Erreur lors de la création du produit')

            handleClose()
        } catch (err) {
            setSubmitError(err instanceof Error ? err.message : 'Erreur inconnue')
        } finally {
            setIsSubmitting(false)
        }
    }

    useEffect(() => {
        setForm(emptyForm(productId, stock))
    }, [stock])

    return stock ? ( 
        <Dialog
            open={open}
            onClose={handleClose}
            PaperComponent={Paper}
            aria-labelledby="draggable-dialog-title"
            fullWidth
        >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                Stock du produit {stock.product?.name}
            </DialogTitle>
            <Box component="form" onSubmit={handleSubmit}>

                <DialogContent dividers={true}>

                    {submitError && <Alert severity="error" sx={{ mb: 2 }}>{submitError}</Alert>}
                    
                    <TextField
                        label="Quantité"
                        type="number"
                        name="quantity"
                        value={form.quantity}
                        onChange={handleChange}
                        error={!!errors.quantity}
                        helperText={errors.quantity}
                        size="small"
                        fullWidth
                    />
                    
                </DialogContent>

                <DialogActions>

                    <Button 
                        autoFocus
                        variant="outlined" 
                        onClick={handleClose}
                        size="small"
                    >
                        Annuler
                    </Button>

                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting}
                        startIcon={isSubmitting ? <CircularProgress size={18} color="inherit" /> : null}
                        size="small"
                    >
                        {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
                    </Button>
                </DialogActions>

            </Box>
        </Dialog>
    ) : null
}