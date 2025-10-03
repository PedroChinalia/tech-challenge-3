"use client";

import Navbar from "../components/navbar";
import { Box, TextField, Typography, Button, Snackbar, Alert, AlertColor } from "@mui/material";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

const EditForm: React.FC = () => {
  const searchParams = useSearchParams();
  const { profile, token, isTeacher } = useAuth();
  const autor = profile?.name;
  const autorId = profile?.id;

  const id = searchParams.get("id");
  const initialTitle = searchParams.get("title") || "";
  const initialContent = searchParams.get("content") || "";

  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await axios.put(
        `https://tech-challenge-blog.onrender.com/posts/${id}`,
        {
          title: title,
          content: content,
          author: autor
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setSnackbar({ open: true, message: "Post atualizado com sucesso!", severity: "success" });
    } catch (error) {
      console.error("Erro ao realizar atualização do post:", error);
      setSnackbar({
        open: true,
        message: "Ops! Erro ao atualizar o post. Tente novamente.",
        severity: "error"
      });
    }
  };

  return (
    <div className="container">
      <div>
        <Typography variant="h4" mb={4}>
          Editar postagem {id}
        </Typography>
        <Box
          sx={{
            backgroundColor: "#fff",
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
            width: "50vw"
          }}
        >
          <form onSubmit={handleSubmit}>
            <Box sx={{ marginBottom: 2 }}>
              <TextField
                id="post-title"
                label="Título"
                variant="outlined"
                type="text"
                required
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Box>
            <Box sx={{ marginBottom: 3 }}>
              <TextField
                id="post-content"
                label="Conteúdo"
                multiline
                rows={4}
                required
                fullWidth
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button component={Link} href="/">
                Voltar
              </Button>
              <Button variant="contained" color="success" type="submit">
                Editar
              </Button>
            </Box>
          </form>
        </Box>
      </div>
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
    </div>
  );
};

const EditPostLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <div>
          <Typography
            variant={"h4"}
            sx={(theme) => ({
              [theme.breakpoints.down("sm")]: {
                fontSize: theme.typography.h5.fontSize
              }
            })}
            mb={5}
            mt={5}
          >
            Editar postagem {id}
          </Typography>
          <Box
            sx={{
              backgroundColor: "#fff",
              p: 3,
              borderRadius: 2,
              boxShadow: 3,
              width: { md: "50vw", sm: "70" }
            }}
          >
            <form onSubmit={handleSubmit}>
              <Box sx={{ marginBottom: 2 }}>
                <TextField
                  id="post-title"
                  label="Título"
                  variant="outlined"
                  type="text"
                  required
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Box>
              <Box sx={{ marginBottom: 3 }}>
                <TextField
                  id="post-content"
                  label="Conteúdo"
                  multiline
                  rows={4}
                  required
                  fullWidth
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button component={Link} href="/">
                  Voltar
                </Button>
                <Button variant="contained" color="success" type="submit">
                  Editar
                </Button>
              </Box>
            </form>
          </Box>
        </div>
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
      </div>
      <Suspense fallback={<div>Carregando...</div>}>
        <EditForm />
      </Suspense>
    </>
  );
};

export default EditPostLayout;
