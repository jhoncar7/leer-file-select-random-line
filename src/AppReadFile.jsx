import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import backgroundImage from '../public/logo.jfif';
import Swal from 'sweetalert2';

export const AppReadFile = () => {
    const [file, setFile] = useState(null);
    const [winnerMessage, setWinnerMessage] = useState(null);

    const handleFileChange = ({ target }) => {

        if (target.files.length === 0) {
            setWinnerMessage(null);
            setFile(null);
            return;
        }

        const [name, extension] = target.files[0].name.toLocaleUpperCase().split('.');

        if (extension !== 'TXT') {
            target.value = '';
            setWinnerMessage(null);
            return Swal.fire({
                title: 'Extension del archivo invalida.',
                html: 'La extensión del archivo debe ser .txt',
                icon: 'error',
            });
        }

        const selectedFile = target.files[0];
        setFile(selectedFile);
    };

    const handleFileUpload = () => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const fileContent = event.target.result;
                const lines = fileContent.split('\n');
                const randomLine = lines[Math.floor(Math.random() * lines.length)];
                setWinnerMessage(randomLine);

                Swal.fire({
                    title: '¡Ganador!',
                    text: randomLine,
                    icon: 'success',
                    confirmButtonText: 'Cerrar',
                    animation: true,
                    customClass: {
                        popup: 'animated tada',
                    },
                });

                // console.log('Contenido del archivo:', fileContent);
            };
            reader.readAsText(file);
        } else {
            return Swal.fire({
                title: 'Uhhh parece que no has seleccionado ningun archivo',
                html: 'Para poder procesar el archivo, primero debes adjuntar uno 😀',
                icon: 'error',
            });
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Box sx={{ width: '300px', textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px' }}>
                <Typography variant="h5" gutterBottom>
                    Subir Archivo
                </Typography>
                <TextField
                    id="file_upload"
                    type="file"
                    inputProps={{ accept: '.txt' }}
                    onChange={handleFileChange}
                    sx={{ width: '100%', marginBottom: '20px' }}
                />
                <Button onClick={handleFileUpload} variant="contained" color="primary">
                    Procesar
                </Button>

                {winnerMessage && (
                    <Box mt={2}>
                        <Typography variant="h6">¡El ganador es!</Typography>
                        <Typography>{winnerMessage}</Typography>
                    </Box>
                )}

            </Box>

        </Box>
    );
};
