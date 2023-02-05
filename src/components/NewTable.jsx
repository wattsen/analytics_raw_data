import React, { useState, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const NewTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");

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

  if (loading) {
    return "Loading";
  }
  return (
    <table className="border border-collapse border-gray-100 m-auto">
      <thead>
        <tr>
          <th rowSpan={2} className="border">
            Product Name
          </th>
          <th rowSpan={2} className="border">
            LP #
          </th>
          <th rowSpan={2} className="border">
            Landing page url
          </th>
          <th
            onClick={() => handleSortingChange("unique_sessions")}
            colSpan={2}
            className="border"
          >
            Unique Landing page Views
            {order === "desc" && sortField === "unique_sessions" ? (
              <KeyboardArrowUpIcon className="w-2 h-2" />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </th>
          <th
            onClick={() => handleSortingChange("checkout_step_1")}
            colSpan={2}
            className="border"
          >
            Checkout Step 1
            {order === "desc" && sortField === "checkout_step_1" ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </th>
          <th
            onClick={() => handleSortingChange("checkout_step_2")}
            colSpan={2}
            className="border"
          >
            Check out step 2
            {order === "desc" && sortField === "checkout_step_2" ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </th>
          <th
            onClick={() => handleSortingChange("purchases")}
            colSpan={2}
            className="border"
          >
            Purchase
            {order === "desc" && sortField === "purchases" ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </th>
          <th onClick={() => handleSortingChange("cvr_%")} className="border">
            CVR
            {order === "desc" && sortField === "cvr_%" ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </th>
          <th
            onClick={() => handleSortingChange("upsell_1_takes")}
            colSpan={2}
            className="border"
          >
            Upsell 1 Takes
            {order === "desc" && sortField === "upsell_1_takes" ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </th>
          <th
            onClick={() => handleSortingChange("upsell_2_takes")}
            colSpan={2}
            className="border"
          >
            Upsell 2 Takes
            {order === "desc" && sortField === "upsell_2_takes" ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </th>
          <th
            onClick={() => handleSortingChange("upsell_3_takes")}
            colSpan={2}
            className="border"
          >
            Upsell 3 takes
            {order === "desc" && sortField === "upsell_3_takes" ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </th>
        </tr>
        <tr>
          <th className="border">Count</th>
          <th className="border">%</th>
          <th className="border">Count</th>
          <th className="border">%</th>
          <th className="border">Count</th>
          <th className="border">%</th>
          <th className="border">Count</th>
          <th className="border">%</th>
          <th className="border">%</th>
          <th className="border">Count</th>
          <th className="border">%</th>
          <th className="border">Count</th>
          <th className="border">%</th>
          <th className="border">Count</th>
          <th className="border">%</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((row, idx) => (
          <tr key={idx}>
            <td className="border">{row.name}</td>
            <td className="border">#1</td>
            <td className="border">
              <a
                className="text-blue-500 underline"
                href={`https://galactictapestry.com/products/${row.name.replaceAll(
                  " ",
                  "-"
                )}`}
                target="_blank"
              >
                Link
              </a>
            </td>
            <td className="border">{row.unique_sessions}</td>
            <td className="border">100%</td>
            <td className="border">{row.checkout_step_1[0]}</td>
            <td className="border">{row.checkout_step_1[1]}%</td>
            <td className="border">{row.checkout_step_2[0]}</td>
            <td className="border">{row.checkout_step_2[1]}%</td>
            <td className="border">{row.purchases[0]}</td>
            <td className="border">{row.purchases[1]}%</td>
            <td className="border">{`${row["cvr_%"]}`}%</td>
            <td className="border">{row.upsell_1_takes[0]}</td>
            <td className="border">{row.upsell_1_takes[1]}%</td>
            <td className="border">{row.upsell_2_takes[0]}</td>
            <td className="border">{row.upsell_2_takes[1]}%</td>
            <td className="border">{row.upsell_3_takes[0]}</td>
            <td className="border">{row.upsell_3_takes[1]}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default NewTable;
