'use client'
import Post from "./components/post";
import Navbar from "./components/navbar";
import { Typography, Box, Button } from "@mui/material";
import { useAuth } from "./hooks/useAuth";
import Link from "next/link";

export default function Home() {
  const testProps = {
    id: 1,
    title: "Test Title",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    author: "Pedro Chinalia",
    date: "09/09/2025"
  };

  const { isAuthenticated, isTeacher } = useAuth();

  return (
    <>
      <Navbar />
      <div className="layout-container">
        <div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Typography variant="h4" mb={4} mt={4}>
              Lista de postagens
            </Typography>
            <Button
              variant="contained"
              color="success"
              component={Link}
              href="/createPostLayout"
              disabled={!isTeacher}
            >
              Criar Postagem
            </Button>
          </Box>
          <Post
            id={testProps.id}
            title={testProps.title}
            content={testProps.content}
            author={testProps.author}
            date={testProps.date}
          />
          <Post
            id={testProps.id}
            title={testProps.title}
            content={testProps.content}
            author={testProps.author}
            date={testProps.date}
          />
        </div>
      </div>
    </>
  );
}
