"use client";

import { Card, IconButton, CardContent, Typography, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Link from "next/link";
import { useState } from "react";
import CustomDialog from "./dialog";
import { useAuth } from "../hooks/useAuth";

type PostProps = {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
};

const Post: React.FC<PostProps> = (props) => {
  const { id, title, content, date, author } = props;

  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
  const dialogContent = "Deseja mesmo excluir esta postagem? Esta ação não pode ser desfeita!";

  const handleOpenDialog = () => setDialogIsOpen(true);
  const handleCloseDialog = () => setDialogIsOpen(false);

  const { isTeacher } = useAuth();

  return (
    <Card sx={{ marginTop: 2, marginBottom: 2, width: "50vw", padding: 2 }}>
      <CardContent>
        {/* Card header */}
        <Box sx={{ display: isTeacher ? "flex" : "none", justifyContent: "space-between", marginBottom: 2 }}>
          <Typography variant="h6">{title}</Typography>
          <Box>
            <IconButton
              aria-label="see-post"
              component={Link}
              href={{ pathname: "/targetPostLayout", query: { id } }}
            >
              <VisibilityIcon titleAccess="Ver postagem" />
            </IconButton>
            <IconButton
              aria-label="edit-post"
              component={Link}
              href={{ pathname: "/editPostLayout", query: { id } }}
            >
              <EditIcon titleAccess="Editar postagem" />
            </IconButton>
            <IconButton aria-label="delete-post" onClick={handleOpenDialog}>
              <DeleteIcon titleAccess="Excluir postagem" />
            </IconButton>
          </Box>
        </Box>
        {/* Card body */}
        <Typography mb={2}>{content}</Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>
            <strong>Autor:</strong> {author}
          </Typography>
          <Typography>
            <strong>Data de criação:</strong> {date}
          </Typography>
        </Box>
      </CardContent>
      <CustomDialog
        open={dialogIsOpen}
        onClose={handleCloseDialog}
        dialogContent={dialogContent}
      ></CustomDialog>
    </Card>
  );
};

export default Post;
