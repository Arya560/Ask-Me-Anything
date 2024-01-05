import {
  createContext,
  useEffect,
  ReactNode,
  useState,
  useContext,
} from "react";
import {
  checkAuthStatus,
  loginUser,
  logoutUser,
  signupUser,
} from "../helpers/api-communicator";

type User = {
  name: string;
  email: string;
};
type UserAuth = {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};
const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] =
    useState<boolean>(false);
  useEffect(() => {
    //fetch if the cookie is valid or not and set the user logged in to true
    async function checkStatus() {
      const data = await checkAuthStatus();
      if (data) {
        setUser({ email: data.email, name: data.name });
        setIsLoggedIn(true);
      }
    }
    checkStatus();
  }, []);

  const login = async (email: string, password: string) => {
    const data = await loginUser(email, password);
    if (data) {
      setUser({ email: data.email, name: data.name });
      setIsLoggedIn(true);
    }
  };
  const signup = async (
    name: string,
    email: string,
    password: string
  ) => {
    const data = await signupUser(name, email, password);
    if (data) {
      setUser({ email: data.email, name: data.name });
      setIsLoggedIn(true);
    }
  };
  const logout = async () => {
    await logoutUser();
    setIsLoggedIn(false);
    setUser(null);
    window.location.reload();
  };

  const value = {
    user,
    login,
    logout,
    isLoggedIn,
    signup,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
