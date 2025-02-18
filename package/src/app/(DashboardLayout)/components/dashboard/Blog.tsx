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
import { Stack } from "@mui/system";
import { IconClock } from "@tabler/icons-react";
import BlankCard from "@/app/(DashboardLayout)/components/shared/BlankCard";
import DashboardCard from "../shared/DashboardCard";

const ecoCard = [
  {
    title: "VitaCare Clínica Médica",
    subheader: "September 14, 2023",
    photo: '/images/products/clinica1.jpg',
    price: "1.3KMs",
    rating: 4,
  },
  {
    title: "Salus Saúde Integral",
    subheader: "September 14, 2023",
    photo: '/images/products/clinica2.jpg',
    price: "8.1KMs",
    rating: 5,
  },
  {
    title: "MedPrime Centro Clínico",
    subheader: "September 14, 2023",
    photo: '/images/products/clinica3.jpg',
    price: "12.9KMs",
    rating: 4,
  },
  {
    title: "CliniVida Especialidades",
    subheader: "September 14, 2023",
    photo: '/images/products/clinica4.jpg',
    price: "30.1KMs",
    rating: 5,
  },
];

const NearbyClinics = () => {
  return (
    <DashboardCard title="Clínicas mais próximas">
      <Grid container spacing={3}>
        {ecoCard.map((product, index) => (
          <Grid item xs={12} md={4} lg={3} key={index}>
            <BlankCard>
              <Typography component={Link} href="/">
                <Avatar
                  src={product.photo}
                  variant="square"
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
                  aria-label="Agendar"
                >
                  <IconClock size="16" />
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

export default NearbyClinics;