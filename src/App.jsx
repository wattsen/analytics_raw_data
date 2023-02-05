import React from "react";
import TableExample from "./components/TableExample";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import NewTable from "./components/NewTable";

function App() {
  return (
    <div className="p-4">
      <h1 className="font-bold text-4xl mb-10 text-center">
        Analytics of{" "}
        <a
          className="text-blue-500 underline"
          href="https://galactictapestry.com/"
          target="_blank"
        >
          Galactictapestry.com
        </a>{" "}
      </h1>
      {/* <TableExample /> */}
      <NewTable />
    </div>
  );
}

export default App;
