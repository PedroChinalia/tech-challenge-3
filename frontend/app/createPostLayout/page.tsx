'use client'

import Navbar from "../components/navbar";
import { Box, TextField, Typography, Button, Snackbar, Alert, AlertColor } from "@mui/material";
import { useAuth } from '../hooks/useAuth';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

const CreatePostLayout: React.FC = () => {
  const router = useRouter();
  const { profile, token, isTeacher, loading } = useAuth();
  const autor = profile?.name;
  const autorId = profile?.id;

  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');

  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: AlertColor }>({
    open: false,
    message: '',
    severity: 'info',
  });

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await axios.post("https://tech-challenge-blog.onrender.com/posts/", {
        title: titulo,
        content: conteudo,
        author: autor,
        user_id: autorId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      setSnackbar({ open: true, message: "Post salvo com sucesso!", severity: 'success' });
      setTitulo('');
      setConteudo('');


    } catch (error) {
      console.error("Erro ao realizar cadastro do post:", error);
      setSnackbar({ open: true, message: "Ops! Erro ao realizar cadastro do post. Tente novamente.", severity: 'error' });
    }
  };

  useEffect(() => {
    if (loading) return;
    if (isTeacher === false) {
      setSnackbar({ open: true, message: "Esta página é somente para professores!", severity: 'error' });
      setTimeout(() => {
        router.push("/");
      }, 1300);
    }
  }, [isTeacher, loading, router]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Typography variant="h6">Carregando...</Typography>
      </div>
    );
  }

  if (isTeacher === false) {
    return (
      <>
        <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Typography variant="h6">Acesso negado. Redirecionando...</Typography>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div>
          <Typography variant="h4" mb={4}>
            Nova postagem
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
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  required
                  fullWidth
                />
              </Box>
              <Box sx={{ marginBottom: 3 }}>
                <TextField
                  id="post-content"
                  label="Conteúdo"
                  multiline
                  rows={4}
                  value={conteudo}
                  onChange={(e) => setConteudo(e.target.value)}
                  required
                  fullWidth
                />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button component={Link} href="/">
                  Voltar
                </Button>
                <Button variant="contained" color="success" type="submit">
                  Criar
                </Button>
              </Box>
            </form>
          </Box>
        </div>
        <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default CreatePostLayout;
