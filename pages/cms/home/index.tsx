import Image from "next/image";
import { motion } from "framer-motion";
import {
  Container,
  Typography,
  Box,
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Button,
  Grid,
} from "@mui/material";

const HomePage = () => {
  const heroSection = {
    name: "Discover Your Beauty",
    description:
      "Enhance your natural beauty with our exclusive skincare range!",
    image: "/images/img1.jpg",
  };

  const cosmeticImages = [
    "/images/slider1.jpg",
    "/images/slider9.jpg",
    "/images/slider3.jpg",
    "/images/slider10.jpg",
  ];

  var cardItems = [
    {
      id: 1,
      title: "Vitamin C 23 Serum",
      description:
        "Brightness skin tone,Prevents Wrinkels and fine lines,Fade dark spots and hyperpigmentation .",
      image: "/images/cardimg1.jpg",
      buttonText1: "Share",
      buttonText2: "Learn More",
    },
    {
      id: 2,
      title: "Niacinamide 15 Serum",
      description:
        "Controls and Balances oils and sebum,Improves skin texture,Tightens the looks of sagging pores .",
      image: "/images/cardimg2.jpg",
      buttonText1: "Share",
      buttonText2: "Learn More",
    },
    {
      id: 3,
      title: "Hyalunoric Acid 3 Serum",
      description:
        "Hydrates and protects skin barrier,Pulmps and Improves the skin texture,Restores.",
      image: "/images/cardimg3.jpg",
      buttonText1: "Share",
      buttonText2: "Learn More",
    },
    {
      id: 4,
      title: "Peptide Skin booster Serum",
      description:
        "Collagen boosting,Excess sebum and pore care,Brightning,Soothing,Firming .",
      image: "/images/cardimg4.jpg",
      buttonText1: "Share",
      buttonText2: "Learn More",
    },
    {
      id: 5,
      title: "Snail 96 Mucin Power Serum",
      description:
        "Soothe damage skin, Repair dark spots,Improve skin vitality.",
      image: "/images/cardimg5.jpg",
      buttonText1: "Share",
      buttonText2: "Learn More",
    },
    {
      id: 6,
      title: "Glow Deep Sleep Power Serum",
      description:
        "Soothing that helps calm and restore imbalance in the skin caused by harsh environments. .",
      image: "/images/cardimg6.jpg",
      buttonText1: "Share",
      buttonText2: "Learn More",
    },
  ];

  const services = [
    {
      id: 1,
      title: "Facial Treatments",
      description:
        "Revitalize your skin with our professional facial treatments. A deeply moisturizing treatment that replenishes hydration, improves skin texture, and restores a healthy glow. Perfect for dry or dehydrated skin.",
    },
    {
      id: 2,
      title: "Skincare Consultation",
      description:
        "Get personalized skincare advice from our experts.A purifying facial that removes impurities, unclogs pores, and refreshes the skin using deep cleansing and natural detox agents.",
    },
    {
      id: 3,
      title: "Anti-Aging Therapy",
      description:
        "Reduce wrinkles and fine lines with our anti-aging solutions.A rejuvenating facial designed to reduce fine lines, boost collagen production, and restore skin elasticity using advanced anti-aging ingredients.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <Box sx={{ width: "100%", position: "relative", overflow: "hidden" }}>
        <Image
          src={heroSection.image}
          alt={heroSection.name}
          width={1600}
          height={400}
          priority
          style={{ width: "100%", height: "600px", filter: "brightness(70%)" }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            backgroundColor: "rgba(0,0,0,0.6)",
            padding: "20px 30px",
            borderRadius: "10px",
            textAlign: "center",
            boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
          }}
        >
          <Typography variant="h3" fontWeight="bold">
            {heroSection.name}
          </Typography>
          <Typography variant="h6">{heroSection.description}</Typography>
        </Box>
      </Box>
      {/* Testimonial Section */}
      <Container sx={{ backgroundColor: "#f9fbe7", marginTop: "50px" }}>
        <Typography
          variant="h3"
          color="#303f9f"
          fontWeight="bold"
          textAlign="center"
          sx={{ margin: 4 }}
        >
          Testimonials
        </Typography>

        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          sx={{ marginBottom: 5, flexWrap: "wrap", gap: 4 }}
        >
          <Box
            data-aos="fade-up"
            sx={{ flex: "1 1 50%", textAlign: "center", maxWidth: "500px" }}
          >
            <Typography variant="h6" gutterBottom>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
              vero, corrupti minus quia quo eos odio! Eligendi, harum.
              Voluptate, nulla. Quo nobis cumque aspernatur et illum quae,
              voluptates corporis tempore.
            </Typography>
          </Box>
          <Box data-aos="flip-left" sx={{ flex: "1 1 50%", maxWidth: "500px" }}>
            <img
              src={"/images/gridimg2.jpg"}
              alt="testimonial"
              style={{ width: "100%", borderRadius: "10px" }}
            />
          </Box>
        </Box>

        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          sx={{ flexWrap: "wrap", gap: 4 }}
        >
          <Box
            data-aos="flip-right"
            sx={{ flex: "1 1 50%", maxWidth: "500px", marginBottom: 5 }}
          >
            <img
              src={"/images/gridimg1.jpg"}
              alt="testimonial"
              style={{ width: "100%", borderRadius: "10px" }}
            />
          </Box>
          <Box
            data-aos="fade-up"
            sx={{ flex: "1 1 50%", textAlign: "center", maxWidth: "500px" }}
          >
            <Typography variant="h6" gutterBottom>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
              vero, corrupti minus quia quo eos odio! Eligendi, harum.
              Voluptate, nulla. Quo nobis cumque aspernatur et illum quae,
              voluptates corporis tempore.
            </Typography>
          </Box>
        </Box>
      </Container>

      {/* Product Cards */}
      <Container
        sx={{ paddingBottom: 2, marginTop: "50px" }}
      >
        <Typography
          fontSize={50}
          fontWeight="bold"
          color={"#880e4f"}
          textAlign={"center"}
          sx={{ marginTop: 10, marginBottom: 5}}
        >
          Special Skincare Products
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
            marginTop: 4,
            marginBottom: 4,
          }}
        >
          {cardItems.map((cardItem) => (
            <Card
              key={cardItem.id}
              sx={{
                maxWidth: 345,
                borderRadius: "12px",
                transition: "transform 0.3s, box-shadow 0.3s",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.5)",
                  marginBottom: 4,
                },
              }}
            >
              <CardMedia
                sx={{ height: 220, objectFit: "cover" }}
                image={cardItem.image}
                title={cardItem.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" fontWeight="bold">
                  {cardItem.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {cardItem.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center", paddingBottom: 2 }}>
                <Button
                  variant="contained"
                  sx={{
                    background: "#880e4f",
                    color: "#fff",
                    borderRadius: "20px",
                  }}
                >
                  {cardItem.buttonText1}
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    background: "#6a1b9a",
                    color: "#fff",
                    borderRadius: "20px",
                  }}
                >
                  {cardItem.buttonText2}
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Container>

      {/* Cosmetic Items (Grid Layout) */}
      <Container
        sx={{
          background: "linear-gradient(to bottom,rgb(254, 254, 254),rgb(243, 229, 246))",
          padding: 5,
          borderRadius: "20px",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
          marginTop: "50px",
          marginBottom: "40px",
        }}
      >
        <Typography
          variant="h3"
          color="#6a1b9a"
          textAlign="center"
          fontWeight="bold"
          gutterBottom
          sx={{ textShadow: "2px 2px 5px rgba(0,0,0,0.2)" }}
        >
          Premium Cosmetic Items
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {cosmeticImages.map((src, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Box display="flex" justifyContent="center">
                <motion.div
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0px 10px 20px rgba(0,0,0,0.5)",
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  style={{
                    borderRadius: "15px",
                    overflow: "hidden",
                    padding: "5px",
                    background: "white",
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
                  }}
                >
                  <Image
                    src={src}
                    alt={`Cosmetic ${index + 1}`}
                    width={300}
                    height={300}
                    priority
                    style={{
                      borderRadius: "10px",
                      objectFit: "cover",
                      transition: "all 0.3s ease",
                    }}
                  />
                </motion.div>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Our Services Section */}
      <Box sx={{ padding: 5, marginTop: "50px", marginBottom: "40px" }}>
        <Typography
          variant="h3"
          color="#00bcd4"
          textAlign="center"
          fontWeight="bold"
          gutterBottom
          sx={{ textShadow: "2px 2px 5px rgba(0,0,0,0.2)" }}
        >
          Our Services
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Grid container spacing={4} justifyContent="center" maxWidth="1600px">
            {services.map((service) => (
              <Grid item key={service.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: "12px",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.5)",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      p: 4,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      marginBottom="10px"
                      variant="h5"
                      fontWeight="bold"
                      sx={{ textAlign: "center" }}
                    >
                      {service.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {service.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
