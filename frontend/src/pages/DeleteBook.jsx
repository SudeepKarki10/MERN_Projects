import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import { HiArchiveBoxXMark } from "react-icons/hi2";

const DeleteBook = () => {
  const [book, setBook] = useState({});
  const { id } = useParams();
  const navigate = useNavigate(); // Add this line to get the navigate function

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:5555/books/${id}`);
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBook();
  }, [id]);
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5555/books/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // Check if response status is 200-299
        alert("Book deleted successfully");
        navigate("/"); // Navigate to the home page after successful deletion
      } else {
        alert("Error while deleting book");
      }
    } catch (error) {
      alert(error);
    }
  };

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
          <div className="flex justify-center align-center fs-xl">
            <button type="submit" onClick={handleDelete}>
              <HiArchiveBoxXMark style={{ width: "40px", height: "40px" }} />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex ">Book details Loading.....</div>
      )}
    </div>
  );
};

export default DeleteBook;
