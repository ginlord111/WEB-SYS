import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import "@fontsource/poppins";

import { GoogleOAuthProvider } from '@react-oauth/google';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   <GoogleOAuthProvider clientId='750421522470-u8areg2qjf5q4rctsgr6ar1aa4viqrjs.apps.googleusercontent.com'>
    <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
