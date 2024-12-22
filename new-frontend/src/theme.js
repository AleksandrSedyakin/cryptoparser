import { createTheme } from '@mui/material';

export const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#1a1d29',
            paper: '#232733'
        },
        primary: {
            main: '#2196f3'
        },
        text: {
            primary: '#ffffff',
            secondary: '#b0b4bc'
        }
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    backgroundColor: '#232733',
                    borderRadius: 16
                }
            }
        }
    }
}); 