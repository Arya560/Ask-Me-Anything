import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const Logo = () => {
  return (
    <Box
      sx={{
        display: "flex",
        mr: "auto",
        alignItems: "center",
        gap: "1",
      }}
    >
      <Link to={"/"}>
        <img
          src="logo.png"
          alt="logo"
          width={"50px"}
          height={"50px"}
          className="image-color"
        />
      </Link>
      <Typography
        sx={{
          mr: "auto",
          fontWeight: "800",
          textShadow: "2px 2px 20px #000",
        }}
      >
        <Box
          display={{
            md: "flex",
            sm: "none",
            xs: "none",
          }}
        >
          <span style={{ fontSize: "40px" }}> A</span>
          <span style={{ marginTop: "26px" }}>
            SK-ME -ANYTH
          </span>
          <span style={{ fontSize: "40px" }}>i</span>
          <span style={{ marginTop: "26px" }}>NG</span>
        </Box>
      </Typography>
    </Box>
  );
};

export default Logo;
