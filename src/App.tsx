import React from "react";
import "./App.css";
import useSWR from "swr";
import SingleBook from "./componenets/SingleBook";
import AddBook from "./componenets/AddBook";

export const ENDPOINT = "http://localhost:8080";

export interface Book {
  id: string;
  author: string;
  title: string;
  publisher: string;
}

const fetcher = (url: string) =>
  fetch(`${ENDPOINT}/${url}`).then((r) => r.json());

function App() {
  const { data, mutate } = useSWR<Book[]>("books", fetcher);
  console.log(data);
  console.log("data");
  return (
    <center className="main-box">
      <AddBook mutate={mutate} />
      <ul>
        {data?.map((book: Book) => {
          return <SingleBook book={book} mutate={mutate} />;
        })}
      </ul>
    </center>
  );
}

export default App;
