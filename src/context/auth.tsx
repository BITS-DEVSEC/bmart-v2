import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";
import { notifications } from "@mantine/notifications";
import { getCookie, deleteCookie } from "@/utils/cookieManager";

interface AuthContextProps {
  user: { phone: string } | null;
  role: string | null | undefined;
  token: string | null;
  login: (
    phone: string,
    password: string,
    triggeredRoute?: string
  ) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  isTestAuth: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ phone: string } | null>(null);
  const [role, setRole] = useState<string | undefined | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isTestAuth, setIsTestAuth] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      try {
        const storedToken = await getCookie({ key: "token" });

        if (storedToken) {
          const decoded: { user: { phone: string }; role: string } = jwtDecode(
            storedToken?.value
          );

          setToken(storedToken?.value);
          setUser(decoded?.user as { phone: string } | null);
          setRole(decoded?.role);
        }
      } catch (error) {
        console.error("Failed to load authentication data:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fakeLogin = async () => {
    setIsTestAuth(true);
    notifications.show({
      title: "Succesful Login",
      message: "You have succesfully logged in to your BMART account",
      color: "green",
    });
  };

  const login = async (
    phone: string,
    password: string,
    triggeredRoute?: string
  ) => {
    console.log(phone);
    console.log(password);
    setLoading(true);
    await fakeLogin();
    setLoading(false);
    if (triggeredRoute) router.push(triggeredRoute);
    else router.push("/");
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setRole(null);
    setIsTestAuth(false);
    deleteCookie({ key: "token" });
    deleteCookie({ key: "user" });
    deleteCookie({ key: "role" });
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        token,
        login,
        logout,
        isAuthenticated: !!token,
        loading,
        setLoading,
        isTestAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
