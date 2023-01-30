import React from "react";
import TableExample from "./components/TableExample";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

function App() {
  return (
    <>
      <Container maxWidth="lg" sx={{ paddingTop: "4rem" }}>
        <h1 className="font-bold text-4xl mb-10 text-center">Analytics</h1>
        <TableExample />
      </Container>
    </>
  );
}

export default App;
