"use client";

import { Typography, TextField, Box, Button, Snackbar, Alert, AlertColor } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import Link from "next/link";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { fetchProfile } = useAuth();

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
      setIsLoading(true);

      const { data } = await axios.post("https://tech-challenge-blog.onrender.com/auth/login", {
        email,
        password
      });

      const token = data.session.access_token;
      localStorage.setItem("token", token);

      await fetchProfile(token);

      setIsLoading(false);
      router.push("/");
    } catch (error) {
      setIsLoading(false);
      console.error("Erro no login:", error);
      setSnackbar({
        open: true,
        message: "Erro ao realizar login. Verifique os dados e tente novamente.",
        severity: "error"
      });
    }
  };

  return (
    <div className="container">
      <div>
        <Typography variant="h4" mb={4}>
          Blog Escolar
        </Typography>
        <Box
          sx={{
            backgroundColor: "#fff",
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
            width: { md: "25vw", sm: "60vw" }
          }}
        >
          <form onSubmit={handleSubmit}>
            <Typography variant="h5" mb={2}>
              Login
            </Typography>
            <Box mb={2}>
              <TextField
                label="E-mail"
                variant="outlined"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Senha"
                variant="outlined"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
              />
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between" gap={2}>
              <Button variant="contained" type="submit" loading={isLoading}>
                Entrar
              </Button>
              <Button variant="contained" color="success" component={Link} href="/register">
                Cadastre-se
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

export default Login;
