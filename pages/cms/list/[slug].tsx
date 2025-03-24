import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  Paper,
  Box,
  Stack,
  Grid2,
  CircularProgress,
} from "@mui/material";
import { updateProps } from "@/typeScript/cms.interface";
import {
  fetchProductQuery,
  updateMutation,
} from "@/customHooks/query/cms.query.createhooks";
import toast from "react-hot-toast";

export default function UpdateProduct() {
  const router = useRouter();
  const { slug } = router.query;
  const id = slug as string;

  const {
    data: product,
    isPending: isPendingCategories,
    isError: isErrorCategories,
  } = fetchProductQuery(id);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<updateProps>();

  const { mutate, isPending } = updateMutation();
  const [image, setImage] = useState<Blob | File | null>(null);

  // useEffect(() => {
  //   if (product) {
  //     reset({
  //       title: product.title,
  //       description: product.description,
  //     });
  //     if (product.image) {
  //       setImage(`https://wtsacademy.dedicateddevelopers.us/uploads/product/${product.image}`);

  //     }
  //   }
  // }, [product,reset]);

  useEffect(() => {
    if (!isPending && !isErrorCategories && product) {
      setValue("title", product.title);
      setValue("description", product.description);
    }
  }, [product, setValue, isPending, isErrorCategories]);

  const sendData = async (e: any) => {
    const formdata = new FormData();
    // const { image } = e as { image: File };
    formdata.append("id", id as string);
    formdata.append("title", e.title);
    formdata.append("description", e.description);

    if (image) {
      formdata.append("image", image);
    }
    // setloading(true);
    mutate(formdata, {
      onSuccess: () => {
        // toast.success("Product Data Updated Successfully");
        router.push("/cms/list");
      },
      onError: () => {
        toast.error("Something Went Wrong!Product Data not updated");
      },
    });
  };

  if (isPendingCategories) {
    return (
      <Grid2
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <CircularProgress />
      </Grid2>
    );
  }

  if (isErrorCategories) {
    return (
      <Typography variant="h6" align="center" color="error">
        Failed to load product details. Please try again later.
      </Typography>
    );
  }

  return (
    <Grid2
      container
      justifyContent="center"
      alignItems="center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right,#d1c4e9,rgb(238, 206, 254))",
      }}
    >
      <Paper
        style={{
          width: "100%",
          maxWidth: 400,
          padding: 25,
          background: "#f3e5f5",
          borderRadius: 15,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.8)",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          style={{ marginBottom: 20 }}
        >
          Update Product
        </Typography>
        <form onSubmit={handleSubmit(sendData)}>
          <TextField
            {...register("title", { required: "Title is required" })}
            label="Title"
            placeholder="Enter product title"
            fullWidth
            margin="normal"
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          <TextField
            {...register("description", {
              required: "Description is required",
            })}
            label="Description"
            placeholder="Enter product description"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
          <Box sx={{ mb: 2 }}>
            <TextField
              type="file"
              fullWidth
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files && e.target.files[0]) {
                  setImage(e.target.files[0]);
                }
              }}
              sx={{
                backgroundColor: "white",
                borderRadius: "5px",
                marginBottom: 2,
              }}
            />
            {image ? (
              <img
                height="60px"
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="upload-img"
              />
            ) : (
              product?.image && (
                <img
                  height="90px"
                  src={`https://wtsacademy.dedicateddevelopers.us/uploads/product/${product.image}`}
                  alt="Existing"
                  className="upload-img"
                />
              )
            )}
          </Box>
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{ mt: 3, fontSize: 18, color: "#000" }}
            disabled={isPending}
          >
            <b>{isPending ? "Updating..." : "Update Product"}</b>
          </Button>
        </form>
      </Paper>
    </Grid2>
  );
}

// export default function Details() {
//     const router = useRouter();
//     let id = router.query;
//     console.log(id,"kk")
//     return (
//     <>

//     </>
//     );
//   }
