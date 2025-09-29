"use client";

import { useSearchParams } from "next/navigation";
import Navbar from "../components/navbar";
import { Card, IconButton, CardContent, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";

const TargetPostLayout: React.FC = () => {
  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  const title = searchParams.get("title") || "";
  const content = searchParams.get("content") || "";
  const author = searchParams.get("author") || "";
  const date = searchParams.get("date") || "";

  return (
    <>
      <Navbar />
      <div className="layout-container">
        <div>
          <Typography
            variant={"h4"}
            sx={(theme) => ({
              [theme.breakpoints.down("sm")]: {
                fontSize: theme.typography.h6.fontSize
              }
            })}
            mb={5}
            mt={5}
          >
            Detalhes da postagem {id}
          </Typography>
          <Card
            sx={{ marginTop: 2, marginBottom: 2, width: { md: "50vw", sm: "70vw" }, padding: 2 }}
          >
            <CardContent>
              {/* Card header */}
              <IconButton aria-label="go-back" component={Link} href="/">
                <ArrowBackIcon titleAccess="Voltar" />
              </IconButton>
              <Typography variant="h6" mb={2} mt={2}>
                {title}
              </Typography>
              {/* Card body */}
              <Typography mb={2}>{content}</Typography>
              <Typography mb={1}>
                <strong>Autor:</strong> {author}
              </Typography>
              <Typography mb={1}>
                <strong>Data de criação:</strong> {date}
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default TargetPostLayout;
