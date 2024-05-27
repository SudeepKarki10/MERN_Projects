import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

const CreateBook = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5555/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          author,
          publishYear: parseInt(publishYear), // Convert to number if needed
        }),
      });
      if (response.ok) {
        alert("Book added successfully");
        navigate("/"); // Navigate to the home page after successful addition
      } else {
        alert("Error while adding book");
      }
    } catch (error) {
      alert("Error while adding book:", error);
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Add Book</h1>
      <form
        className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4"
        onSubmit={handleSubmit}
      >
        <div className="my-4">
          <label className="text-xl mr-4 text-grey-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded-md px-2 py-1"
            required
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-grey-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border rounded-md px-2 py-1"
            required
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-grey-500">Publish Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border rounded-md px-2 py-1"
            required
          />
        </div>
        <div className="my-4 flex justify-end">
          <button
            type="submit"
            className="bg-sky-800 text-white px-4 py-2 rounded-lg"
          >
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBook;
