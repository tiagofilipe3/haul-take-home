import React from 'react'
import ReactDOM from 'react-dom/client'
import './theme/index.css'
import { ThemeProvider } from '@mui/material'
import GlobalStyles from './theme/globalStyles.ts'
import '@fontsource-variable/heebo'
import { theme } from './theme/theme.ts'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Inspections } from './components/Inspections'
import InspectionDetail from './components/InspectionDetail'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Inspections />,
  },
  {
    path: '/detail',
    element: <InspectionDetail />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
)
