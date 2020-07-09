import React from "react"
import Header from "./components/Header"
import Content from "./components/Content"
import Footer from "./components/Footer"
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            minHeight: '100vh',
            width: '1215px',
            margin: 'auto'
        },
        contentContainer: {
            paddingTop: '78px',
            paddingLeft: '30px',
            paddingRight: '30px',
            backgroundColor: '#EDEDE9',
            minHeight: 'calc(100vh - 103px)'
        }
    })
)


export default function App() {
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <Header />
            <div className={classes.contentContainer}>
                <Content />
                <Footer />
            </div>
        </div>
    )
}
