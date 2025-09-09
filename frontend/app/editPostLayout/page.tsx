"use client";

import Navbar from "../components/navbar";
import { Box, TextField, Typography, Button } from "@mui/material";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const EditPostLayout: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return (
    <>
      <Navbar />
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
                  Editar
                </Button>
              </Box>
            </form>
          </Box>
        </div>
      </div>
    </>
  );
};

export default EditPostLayout;
