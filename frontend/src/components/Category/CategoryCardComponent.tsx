import { Box, Card, CardActions, CardContent, IconButton, Tooltip, Typography, type ChipProps } from "@mui/material";
import { Fragment } from "react/jsx-runtime";
import { dateFormater } from "../../utils/dateFormater";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { generatePath, useNavigate } from "react-router-dom";
import { Paths } from "../../types/router";
import DeleteConfirmModal from "../DeleteConfirmModal";
import { useDelete } from "../../hooks/useDelete";
import { useState } from "react";
import type { Category } from "../../types/category";

interface Props {
    category: Category | undefined
}

export default function CategoryCardComponent({ category }: Props) {

    const navigate = useNavigate()
    const [ selectedCategory, setSelectedCategory ] = useState<Category>()
    const [ openDelete, setOpenDelete ] = useState(false)
    const { deleteRessource } = useDelete('categories')

    return category ? (
        <Fragment key={category.id}>
            <Card>
                <CardContent sx={{ p: 0 }}>
                    <Box sx={{ display:'flex', justifyContent: "space-between", alignItems: "flex-start", mb:1 }}>
                        <Typography variant="h6" sx={{ lineHeight: 1.2, fontWeight: '700'  }}>
                            {category.name}
                        </Typography>
                    </Box>
                
                    <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', mt: 0.5 }}>
                        Créée le {dateFormater(category.createdAt)}
                        {category.updatedAt !== category.createdAt && ` · modifiée le ${dateFormater(category.updatedAt)}`}
                    </Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, p: 0 }}>
                    <Tooltip title="Voir la categorie">
                    <IconButton
                        size="small"
                        sx={{ color: 'text.secondary' }}
                        onClick={() => navigate(generatePath(Paths.CategoryDetails, { id: String(category.id) }))}
                    >
                        <VisibilityOutlinedIcon fontSize="small" />
                    </IconButton>
                    </Tooltip>

                    <Tooltip title="Modifier la categorie">
                    <IconButton
                        size="small"
                        sx={{ color: 'primary.main' }}
                        onClick={() => navigate(generatePath(Paths.CategoryEdit, { id: String(category.id) }))}
                    >
                        <EditOutlinedIcon fontSize="small" />
                    </IconButton>
                    </Tooltip>

                    <Tooltip title="Supprimer">
                    <IconButton
                        size="small"
                        sx={{
                        color: 'text.secondary',
                        '&:hover': { color: 'error.main', bgcolor: 'error.lighter' },
                        }}
                        onClick={() => { setSelectedCategory(category); setOpenDelete(true) }}
                    >
                        <DeleteOutlinedIcon fontSize="small" />
                    </IconButton>
                    </Tooltip>
                </CardActions>
            </Card>     
            {selectedCategory && (
              <DeleteConfirmModal
                  entity={selectedCategory}
                  deleteFn={deleteRessource}
                  open={openDelete}
                  setOpen={setOpenDelete}
                  label="cette catégorie"
              />
            )}
        </Fragment>
        
    ) : null
}