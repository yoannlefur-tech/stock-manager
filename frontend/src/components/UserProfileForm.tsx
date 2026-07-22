import { Alert, Avatar, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Modal, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useFetchWithAuth } from "../hooks/useFetchWithAuth";
import { formatUserNameInitials } from "../utils/user";
import type { User } from "../types/user";
import { useAuth } from "../hooks/useAuth";

interface Props {
    user: User
    open: boolean
    setOpen: (value: boolean) => void
}

export default function UserProfilForm({user, open, setOpen}: Props) {
        
    const [form, setForm] = useState({ 
        email: user?.email ?? '',
        firstName: user?.firstName ?? '',
        lastName: user?.lastName ?? ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState({ email: '', firstName: '' , lastName: '' })
    const [error, setError] = useState<string | null>(null)
    const { fetchWithAuth } = useFetchWithAuth();
    const { refreshUser } = useAuth()
    const handleClose = () => setOpen(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const newErrors = {
                email: form.email ? '' : 'L\'email est obligatoire',
                firstName: form.firstName ? '' : 'Le prénom est obligatoire',
                lastName: form.lastName ? '' : 'Le nom est obligatoire',
            }

            setErrors(newErrors)

            const hasErrors = Object.values(newErrors).some(e => e !== '')
            if (hasErrors) {
                setIsSubmitting(false)
                return
            }

            const res = await fetchWithAuth(`/api/users/${user?.id}`, {
                method: 'PUT',
                body: JSON.stringify({ email: form.email, firstName: form.firstName, lastName: form.lastName })
            })

            if (!res.ok) throw new Error('Identifiants incorrects')

            const data = await res.json()
            await refreshUser()
            handleClose()
            console.log(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erreur inconnue')
        } finally {
            setIsSubmitting(false)
        }
    }

    return user ? (
        <Dialog            
            open={open}
            onClose={(_event, reason) => {
                if (reason === 'backdropClick') return
                handleClose()
            }}
            PaperComponent={Paper}
            aria-labelledby="draggable-dialog-title"
            fullWidth
        >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                Modifier mes données
            </DialogTitle>
            <Box component="form" onSubmit={handleSubmit}>
                <DialogContent dividers={true}>

                    <Avatar sx={{ width: '100px', height: '100px', margin: 'auto' }}>
                        {formatUserNameInitials(
                            {
                                firstName: user.firstName,
                                lastName: user.lastName,
                            },
                            false
                        )}
                    </Avatar>

                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                    <TextField
                        label="Prénom"
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                        fullWidth
                    />

                    <TextField
                        label="Nom"
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                        fullWidth
                    />

                    <TextField
                        label="Email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Annuler
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting}
                        startIcon={isSubmitting ? <CircularProgress size={18} color="inherit" /> : null}
                    >
                        {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    ) : null
}