import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Paper,
  CircularProgress,
} from '@mui/material'
import { useAuth } from '../../hooks/useAuth'

export default function LoginForm() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({ email: '', password: '' })
  const [error, setError] = useState<string | null>(null)
  const { login } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const newErrors = {
        email:    form.email    ? '' : 'L\'email est obligatoire',
        password: form.password ? '' : 'Le mot de passe est obligatoire',
      }

      setErrors(newErrors)

      const hasErrors = Object.values(newErrors).some(e => e !== '')
      if (hasErrors) {
        setIsSubmitting(false)
        return
      }

      await login(form.email, form.password)
      navigate('/home')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey.100',
      }}
    >
      <Paper elevation={0} sx={{ p: 3, width: '100%', maxWidth: 400 }}>

        <Typography variant="h2" color='primary' sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
          Gestion des stocks
        </Typography>

        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
          Connexion
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column' }} >
          <TextField
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            size="small"
            fullWidth
          />

          <TextField
            label="Mot de passe"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            size="small"
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={18} color="inherit" /> : null}
            size="small"
          >
            {isSubmitting ? 'Connexion...' : 'Se connecter'}
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}