import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  CardActions,
  Grid,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { productt } from "@/api/axios/axios";
import { useState } from "react";
import SweetAlertComponent from "@/ui/sweetalert";
import { FieldValues } from "react-hook-form";
import {allProductsQuery,deleteMutation,} from "@/customHooks/query/cms.query.createhooks";

export default function List() {
  const {
    data: list,
    isPending: isPendingCategories,
    isError: isErrorCategories,
  } = allProductsQuery();
  const { mutate, isPending } = deleteMutation();

  const [isTableView, setIsTableView] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [modal, setModal] = useState(false);
  console.log(deleteId, "deleteId");
  const products = Array.isArray(list)
    ? list.map((product) => ({
        ...product,
        image: productt(product.image),
      }))
    : [];

  const toggleView = () => setIsTableView((prev) => !prev);

  const handleDelete = async (formData: FieldValues) => {
    // setModal: (value: boolean) => void;

    const formdata = new FormData();
    formdata.append("id", deleteId);
    mutate(formdata, {});
    setModal(false);
    console.log(formData);
  };

  // const handleEdit = (productId: string) => {
  //   console.log(`Edit product with id: ${productId}`);
  // };

  return (
    <>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", marginBottom: 4 }}
      >
        Product List
      </Typography>

      <Box
        sx={{
          maxWidth: "1300px",
          margin: "0 auto",
          padding: "0 16px",
        }}
      >
        <FormControlLabel
          control={<Switch checked={isTableView} onChange={toggleView} />}
          label="Toggle Table View"
        />

        {isTableView ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell>
                        <img
                          src={product.image}
                          alt={product.title}
                          style={{ height: "100px", objectFit: "contain" }}
                        />
                      </TableCell>
                      <TableCell>{product.title}</TableCell>
                      <TableCell>{product.description}</TableCell>
                      <TableCell align="center">
                        <Button variant="contained" size="small">
                          View
                        </Button>
                        <IconButton
                          color="error"
                          onClick={() => {
                            setDeleteId(product._id);
                            setModal(true);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="primary"
                          // onClick={() => handleEdit(product._id)}
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      {isPendingCategories
                        ? "Loading products..."
                        : "No products found."}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Grid container spacing={4}>
            {products.length > 0 ? (
              products.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product._id}>
                  <Card
                    sx={{
                      transition:
                        "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.image}
                      alt={product.title}
                      sx={{ objectFit: "contain" }}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        align="center"
                      >
                        {product.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        align="center"
                      >
                        {product.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        width="100%"
                        sx={{
                          padding: 1,
                          border: "1px solid #ccc",
                          borderRadius: "8px",
                          gap: 2,
                        }}
                      >
                        <Button variant="contained" size="medium">
                          View Details
                        </Button>
                        <Box>
                          <IconButton
                            color="error"
                            onClick={() => {
                              setDeleteId(product._id);
                              setModal(true);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="primary"
                            // onClick={() => handleEdit(product._id)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography align="center" width="100%">
                {isPendingCategories
                  ? "Loading products..."
                  : "No products found."}
              </Typography>
            )}
          </Grid>
        )}
        {modal && (
          <SweetAlertComponent
            confirm={handleDelete}
            cancle={() => setModal(false)}
            title="Are You Sure?"
            subtitle="You will not be able to recover this product"
            type="warning"
          />
        )}
      </Box>
    </>
  );
}
