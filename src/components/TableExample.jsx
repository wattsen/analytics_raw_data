import React, { useState, useEffect } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const TableExample = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");

  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sortField && order === "desc" ? "asc" : "desc";
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };

  const handleSorting = (sortField, sortOrder) => {
    if (sortField) {
      const sorted = [...data].sort((a, b) => {
        if (a[sortField] === null) return 1;
        if (b[sortField] === null) return -1;
        if (a[sortField] === null && b[sortField] === null) return 0;
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
            numeric: true,
          }) * (sortOrder === "asc" ? 1 : -1)
        );
      });
      setData(sorted);
    }
  };

  const data4 = [...data].sort((a, b) =>
    a.views.toString().localeCompare(b.views.toString())
  );

  const getData = () => {
    setLoading(true);
    fetch("https://narynkey.pythonanywhere.com/api/getproducts/1")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .catch((e) => console.log(e))
      .finally((e) => setLoading(false));
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return "Loading";
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Offer ID</TableCell>
            <TableCell align="right">Product Name</TableCell>
            <TableCell
              onClick={() => handleSortingChange("unique_sessions")}
              align="right"
            >
              <span className=" cursor-pointer">
                Unique Sessions
                {order === "desc" && sortField === "unique_sessions" ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </span>
            </TableCell>
            <TableCell
              onClick={() => handleSortingChange("views")}
              align="right"
            >
              <span className=" cursor-pointer">
                Product visited
                {order === "desc" && sortField === "views" ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.product_id}
              </TableCell>
              <TableCell align="right">
                <a
                  href={`https://galactictapestry.com/products/${row.name
                    .toLowerCase()
                    .replace("™", "")
                    .replaceAll(" ", "-")}`}
                  target="_blank"
                  className="underline text-blue-500"
                >
                  {row.name}
                </a>
              </TableCell>
              <TableCell align="right">{row.unique_sessions}</TableCell>
              <TableCell align="right">{row.views}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableExample;
