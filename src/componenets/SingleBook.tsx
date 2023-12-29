import React from "react";
import { Book } from "../App";
import { KeyedMutator, mutate } from "swr";
import { ENDPOINT } from "../App";
import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface Props {
  book: Book;
  mutate: KeyedMutator<Book[]>;
}

const SingleBook = ({ book, mutate }: Props) => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [publisher, setPublisher] = useState("");
  const [open, setOpen] = useState(false);

  function handleDelete(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    async function deleteBook(id: string) {
      const updated = await fetch(`${ENDPOINT}/delete_book/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      }).then((res) => res.json());
      mutate(updated);
    }
    deleteBook(book.id);
  }

  interface props {
    author: string;
    title: string;
    publisher: string;
  }
  async function editBook(values: props, id: string) {
    console.log("PARAMS");
    console.log(values);
    console.log(id);
    const updated = await fetch(`${ENDPOINT}/edit_book/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((res) => {
      return res.json();
    });
    mutate(updated);
  }
  function handleEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("HANDLING YOUR EDIT");

    editBook(
      {
        author: author,
        title: title,
        publisher: publisher,
      },
      book.id
    );
    setTitle("");
    setAuthor("");
    setPublisher("");
  }

  return (
    <>
      <br />
      <div className="book">
        {/* <div className="book-card">
          <h2>{book.title}</h2>
          <p>
            <strong>Author :</strong> {book.author}
          </p>
          <form onSubmit={(e) => handleDelete(e)}>
            <button>Delete</button>
          </form>
        <Box sx={{ minWidth: 275 }}>
      </div> */}

        <Box sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 24 }}
              color="white"
              gutterBottom
              variant="h2"
            >
              {book.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="white">
              Author: {book.author}
            </Typography>
            <Typography variant="body2">Publisher: {book.publisher}</Typography>
          </CardContent>
          <form onSubmit={handleDelete}>
            <Button type="submit">Delete</Button>
          </form>
        </Box>

        {open && (
          <form onSubmit={handleEdit} className="form-Addbook">
            <Stack>
              <TextField
                label="Title"
                variant="outlined"
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                label="Author"
                variant="outlined"
                margin="normal"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
              <TextField
                label="Publisher"
                variant="outlined"
                margin="normal"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
              />

              <Button
                className="form-button"
                variant="contained"
                color="primary"
                type="submit"
              >
                Submit
              </Button>
            </Stack>
          </form>
        )}

        <Button sx={{ height: "35px" }} onClick={() => setOpen(!open)}>
          Edit
        </Button>
      </div>

      <br />
    </>
  );
};

export default SingleBook;
