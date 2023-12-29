import React from "react";
import { useState } from "react";
import { KeyedMutator } from "swr";
import { Book } from "../App";
import { ENDPOINT } from "../App";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import "../App.css";

interface Props {
  mutate: KeyedMutator<Book[]>;
}

const AddBook = ({ mutate }: Props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    async function createBook(values: {
      title: string;
      author: string;
      publisher: string;
    }) {
      const updated = await fetch(`${ENDPOINT}/create_books`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((r) => r.json());

      mutate(updated);
      setTitle("");
      setAuthor("");
      setPublisher("");
    }
    createBook({ title: title, author: author, publisher: publisher });
  }
  return (
    <form onSubmit={handleSubmit} className="form-Addbook">
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
  );
};

export default AddBook;
