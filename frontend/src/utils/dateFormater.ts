export const dateFormater= (date: string) => {
  return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
  })
}

export const formatDateForInput = (date: string | null): string => {
    if (!date) return ''
    return new Date(date).toISOString().split('T')[0] // "2026-08-28"
}