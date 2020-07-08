import React from "react"
import { Container } from "@material-ui/core"
import Header from "./components/Header"
import PageContainer from "./components/PageContainer"
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            minHeight: '100vh'
        },
    })
)

export default function App() {
    const classes = useStyles()

    return (
        <Container fixed maxWidth={'xl'} className={classes.container}>
            <Header />
            <PageContainer />
        </Container>
    )
}
