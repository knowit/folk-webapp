import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from "react-router-dom"
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles"

const theme = createMuiTheme({
    palette: {
    }
})

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
)
