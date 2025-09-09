"use client";

import { useSearchParams } from "next/navigation";
import Navbar from "../components/navbar";
import { Card, IconButton, CardContent, Typography, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";

const TargetPostLayout: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return (
    <>
      <Navbar />
      <div className="layout-container">
        <div>
          <Typography variant="h4" mb={5} mt={5}>
            Detalhes da postagem
          </Typography>
          <Card sx={{ marginTop: 2, marginBottom: 2, width: "50vw", padding: 2 }}>
            <CardContent>
              {/* Card header */}
              <IconButton aria-label="go-back" component={Link} href="/">
                <ArrowBackIcon titleAccess="Voltar" />
              </IconButton>
              <Typography variant="h6" mb={2} mt={2}>
                Test Title
              </Typography>
              {/* Card body */}
              <Typography mb={2}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen
                book.f
              </Typography>
              <Typography mb={1}>
                <strong>Autor:</strong> Pedro Chinalia
              </Typography>
              <Typography mb={1}>
                <strong>Data de criação:</strong> 07/09/2025
              </Typography>
              <Typography mb={1}>
                <strong>Última atualização:</strong> 07/09/2025
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default TargetPostLayout;
