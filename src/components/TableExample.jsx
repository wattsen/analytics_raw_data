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

  const getData = () => {
    setLoading(true);
    fetch("https://narynkey.pythonanywhere.com/api/getproducts/1")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        console.log(res);
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
    <TableContainer tainer component={Paper}>
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
              onClick={() => handleSortingChange("purchases")}
              align="right"
            >
              <span className=" cursor-pointer">
                Product purchased
                {order === "desc" && sortField === "purchases" ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </span>
            </TableCell>
            <TableCell
              onClick={() => handleSortingChange("sold_as_upsell")}
              align="right"
            >
              <span className=" cursor-pointer">
                Sold as upsell
                {order === "desc" && sortField === "sold_as_upsell" ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </span>
            </TableCell>
            <TableCell
              onClick={() => handleSortingChange("declined_as_upsell")}
              align="right"
            >
              <span className=" cursor-pointer">
                Declined as upsell
                {order === "desc" && sortField === "declined_as_upsell" ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </span>
            </TableCell>
            <TableCell
              onClick={() => handleSortingChange("sold_child_upsells")}
              align="right"
            >
              <span className=" cursor-pointer">
                Sold child upsells
                {order === "desc" && sortField === "sold_child_upsells" ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </span>
            </TableCell>
            <TableCell
              onClick={() => handleSortingChange("declined_child_upsells")}
              align="right"
            >
              <span className=" cursor-pointer">
                Declined child upsells
                {order === "desc" && sortField === "declined_child_upsells" ? (
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
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.unique_sessions}</TableCell>
              <TableCell align="right">{row.purchases}</TableCell>
              <TableCell align="right">{row.sold_as_upsell}</TableCell>
              <TableCell align="right">{row.declined_as_upsell}</TableCell>
              <TableCell align="right">{row.sold_child_upsells}</TableCell>
              <TableCell align="right">{row.declined_child_upsells}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableExample;
