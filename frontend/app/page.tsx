"use client";
import Post from "./components/post";
import Navbar from "./components/navbar";
import { Typography, Box, Button, Snackbar, Alert, AlertColor } from "@mui/material";
import { useAuth } from "./hooks/useAuth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

interface PostData {
  id: number;
  title: string;
  content: string;
  author: string;
  created_at: string;
}

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({
    open: false,
    message: "",
    severity: "info"
  });

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const handleGetPosts = async () => {
    try {
      const res = await axios.get("https://tech-challenge-blog.onrender.com/posts/");
      setData(res.data);
    } catch (error) {
      console.error("Erro ao buscar os posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetPosts();
  }, []);

  const { isTeacher, isAuthenticated } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (isAuthenticated === false) {
      setSnackbar({ open: true, message: "Você precisa fazer login!", severity: "error" });
      setTimeout(() => {
        router.push("/login");
      }, 1300);
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Typography variant="h6">Carregando...</Typography>
      </div>
    );
  }

  if (isAuthenticated === false) {
    return (
      <>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <Typography variant="h6">Acesso negado. Redirecionando...</Typography>
        </div>
      </>
    );
  }

  const width = data.length ? "auto" : { md: "40vw" };

  return (
    <>
      <Navbar />
      <div className="layout-container">
        <div>
          <Box
            sx={{
              display: { md: "flex", sm: "block" },
              justifyContent: "space-between",
              alignItems: "center",
              width: width
            }}
          >
            <Typography variant="h4" mb={4} mt={4}>
              Lista de postagens
            </Typography>
            {!isTeacher ? null : (
              <Button variant="contained" color="success" component={Link} href="/createPostLayout">
                Criar Postagem
              </Button>
            )}
          </Box>
          <div>
            {loading ? (
              <Typography>Carregando posts...</Typography>
            ) : data.length > 0 ? (
              data.map((card) => (
                <Post
                  key={card.id}
                  id={card.id}
                  title={card.title}
                  content={card.content}
                  author={card.author}
                  date={card.created_at.split("T")[0]}
                />
              ))
            ) : (
              <Typography mt={2}>Nenhum post encontrado.</Typography>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
