"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Navbar from "../components/navbar";
import { Card, IconButton, CardContent, Typography, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";

const PostContent: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const title = searchParams.get("title") || "";
  const content = searchParams.get("content") || "";
  const author = searchParams.get("author") || "";
  const date = searchParams.get("date") || "";

  return (
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
              {title}
            </Typography>
            {/* Card body */}
            <Typography mb={2}>
              {content}
            </Typography>
            <Typography mb={1}>
              <strong>Autor:</strong> {author}
            </Typography>
            <Typography mb={1}>
              <strong>Data de criação:</strong> {date}
            </Typography>
            {/* <Typography mb={1}>
              <strong>Última atualização:</strong> 07/09/2025
            </Typography> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const TargetPostLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div>Carregando...</div>}>
        <PostContent />
      </Suspense>
    </>
  );
};

export default TargetPostLayout;
