import { Typography, TextField, Box, Button } from "@mui/material";
import Link from "next/link";

const Login: React.FC = () => {
  return (
    <div className="container">
      <div>
        <Typography variant="h4" mb={4}>
          Blog Escolar
        </Typography>
        <Box sx={{ backgroundColor: "#fff", p: 3, borderRadius: 2, boxShadow: 3, width: "25vw" }}>
          <form>
            <Typography variant="h5" mb={2}>
              Login
            </Typography>
            <Box mb={2}>
              <TextField label="E-mail" variant="outlined" type="email" required fullWidth />
            </Box>
            <Box mb={2}>
              <TextField label="Senha" variant="outlined" type="password" required fullWidth />
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between" gap={2}>
              <Button variant="contained" type="submit">
                Entrar
              </Button>
              <Button variant="contained" color="success" component={Link} href="/register">
                Cadastre-se
              </Button>
            </Box>
          </form>
        </Box>
      </div>
    </div>
  );
};

export default Login;
