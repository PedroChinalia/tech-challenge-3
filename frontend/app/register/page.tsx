import { Typography, TextField, Box, Button } from "@mui/material";
import Link from "next/link";

const Register: React.FC = () => {
  return (
    <div className="container">
      <div>
        <Typography variant="h4" mb={4}>
          Blog Escolar
        </Typography>
        <Box sx={{ backgroundColor: "#fff", p: 3, borderRadius: 2, boxShadow: 3, width: "25vw" }}>
          <form>
            <Typography variant="h5" mb={2}>
              Cadastro
            </Typography>
            <Box mb={2}>
              <TextField label="Nome" variant="outlined" type="text" required fullWidth />
            </Box>
            <Box mb={2}>
              <TextField label="E-mail" variant="outlined" type="email" required fullWidth />
            </Box>
            <Box mb={2}>
              <TextField label="Senha" variant="outlined" type="password" required fullWidth />
            </Box>
            <Box mb={2}>
              <TextField
                label="Confirmar Senha"
                variant="outlined"
                type="password"
                required
                fullWidth
              />
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between" gap={2}>
              <Button variant="contained" component={Link} href="/login">
                Voltar
              </Button>
              <Button variant="contained" color="success" type="submit">
                Cadastrar
              </Button>
            </Box>
          </form>
        </Box>
      </div>
    </div>
  );
};

export default Register;
