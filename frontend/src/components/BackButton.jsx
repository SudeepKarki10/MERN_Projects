import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const BackButton = () => {
  return (
    <div className="flex">
      <Link
        to="/"
        className="bg-sky-800 text-white px-4 py-1 rounded-lg w-fit "
      >
        <BsArrowLeft className="mr-2" />
      </Link>
    </div>
  );
};

export default BackButton;
