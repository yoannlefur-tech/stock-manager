import { Avatar, Alert, Box, Button, CircularProgress, TextField } from "@mui/material";
import { useState } from "react";
import { useFetchWithAuth } from "../hooks/useFetchWithAuth";
import { formatUserNameInitials } from '../utils/user'
import { ActionFooter } from "./ActionFooter";
import type { User } from "../types/user";
import { useAuth } from "../hooks/useAuth";

type Props = {
  user: User
  onClose: () => void
}

export default function UserProfilFormMobile({user, onClose}: Props) {
    
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
            onClose()
            console.log(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erreur inconnue')
        } finally {
            setIsSubmitting(false)
        }
    }

    return user ? (
        <Box sx={{ paddingBottom: '141px' }}>
            <Box component="form" onSubmit={handleSubmit}
                sx={{
                    height: '100%',
                    backgroundColor: 'background.paper',
                    margin: '24px -24px 16px',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: 2,
                        gap: 3,
                    }}
                >
                    <Avatar sx={{ width: '100px', height: '100px', margin: 'auto' }}>
                        {formatUserNameInitials(
                            {
                                firstName: user.firstName,
                                lastName: user.lastName,
                            },
                            false
                        )}
                    </Avatar>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
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
                    </Box>
                </Box> 
                <ActionFooter>
                    <Button 
                        autoFocus 
                        variant="outlined" 
                        onClick={onClose}
                    >
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
                </ActionFooter>
            </Box>
        </Box>
    ) : null
}