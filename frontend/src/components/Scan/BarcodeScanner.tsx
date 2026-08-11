import { useEffect, useRef, useState } from 'react'
import { BrowserMultiFormatReader } from '@zxing/library'
import { Box, Button, CircularProgress, Divider, TextField, Typography } from '@mui/material'
import { ActionFooter } from '../ActionFooter'

interface Props {
    onScan: (barcode: string) => void
    onError?: (error: string) => void
}

export default function BarcodeScanner({ onScan }: Props) {
        
    const [ isLoading, setisLoading ] = useState(false)
    const [ isLoadingVideo, setisLoadingVideo ] = useState(false)

    const [manualBarcode, setManualBarcode] = useState('')

    const readerRef = useRef<BrowserMultiFormatReader | null>(null)
    const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null)

    useEffect(() => {
        if (!videoElement) return
        // if (!videoElement.paused === false) return // déjà en lecture
        
        setisLoadingVideo(true)
        const codeReader = new BrowserMultiFormatReader()
        readerRef.current = codeReader

        codeReader.decodeFromConstraints(
            {
                video: {
                    facingMode: 'environment',
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                }
            },
            videoElement,
            (result) => {
                setisLoadingVideo(false)
                if (result) {
                    setTimeout(() => onScan(result.getText()), 300)
                }
            }
        ).catch((err) => {
            // Ignore l'erreur "already playing"
            if (err?.message?.includes('already playing')) return
            setisLoadingVideo(false)
            console.error(err)
        })

        return () => {
            codeReader.reset()
            // setisLoadingVideo(false)
        }
    }, [videoElement])

    return (

        // <Box sx={{ mt: 2, mx: 1, mb: 7 }}>
            <Box 
                sx={{ 
                    backgroundColor: 'background.paper',
                    height: 'calc(100vh - 106px)'
                }}
            >
                {isLoading ? (
                    <Box sx={{ textAlign: 'center', pt: '40vh'}}>
                        <CircularProgress size="3rem" aria-label="Loading…" />
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                            Chargement...
                        </Typography> 
                    </Box>
                ) : (
                    <>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                padding: 2
                            }}
                        >

                            {isLoadingVideo ? (
                                <Box sx={{ textAlign: 'center', py: '99px'}}>
                                    <CircularProgress size="3rem" aria-label="Loading…" />
                                </Box>
                            ) : (
                                <video ref={setVideoElement} style={{ width: '100%' }} />
                            )}
                        </Box>
                        <Divider />
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                padding: 2
                            }}
                        >    
                            <TextField
                                label="Code barre (saisie manuelle)"
                                type="text"
                                value={manualBarcode}
                                onChange={(e) => setManualBarcode(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && manualBarcode) {
                                        setisLoading(true)
                                        setTimeout(() => onScan(manualBarcode), 500)
                                    }
                                }}
                                size="small"
                                fullWidth
                                sx={{ marginBottom: 0}}
                            />

                        </Box>
                        
                        <ActionFooter>
                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => {
                                    if (!manualBarcode) return
                                    setisLoading(true)
                                    setTimeout(() => onScan(manualBarcode), 500)
                                }}
                                disabled={isLoading}
                                startIcon={isLoading ? <CircularProgress size={18} color="inherit" /> : null}
                            >
                                {isLoading ? 'Enregistrement...' : 'Enregistrer'}
                            </Button>

                        </ActionFooter>
                    </>
                )}
            </Box>
        // </Box>
    )
}