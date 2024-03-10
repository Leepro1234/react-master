import React from 'react'
import ReactDOM from 'react-dom/client'
import router from './Router'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RecoilRoot } from 'recoil'
import { ThemeProvider } from 'styled-components'
import { DarkTheme } from './theme'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const queryClient = new QueryClient()
root.render(
  // <React.StrictMode>
  <RecoilRoot>
    <ThemeProvider theme={DarkTheme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  </RecoilRoot>
  // </React.StrictMode>
)
