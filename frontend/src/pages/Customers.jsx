import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Button } from "@mui/material";
import { GridAddIcon, GridDeleteIcon } from "@mui/x-data-grid";
import AddCustomer from "../components/AddCustomer";
import { GetColorName } from "hex-color-to-color-name";

const Customers = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    instagram_users: "",
    favorite_outfit_color: "",
  });

  const fetchCustomers = async () => {
    await fetch("http://127.0.0.1:5000/api/customers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://127.0.0.1:5000/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        fetchCustomers();
        setFormData({
          name: "",
          instagram_users: "",
          favorite_outfit_color: "#aabbcc",
        });
        document.getElementById("add").close();
      }
    });
  };

  const handleDelete = async (id) => {
    await fetch(`http://127.0.0.1:5000/api/customers/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        fetchCustomers();
      }
    });
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name", //simple recommended way to define a column
        header: "Name",
        muiTableHeadCellProps: {
          sx: { color: "black" },
        }, //custom props
        muiTableBodyCellProps: {
          sx: { textTransform: "capitalize" },
        },
        Cell: ({ renderedCellValue }) => <p>{renderedCellValue}</p>, //optional custom cell render
      },
      {
        accessorKey: "instagram_users", //simple recommended way to define a column
        header: "Instagram",
        muiTableHeadCellProps: { sx: { color: "black" } }, //custom props
        Cell: ({ renderedCellValue }) => (
          <a
            href={`https://www.instagram.com/${renderedCellValue}`}
            target="_blank"
            rel="noreferrer"
            className="no-underline hover:underline hover:text-blue-500 hover:font-bold"
          >
            {renderedCellValue}
          </a>
        ), //optional custom cell render
      },
      {
        accessorKey: "favorite_outfit_color", //simple recommended way to define a column
        header: "Favorit Outfit Color",
        muiTableHeadCellProps: { sx: { color: "black" } }, //custom props
        muiTableBodyCellProps: {
          sx: { textTransform: "capitalize" },
        },
        Cell: ({ renderedCellValue }) => (
          <strong style={{ color: renderedCellValue }}>
            {GetColorName(renderedCellValue)}
          </strong>
        ), //optional custom cell render
      },
      {
        accessorKey: "id", //simple recommended way to define a column
        header: "Delete",
        muiTableHeadCellProps: { sx: { color: "black" } }, //custom props
        muiTableBodyCellProps: ({ row }) => ({
          sx: { textTransform: "capitalize" },
          onClick: () => {
            handleDelete(row.original.id);
          },
        }),
        Cell: () => (
          <Button variant="outlined" startIcon={<GridDeleteIcon />}>
            Delete
          </Button>
        ), //optional custom cell render
      },
    ],
    [handleDelete]
  );

  const table = useMaterialReactTable({
    data,
    columns,
    enableRowNumbers: true,
    rowNumberDisplayMode: "original",
  });

  return (
    <div className="">
      <Navbar>
        <div className="flex justify-end mb-4">
          <Button
            variant="outlined"
            startIcon={<GridAddIcon />}
            onClick={() => document.getElementById("add").showModal()}
          >
            Add Customer
          </Button>
        </div>
        <AddCustomer
          handleSubmit={handleSubmit}
          setFormData={setFormData}
          formData={formData}
        />
        <MaterialReactTable table={table} />
      </Navbar>
    </div>
  );
};

export default Customers;
