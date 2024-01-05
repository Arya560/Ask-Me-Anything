import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import { useAuth } from "../context/AuthContext";
//import { Link } from "react-router-dom";
import Logo from "./shared/Logo";
import NavigationLink from "./shared/NavigationLink";

// const NavigationLink = ({
//   to,
//   bg,
//   text,
//   textColor,
// }: {
//   to: string;
//   bg: string;
//   text: string;
//   textColor: string;
// }) => {
//   return (
//     <Link
//       className="navlink"
//       to={to}
//       style={{ background: bg, color: textColor }}
//     >
//       {text}
//     </Link>
//   );
// };

const Header = () => {
  const authData = useAuth();

  return (
    <AppBar
      sx={{
        bgcolor: "transparent",
        position: "flex",
        boxShadow: "none",
        marginTop: "10px",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
        }}
      >
        <Logo />
        <div>
          {authData?.isLoggedIn ? (
            <>
              <NavigationLink
                bg="#6f00ff" //"#5a4fcf" //"#7b68ee" //"#00fffc"
                to="/chat"
                text="Go To Chat"
                textColor="white"
              />
              <NavigationLink
                bg="#51538f" //"#ffa07a" //"#51538f"
                to="/"
                text="Logout"
                textColor="white"
                onClick={authData.logout}
              />
            </>
          ) : (
            <>
              <NavigationLink
                bg="#6f00ff"
                to="/login"
                text="login"
                textColor="white"
              />
              <NavigationLink
                bg="#00fffc"
                to="/signup"
                text="signup"
                textColor="black"
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
