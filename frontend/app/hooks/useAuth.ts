import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    const storedToken = localStorage.getItem("token");

    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }

    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const fetchProfile = async (token: string) => {
    const { data } = await axios.get("https://tech-challenge-blog.onrender.com/auth/me", {
      headers: { Authorization: `Bearer ${token}` }
    });

    localStorage.setItem("profile", JSON.stringify(data));
    setProfile(data);
  };

  const logout = () => {
    localStorage.removeItem("profile");
    localStorage.removeItem("token");
    setProfile(null);
    setToken(null);
    router.push("/login");
  };

  return {
    isAuthenticated: !!profile,
    isTeacher: profile?.is_teacher ?? false,
    profile,
    token,
    loading,
    fetchProfile,
    logout
  };
}
