import { useEffect, useState } from "react";
import useStockCall from "../hooks/useStockCall";
import Typography from "@mui/material/Typography";
import { Button, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import BrandCard from "../components/BrandCard";
import BrandModal from "../components/modals/BrandModal";
import { flex } from "../styles/globalStyle";
import loadingGif from "../assets/loading.gif";

const Brands = () => {
  const { getStockData } = useStockCall();
  const { brands, loading } = useSelector(state => state.stock);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setInfo({
      name: "",
      image: "",
    });
    //* handleClose olduğunda yani modal kapnadığında formdaki verilerin temizlenmesi için burada tanımladık.
  };
  const [info, setInfo] = useState({
    name: "",
    image: "",
  });

  useEffect(() => {
    getStockData("brands");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Typography variant="h4" color="error" mb={3}>
        Brands
      </Typography>
      <Button variant="contained" onClick={() => setOpen(true)}>
        New Brand
      </Button>
      <BrandModal
        open={open}
        handleClose={handleClose}
        info={info}
        setInfo={setInfo}
      />
      <Grid container sx={flex}>
        {loading ? (
          <img src={loadingGif} alt="loading..." height={500} />
        ) : (
          brands?.map(brand => (
            <Grid item key={brand.id}>
              <BrandCard
                brand={brand}
                handleOpen={handleOpen}
                setInfo={setInfo}
              />
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
};

export default Brands;
