import { useEffect, useState } from "react";
import axios from "axios";

export function useAuth() {
    const [profile, setProfile] = useState<any>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedProfile = localStorage.getItem("profile");
        const storedToken = localStorage.getItem("token");

        if (storedProfile) {
            setProfile(JSON.parse(storedProfile));
        }

        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const fetchProfile = async (token: string) => {
        const { data } = await axios.get("https://tech-challenge-blog.onrender.com/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
        });

        localStorage.setItem("profile", JSON.stringify(data));
        setProfile(data);
    };

    const logout = () => {
        localStorage.removeItem('profile')
        localStorage.removeItem('token');
        setProfile(null);
        setToken(null);
    };

    return {
        isAuthenticated: !!profile,
        isTeacher: profile?.is_teacher ?? false,
        profile,
        token,
        fetchProfile,
        logout
    };
}



// export default function useAuth() {
//     const [user, setUser] = useState<any>(null);
//     const [token, setToken] = useState<string | null>(null);

//     useEffect(() => {
//         const storedUser = localStorage.getItem('user');
//         const storedToken = localStorage.getItem('token');

//         if (storedUser && storedToken) {
//             setUser(JSON.parse(storedUser));
//             setToken(storedToken)
//         }
//     }, []);

//     const logout = () => {
//         localStorage.removeItem('user')
//         localStorage.removeItem('token');
//         setUser(null);
//         setToken(null);
//     };

//     return {
//         user,
//         token,
//         isAuthenticated: !!token,
//         isProfessor: user?.is_teacher ?? false,
//         logout
//     }
// }
