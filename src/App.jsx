import React from "react";
import TableExample from "./components/TableExample";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import NewTable from "./components/NewTable";

function App() {
  return (
    <div className="p-4">
      <h1 className="font-bold text-4xl mb-4 text-center">Analytics</h1>
      {/* <TableExample /> */}
      <NewTable />
    </div>
  );
}

export default App;
