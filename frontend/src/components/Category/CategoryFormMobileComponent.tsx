import { Alert, Box, Button, CircularProgress, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useFetchWithAuth } from "../../hooks/useFetchWithAuth";
import type { Category } from "../../types/category";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../types/router";
import { ActionFooter } from "../ActionFooter";

interface Props {
    category?: Category
    isEdit: boolean
}

interface FormState {
    name: string
}

const emptyForm = (category?: Category): FormState => ({
    name: category?.name ?? '',
})

export default function CategoryFormMobileComponent({ category, isEdit }: Props) {
        
    const navigate = useNavigate()
    
    const { fetchWithAuth } = useFetchWithAuth();

    const [form, setForm] = useState<FormState>(emptyForm(category))
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
    const [submitError, setSubmitError] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const validate = (): Partial<Record<keyof FormState, string>> => ({
        name: form.name ? '' : 'Le nom est obligatoire',
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
                isEdit && category ? `/api/categories/${category.id}` : '/api/categories',
                {
                    method: 'POST',
                    body: JSON.stringify(
                        { 
                            name: form.name
                        }
                    ),
                }
            )

            if (!res.ok) throw new Error('Identifiants incorrects')

            navigate(Paths.CategoryList)
        } catch (err) {
            setSubmitError(err instanceof Error ? err.message : 'Erreur inconnue')
        } finally {
            setIsSubmitting(false)
        }
    }

    useEffect(() => {
        setForm(emptyForm(category))
    }, [category])

    return (
        <Box sx={{ backgroundColor: 'background.paper' }}>
            <Box component="form" onSubmit={handleSubmit}
                sx={{ height: 'calc(100vh - 106px)', mt: '50px' }} 
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: 2
                    }}
                >
                    
                    {submitError && <Alert severity="error" sx={{ mb: 2 }}>{submitError}</Alert>}

                    <TextField
                        label="Nom"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        size="small"
                        fullWidth
                    />

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