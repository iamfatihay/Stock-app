import { useEffect, useState } from "react";
import useStockCall from "../hooks/useStockCall";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import ProductModal from "../components/modals/ProductModal";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { btnStyle } from "../styles/globalStyle";

const Products = () => {
  const { deleteStockData, getProCatBrand } = useStockCall();
  const { products } = useSelector(state => state.stock);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setInfo({
      name: "",
      cataegory_id: "",
      brand_id: "",
    });
    //* handleClose olduğunda yani modal kapnadığında formdaki verilerin temizlenmesi için burada tanımladık.
  };
  const [info, setInfo] = useState({
    name: "",
    cataegory_id: "",
    brand_id: "",
  });

  const columns = [
    {
      field: "id",
      headerName: "#",
      minWidth: 40,
      maxWidth: 70,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex:3,
    },
    {
      field: "brand",
      headerName: "Brand",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex:2,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 110,
      headerAlign: "center",
      align: "center",
      flex:2,
    },
    {
      field: "stock",
      headerName: "Stock",
      minWidth: 110,
      headerAlign: "center",
      align: "center",
      flex: 0.8,
    },
    {
      field: "actions",
      headerName: "Actions",
      description: "This column has a value getter and is not sortable.",
      headerAlign: "center",
      align: "center",
      sortable: false,
      minWidth: 50,
      flex:1,
      renderCell: params => (
        <>
          {/* {console.log(params)} */}
          <DeleteIcon
            sx={btnStyle}
            onClick={() => deleteStockData("products", params.id)}
          />
        </>
      ),
    },
  ];

  // const rows = [
  //   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  //   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  //   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  //   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  //   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  //   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  //   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  //   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  //   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  // ];

  useEffect(() => {
    // getStockData("products");
    // getStockData("categories");
    // getStockData("brands");
    //! Promise.all()
    getProCatBrand();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Typography variant="h4" color="error" mb={3}>
        Products
      </Typography>
      <Button variant="contained" onClick={handleOpen}>
        New Product
      </Button>
      <ProductModal
        open={open}
        handleClose={handleClose}
        info={info}
        setInfo={setInfo}
      />
      <Box sx={{ width: "100%", marginTop: "1rem" }}>
        <DataGrid
          autoHeight
          rows={products}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5, 10, 25, 50]}
          sx={{
            boxShadow: 4,
          }}
          slots={{
            toolbar: GridToolbar,
          }}
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
};

export default Products;
