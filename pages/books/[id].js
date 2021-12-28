import { useContext } from "react";
import { BooksContext } from "../../context/BooksContext";

const BookDetails = () => {
  const val = useContext(BooksContext);
  console.log(val);
  return <div>{val}</div>;
};

export default BookDetails;
