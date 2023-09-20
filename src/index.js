import React from 'react'
import ReactDOM from 'react-dom/client'
import Routes from './Routes/routes'
import GlobalStyles from './Styles/GlobalStyles'
import { ToastContainer } from 'react-toastify'
import  AppProvider  from './hooks/index'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <>
  <AppProvider>
    <Routes />
    </AppProvider>
     <ToastContainer />
    <GlobalStyles/>
  </>
)
