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
import { getCookie, deleteCookie, setCookie } from "@/utils/cookieManager";
import { useLoginMutation } from "@/redux/api/auth";

interface User {
  id?: string | number;
  phone: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  phone_number: string;
  date_of_birth: string;
  gender: string;
  nationality: string;
  created_at?: string;
  kyc_status?: string;
  fayda_id?: string;
}
interface AuthContextProps {
  user: User | null;
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
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | undefined | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isTestAuth, setIsTestAuth] = useState<boolean>(false);
  const router = useRouter();
  const [loginn] = useLoginMutation();

  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      try {
        const storedToken = await getCookie({ key: "token" });

        if (storedToken) {
          const decoded: { user: User; role: string } = jwtDecode(
            storedToken?.value
          );

          setToken(storedToken?.value);
          setUser(decoded?.user as User | null);
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

  const login = async (
    phone: string,
    password: string,
    triggeredRoute?: string
  ) => {
    setLoading(true);
    const res = await loginn({ data: { phone_number: phone, password } });
    if (res?.data) {
      setToken(res?.data?.token);
      setUser(res?.data?.user);
      setCookie({ key: "token", value: res?.data?.token });
      setCookie({ key: "user", value: JSON.stringify(res?.data?.user) });
      if (triggeredRoute) router.push(triggeredRoute);
      else router.push("/");
    } else {
      notifications.show({
        title: "Unable to login",
        message: "Invalid credentials",
        color: "red",
      });
    }
    setLoading(false);
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
