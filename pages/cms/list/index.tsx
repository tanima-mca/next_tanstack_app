import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  CardActions,
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
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import toast from "react-hot-toast";
import SweetAlertComponent from "@/ui/sweetalert";
import ProductDetailsModal from "../productdetails/productdetails";
import { productt } from "@/api/axios/axios";
import DownloadingIcon from "@mui/icons-material/Downloading";
import UpdateIcon from "@mui/icons-material/Update";
import {
  allProductsQuery,
  deleteMutation,
} from "@/customHooks/query/cms.query.createhooks";

export default function List() {
  const [page, setPage] = useState(1);
  const [isTableView, setIsTableView] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<
    string | number | null
  >(null);
  const [modal, setModal] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const dummyImage = "/images/carimage.jpg";

  const perPage = 10;

  const { data: list, isPending, isError } = allProductsQuery(page, perPage);
  const totalPages = (list as any)?.data.totalPages || 1;
  const products = (list as any)?.data.data || [];

  const { mutate, isPending: isDeleting } = deleteMutation();

  const toggleView = () => setIsTableView((prev) => !prev);

  const handleDelete = () => {
    if (!deleteId) return;

    const formData = new FormData();
    formData.append("id", deleteId);

    mutate(formData, {
      onSuccess: () => {
        // toast.success("Product deleted successfully!");
        setModal(false);
        setDeleteId(null);
      },
      onError: () => {
        toast.error("Failed to delete the product.");
      },
    });
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleOpenModal = (id: string | number) => {
    setSelectedProductId(id);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProductId(null);
  };

  const handleViewDetails = (id: string | number) => {
    setLoadingDetails(true);
    handleOpenModal(id);
    setTimeout(() => setLoadingDetails(false), 1500);
  };

  const handleEdit = (id: string | number) => {
    setLoadingEdit(true);
    window.location.href = `/cms/list/${id}`;
    setTimeout(() => setLoadingEdit(false), 1500);
  };

  const renderTableRow = (product: any) => (
    <TableRow key={product._id}>
      <TableCell>
        <img
         src={product.image ? productt(product.image) : dummyImage}
         alt={product.title}
         onError={(e) => {
           const target = e.target as HTMLImageElement;
           target.src = dummyImage;
         }} // Ensures fallback if the image fails to load
          style={{ height: "100px", objectFit: "contain" }}
        />
      </TableCell>
      <TableCell>{product.title}</TableCell>
      <TableCell>{product.description}</TableCell>
      <TableCell align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleViewDetails(product._id)}
          startIcon={
            loadingDetails ? <DownloadingIcon color="inherit" /> : null
          }
        >
          {loadingDetails ? "Loading..." : "View"}
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
        <Button
          href={`/cms/list/${product._id}`}
          variant="contained"
          startIcon={loadingEdit ? <UpdateIcon color="inherit" /> : null}
          onClick={() => handleEdit(product._id)}
        >
          {loadingEdit ? "Loading..." : "Edit"}
        </Button>
      </TableCell>
    </TableRow>
  );

  const renderCard = (product: any) => (
    <Grid item xs={12} sm={6} md={4} key={product._id}>
      <Card
        sx={{
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          "&:hover": { transform: "scale(1.05)", boxShadow: 10 },
          borderRadius: 4,
          overflow: "hidden",
          background: "linear-gradient(135deg, #ffffff, #f8f8f8)",
          boxShadow: 3,
        }}
      >
        {/* Product Image */}
        {/* <CardMedia
          component="img"
          height="200"
          image={product.image ? productt(product.image) : dummyImage} // Ensure fallback image
          alt={product.title || "No Image Available"}
          sx={{ objectFit: "contain" }}
        /> */}

        <CardMedia
          component="img"
          height="200"
          src={product.image ? productt(product.image) : dummyImage}
          alt={product.title}
          sx={{ objectFit: "contain" }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = dummyImage;
          }} // Ensures fallback if the image fails to load
        />

        {/* Card Content */}
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            align="center"
            sx={{ fontWeight: "bold", color: "#333" }}
          >
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            {product.description}
          </Typography>
        </CardContent>

        {/* Actions Section */}
        <CardActions sx={{ padding: 2, justifyContent: "space-between" }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => handleViewDetails(product._id)}
            startIcon={loadingDetails ? <DownloadingIcon /> : null}
            sx={{
              backgroundColor: "#ff4081",
              "&:hover": { backgroundColor: "#f50057" },
            }}
          >
            {loadingDetails ? "Loading..." : "View Details"}
          </Button>

          <IconButton
            color="error"
            onClick={() => {
              setDeleteId(product._id);
              setModal(true);
            }}
            sx={{
              backgroundColor: "#ffecec",
              borderRadius: "50%",
              "&:hover": { backgroundColor: "#ffcccc" },
            }}
          >
            <DeleteIcon />
          </IconButton>

          <Button
            href={`/cms/list/${product._id}`}
            variant="contained"
            fullWidth
            startIcon={loadingEdit ? <UpdateIcon /> : null}
            onClick={() => handleEdit(product._id)}
            sx={{
              backgroundColor: "#2196F3",
              "&:hover": { backgroundColor: "#1976D2" },
            }}
          >
            {loadingEdit ? "Loading..." : "Edit"}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );

  return (
    <Box
      sx={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "0 16px",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", marginBottom: 4 }}
      >
        Product List
      </Typography>

      <FormControlLabel
        control={<Switch checked={isTableView} onChange={toggleView} />}
        label="Toggle Table View"
      />

      {isPending ? (
        <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
      ) : isError ? (
        <Typography align="center" color="error">
          Failed to load products. Please try again later.
        </Typography>
      ) : products.length === 0 ? (
        <Typography align="center">No products found.</Typography>
      ) : isTableView ? (
        <TableContainer component={Paper} sx={{ borderRadius: "10px" }}>
          <Table>
            <TableHead sx={{ background: "#eeeeee" }}>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{products.map(renderTableRow)}</TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Grid container spacing={4}>
          {products.map(renderCard)}
        </Grid>
      )}

      {modal && (
        <SweetAlertComponent
          confirm={handleDelete}
          cancle={() => setModal(false)}
          title="Are You Sure?"
          subtitle="You will not be able to recover this product"
          type="warning"
          confirmBtnText=""
          confirmBtnBsStyle=""
        />
      )}
      {selectedProductId !== null && (
        <ProductDetailsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          id={selectedProductId}
        />
      )}

      {products && (
        <Box display="flex" justifyContent="space-between" mt={4}>
          <Button
            variant="contained"
            disabled={page === 1}
            onClick={handlePreviousPage}
          >
            Previous
          </Button>
          <Typography>
            Page {page} of {totalPages}
          </Typography>
          <Button
            variant="contained"
            disabled={page === totalPages}
            onClick={handleNextPage}
          >
            Next
          </Button>
        </Box>
      )}
    </Box>
  );
}
