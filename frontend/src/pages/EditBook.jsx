import { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import { useParams, useNavigate } from "react-router-dom";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({});
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState(null);

  useEffect(() => {
    // Fetch the existing book data to populate the form
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:5555/books/${id}`);
        const bookData = await response.json(); // parse the JSON response
        setBook(bookData);
        setTitle(bookData.title);
        setAuthor(bookData.author);
        setPublishYear(bookData.publishYear);
      } catch (err) {
        console.error("Error fetching book data:", err);
      }
    };

    fetchBook();
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const updatedBook = {
        title,
        author,
        publishYear,
      };

      const response = await fetch(`http://localhost:5555/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBook), // fixed typo
      });

      if (response) {
        alert("Book Updated Successfully!");
        navigate("/");
      } else {
        alert("Error updating book");
      }
    } catch (err) {
      console.error("Error updating book:", err);
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      <form
        className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4"
        onSubmit={handleSave}
      >
        <div className="my-4">
          <label className="text-xl mr-4 text-grey-500">Title</label>
          <input
            type="text"
            value={title}
            className="border rounded-md px-2 py-1"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-grey-500">Author</label>
          <input
            type="text"
            value={author}
            className="border rounded-md px-2 py-1"
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-grey-500">Publish Year</label>
          <input
            type="number"
            value={publishYear}
            className="border rounded-md px-2 py-1"
            onChange={(e) => setPublishYear(Number(e.target.value))}
          />
        </div>
        <div className="my-4 flex justify-end">
          <button
            onClick={() => handleSave}
            type="submit"
            className="bg-sky-800 text-white px-4 py-2 rounded-lg"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBook;
