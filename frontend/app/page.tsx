'use client'
import Post from "./components/post";
import Navbar from "./components/navbar";
import { Typography, Box, Button } from "@mui/material";
import { useAuth } from "./hooks/useAuth";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

interface PostData {
  id: number;
  title: string;
  content: string;
  author: string;
  created_at: string;
}

export default function Home() {
  const [data, setData] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);

  const handleGetPosts = async () => {
    try {
      const res = await axios.get("https://tech-challenge-blog.onrender.com/posts/");
      setData(res.data);
    } catch (error) {
      console.error("Erro ao buscar os posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetPosts();
  }, []);

  const { isTeacher } = useAuth();

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
          <div>
            {loading ? (
              <Typography>Carregando posts...</Typography>
            ) : data.length > 0 ? (
              data.map((card) => (
                <Post
                  key={card.id}
                  id={card.id}
                  title={card.title}
                  content={card.content}
                  author={card.author}
                  date={card.created_at.split('T')[0]} />
              ))
            ) : (
              <Typography>Nenhum post encontrado.</Typography>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
