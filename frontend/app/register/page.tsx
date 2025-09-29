"use client";
import {
  Typography,
  TextField,
  Box,
  Button,
  FormControlLabel,
  Switch,
  Snackbar,
  Alert,
  AlertColor
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Register: React.FC = () => {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isProfessor, setIsProfessor] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    if (password !== confirmPassword) {
      setSnackbar({ open: true, message: "As senhas não coincidem!", severity: "error" });
      return;
    }
    try {
      setIsLoading(true);

      await axios.post("https://tech-challenge-blog.onrender.com/auth/signup", {
        name,
        email,
        password,
        isProfessor
      });
      setSnackbar({ open: true, message: "Cadastro realizado com sucesso!", severity: "success" });
      setIsLoading(false);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      console.error("Erro no cadastro:", error);
      setSnackbar({
        open: true,
        message: "Erro ao cadastrar. Verifique os dados e tente novamente.",
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
              Cadastro
            </Typography>
            <Box mb={2}>
              <TextField
                label="Nome"
                variant="outlined"
                type="text"
                required
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="E-mail"
                variant="outlined"
                type="email"
                required
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Senha"
                variant="outlined"
                type="password"
                required
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Confirmar Senha"
                variant="outlined"
                type="password"
                required
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Box>
            <Box mb={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={isProfessor}
                    onChange={() => setIsProfessor((prevState) => !prevState)}
                  />
                }
                label="Sou Professor"
              />
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between" gap={2}>
              <Button variant="contained" component={Link} href="/login">
                Voltar
              </Button>
              <Button variant="contained" color="success" type="submit" loading={isLoading}>
                Cadastrar
              </Button>
            </Box>
          </form>
        </Box>
      </div>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Register;
