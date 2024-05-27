import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:5555/books/${id}`);
        const data = await response.json();
        setBook(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBook();
  }, [id]);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show Book</h1>
      {book.title ? (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-grey-500">Id</span>
            <span>{book._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-grey-500">Title</span>
            <span>{book.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-grey-500">Author</span>
            <span>{book.author}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-grey-500">Publish Year</span>
            <span>{book.publishYear}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-grey-500">Create Time</span>
            <span>{new Date(book.createdAt).toLocaleString()}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-grey-500">Last Update Time</span>
            <span>{new Date(book.updatedAt).toLocaleString()}</span>
          </div>
        </div>
      ) : (
        <div className="flex ">Book details Loading.....</div>
      )}
    </div>
  );
};

export default ShowBook;
