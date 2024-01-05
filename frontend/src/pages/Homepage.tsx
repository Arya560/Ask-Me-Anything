import {
  useTheme,
  Box,
  useMediaQuery,
} from "@mui/material";
import TypingAnim from "../components/typer/TypingAnim";
import Footer from "../components/footer/Footer";

const Homepage = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(
    theme.breakpoints.down("md")
  );
  return (
    <Box width={"100%"} height={"100%"}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          mt: 3,
        }}
      >
        <Box>
          <TypingAnim />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: {
              md: "row",
              xs: "column",
              sm: "column",
            },
            gap: 5,
            my: 10,
          }}
        >
          <img
            src="homePage.png"
            alt="robo"
            style={{ width: "200px", margin: "auto" }}
          />
          <img
            className="image-color"
            src="logo.png"
            alt="logo"
            style={{ width: "100px", margin: "auto" }}
          />
        </Box>
        <Box sx={{ display: "flex", mx: "auto" }}>
          <img
            src="chat.png"
            alt="chatpreview"
            style={{
              display: "flex",
              margin: "auto",
              width: isBelowMd ? "80%" : "60%",
              borderRadius: 20,
              boxShadow: "-5px -5px 105px #64f3d5",
              marginTop: 20,
              marginBottom: 20,
              padding: 10,
            }}
          />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Homepage;
