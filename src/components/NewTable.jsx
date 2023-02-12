import React, { useState, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const NewTable = () => {
  const [data, setData] = useState([]);
  const [store, setStore] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [selectedId, setSelectedId] = useState(1);
  const [collapse, setCollapse] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const getData = (id) => {
    if (!id) {
      id = 1;
    }
    setLoading(true);
    fetch(`https://narynkey.pythonanywhere.com/api/getproducts/${id}`)
      .then((res) => res.json())
      .then((res) => {
        let sortData = [...res][1].sort((a, b) => {
          return b["unique_sessions"]
            .toString()
            .localeCompare(a["unique_sessions"].toString(), "en", {
              numeric: true,
            });
        });
        setSortField("unique_sessions");
        setOrder("desc");
        setData(sortData);

        console.log(sortData);
      })
      .catch((e) => console.log(e))
      .finally((e) => {
        setLoading(false);
      });
  };

  const getStore = () => {
    fetch("https://narynkey.pythonanywhere.com/api/stores/")
      .then((res) => res.json())
      .then((res) => {
        setStore(res.results);
        console.log(res.results);
      })
      .catch((e) => console.log(e))
      .finally((e) => setLoading(false));
  };

  useEffect(() => {
    getData();
    getStore();
  }, []);

  const setCurrentStore = (id) => {
    getData(id);
    setSelectedId(id);
  };

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

  const handleFilter = () => {
    console.log(startDate);
    console.log(endDate);
    console.log(startTime);
    console.log(endTime);

    fetch(
      `https://narynkey.pythonanywhere.com/api/getproducts/1?start_date=` +
        startDate +
        "T" +
        startTime +
        "&?end_date=" +
        endDate +
        "T" +
        endTime
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setData(res[1]);
        // console.log(res.results);
      })
      .catch((e) => console.log(e))
      .finally((e) => setLoading(false));
  };

  if (loading) {
    return "Loading";
  }
  return (
    <>
      <div className="flex justify-center items-center mb-6">
        <select
          defaultValue={selectedId}
          onChange={(e) => setCurrentStore(e.target.value)}
        >
          {store?.map((el) => {
            if (el.name.split(".").length <= 2) {
              return (
                <option key={el.id} value={el.id}>
                  {el.name}
                </option>
              );
            }
          })}
        </select>
      </div>
      <div className="flex justify-center p-2">
        <h2 className="font-bold mr-4">Start time: </h2>
        <div className="px-2 mx-2 border-r">
          <input
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border mr-1"
            type="date"
            name=""
            id=""
          />
          <input
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="border"
            type="time"
            name=""
            id=""
          />
        </div>
        <h2 className="font-bold mr-4">End time: </h2>

        <div className="px-2">
          <input
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border mr-1"
            type="date"
            name=""
            id=""
          />
          <input
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="border"
            type="time"
            name=""
            id=""
          />
        </div>
        <button onClick={handleFilter} className="border px-3 bg-gray-100">
          Filter
        </button>
      </div>
      <table className="border border-collapse border-gray-100 m-auto">
        <thead>
          <tr>
            <th rowSpan={2} className="border">
              Product Name
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
            <>
              <tr
                className="hover:bg-gray-100 cursor-pointer"
                onClick={() => setCollapse(idx)}
                key={idx}
              >
                <td className="border">{row.name}</td>

                <td className="border text-gray-500">Total funnel</td>
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
              {collapse === idx &&
                row.lps.map((el, idx) => (
                  <tr className="bg-gray-50">
                    <td></td>
                    <td>
                      {" "}
                      <a
                        className="text-blue-500 underline"
                        href={`https://${el.lp_name}`}
                        target="_blank"
                      >
                        {el.lp_name}
                      </a>
                    </td>
                    <td className="border">{el.unique_sessions}</td>
                    <td className="border">100%</td>
                    <td className="border">{el.checkout_step_1[0]}</td>
                    <td className="border">{el.checkout_step_1[1]}%</td>
                    <td className="border">{el.checkout_step_2[0]}</td>
                    <td className="border">{el.checkout_step_2[1]}%</td>
                    <td className="border">{el.purchases[0]}</td>
                    <td className="border">{el.purchases[1]}%</td>
                    <td className="border">{`${el["cvr_%"]}`}%</td>
                    <td className="border">{el.upsell_1_takes[0]}</td>
                    <td className="border">{el.upsell_1_takes[1]}%</td>
                    <td className="border">{el.upsell_2_takes[0]}</td>
                    <td className="border">{el.upsell_2_takes[1]}%</td>
                    <td className="border">{el.upsell_3_takes[0]}</td>
                    <td className="border">{el.upsell_3_takes[1]}%</td>
                  </tr>
                ))}
            </>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default NewTable;
