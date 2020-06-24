import React from "react";
import { Container } from "@material-ui/core";
import Header from "./components/Header";
import PageContainer from "./components/PageContainer";


export default function App() {
    return (
        <Container>
            <Header />
            <PageContainer />
        </Container>
    );
}
