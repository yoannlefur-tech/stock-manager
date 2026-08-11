import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper } from "@mui/material";

interface DeletableEntity {
    id: number | string
    name: string
}

interface Props<T extends DeletableEntity> {
    entity: T
    deleteFn: (id: number | string) => Promise<void>
    onSuccess?: () => void
    open: boolean
    setOpen: (value: boolean) => void
    label?: string
}

export default function DeleteConfirmModal<T extends DeletableEntity>({
    entity,
    deleteFn,
    onSuccess,
    open,
    setOpen,
    label = 'cet élément',
}: Props<T>) {

    const handleClose = () => setOpen(false);
    
    const handleDelete = async () => {
        try {
            await deleteFn(entity.id)
            onSuccess?.()
            handleClose()
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperComponent={Paper}
            aria-labelledby="draggable-dialog-title"
            fullWidth
        >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                {entity.name}
            </DialogTitle>
            <DialogContent dividers={true}>
                Voulez-vous supprimer {label} ?
            </DialogContent>
            <DialogActions>
                <Button 
                    autoFocus
                    onClick={handleClose}
                    size="small"
                >
                    Annuler
                </Button>
                <Button 
                    variant="contained" 
                    color="error"
                    onClick={handleDelete}
                    size="small" 
                >
                    Supprimer
                </Button>
            </DialogActions>
        </Dialog>
    )
}
