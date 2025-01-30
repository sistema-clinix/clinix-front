
import Link from "next/link";
import {
  CardContent,
  Typography,
  Grid,
  Rating,
  Tooltip,
  Fab,
  Avatar
} from "@mui/material";
// import img1 from "public/images/products/s4.jpg";
// import img2 from "public/images/products/s5.jpg";
// import img3 from "public/images/products/s7.jpg";
// import img4 from "public/images/products/s11.jpg";
import { Stack } from "@mui/system";
import { IconBasket } from "@tabler/icons-react";
import BlankCard from "@/app/(DashboardLayout)/components/shared/BlankCard";
import Image from "next/image";
import DashboardCard from "../shared/DashboardCard";

const ecoCard = [
  {
    title: "VitaCare Clínica Médica",
    subheader: "September 14, 2023",
    photo: '/images/products/clinica1.jpg',
    // salesPrice: "1.3Kms",
    price: "1.3KMs",
    rating: 4,
  },
  {
    title: "Salus Saúde Integral",
    subheader: "September 14, 2023",
    photo: '/images/products/clinica2.jpg',
    // salesPrice: 650,
    price: "8.1KMs",
    rating: 5,
  },
  {
    title: "MedPrime Centro Clínico",
    subheader: "September 14, 2023",
    photo: '/images/products/clinica3.jpg',
    // salesPrice: 150,
    price: "12.9KMs",
    rating: 4,
  },
  {
    title: "CliniVida Especialidades",
    subheader: "September 14, 2023",
    photo: '/images/products/clinica4.jpg',
    // salesPrice: 285,
    price: "30.1KMs",
    rating: 5,
  },
];

const Blog = () => {
  return (
    <DashboardCard title="Clínicas mais próximas">
    <Grid container spacing={3}>
      {ecoCard.map((product, index) => (
        <Grid item xs={12} md={4} lg={3} key={index}>
          <BlankCard>
            <Typography component={Link} href="/">
              <Avatar
                src={product.photo} variant="square"
                sx={{
                  height: 250,
                  width: '100%',
                }}
                
              />
            </Typography>
            <Tooltip title="Agendar">
              <Fab
                size="small"
                color="primary"
                sx={{ bottom: "75px", right: "15px", position: "absolute" }}
              >
                <IconBasket size="16" />
              </Fab>
            </Tooltip>
            <CardContent sx={{ p: 3, pt: 2 }}>
              <Typography variant="h6">{product.title}</Typography>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mt={1}
              >
                <Stack direction="row" alignItems="center">
                  <Typography variant="h6">{product.price}</Typography>
                  <Typography
                    color="textSecondary"
                    ml={1}
                    sx={{ textDecoration: "line-through" }}
                  >
                    {/* {product.salesPrice} */}
                  </Typography>
                </Stack>
                <Rating
                  name="read-only"
                  size="small"
                  value={product.rating}
                  readOnly
                />
              </Stack>
            </CardContent>
          </BlankCard>
        </Grid>
      ))}
    </Grid>
    </DashboardCard>
  );
};

export default Blog;
