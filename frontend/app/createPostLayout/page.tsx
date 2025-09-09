import Navbar from "../components/navbar";
import { Box, TextField, Typography, Button } from "@mui/material";
import Link from "next/link";

const CreatePostLayout: React.FC = () => {
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
            <form>
              <Box sx={{ marginBottom: 2 }}>
                <TextField
                  id="post-title"
                  label="Título"
                  variant="outlined"
                  type="text"
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
      </div>
    </>
  );
};

export default CreatePostLayout;
