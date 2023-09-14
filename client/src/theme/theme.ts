import { createTheme } from '@mui/material'

export const theme = createTheme({
  typography: {
    fontFamily: [
      'Heebo Variable',
      'sans-serif',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    text: {
      primary: '#212427',
    },
  },
})
