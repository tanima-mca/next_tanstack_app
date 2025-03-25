import React, { useEffect, useState } from "react";
import {
  Box,
  Modal,
  CircularProgress,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import { productmodalProps } from "@/typeScript/cms.interface";
import { fetchProductQuery } from "@/customHooks/query/cms.query.createhooks";
import { motion } from "framer-motion";

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const ProductDetailsModal: React.FC<
  productmodalProps & { id: string | number }
> = ({ isOpen, onClose, id }) => {
  const { data, isLoading, isError } = fetchProductQuery(id);
  const dummyImage = "/images/carimage.jpg";
  const [imageSrc, setImageSrc] = useState(dummyImage);

  useEffect(() => {
    if (data?.image && typeof data.image === "string" && data.image.trim()) {
      setImageSrc(
        `https://wtsacademy.dedicateddevelopers.us/uploads/product/${data.image}`
      );
    } else {
      setImageSrc(dummyImage);
    }
  }, [data]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="product-details-title"
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Box sx={modalStyle}>
          <Typography
            variant="h5"
            fontWeight="bold"
            color="primary"
            gutterBottom
          >
            Product Details
          </Typography>

          {isLoading && (
            <Box display="flex" justifyContent="center" my={3}>
              <CircularProgress />
            </Box>
          )}

          {isError && (
            <Typography color="error" textAlign="center">
              Failed to load product details. Please try again.
            </Typography>
          )}

          {data && (
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <motion.div whileHover={{ scale: 1.1 }}>
                {/* <Avatar
                  src={
                    data?.image &&
                    typeof data.image === "string" &&
                    data.image.trim()
                      ? `https://wtsacademy.dedicateddevelopers.us/uploads/product/${data.image}`
                      : dummyImage // Use dummy image if no product image
                  }
                  alt="Product"
                  sx={{
                    width: 120,
                    height: 120,
                    mx: "auto",
                    mb: 2,
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                  }}
                  onError={(e) => {
                    e.currentTarget.onerror = null; // Prevent infinite loop
                    const target = e.target as HTMLImageElement;
                    target.src = dummyImage; // Fallback if image fails to load
                  }}
                /> */}

                <Avatar
                  src={imageSrc}
                  alt="Product"
                  sx={{
                    width: 150, // Increase the size for better design
                    height: 150,
                    display: "block",
                    mx: "auto", // Centers horizontally
                    my: 2, // Adds vertical spacing
                    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)", // Adds depth
                    border: "3px solid #ddd", // Optional: Light border for a sleek look
                  }}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    setImageSrc(dummyImage);
                  }}
                />
              </motion.div>
              <Typography variant="h6" fontWeight="bold">
                {data.title}
              </Typography>
              <Typography variant="body2" mt={1} color="text.secondary">
                {data.description}
              </Typography>
            </Box>
          )}

          <Box display="flex" justifyContent="center" mt={4}>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Button variant="contained" color="secondary" onClick={onClose}>
                Close
              </Button>
            </motion.div>
          </Box>
        </Box>
      </motion.div>
    </Modal>
  );
};

export default ProductDetailsModal;
