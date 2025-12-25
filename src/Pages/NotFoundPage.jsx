import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl mt-4 text-gray-600">
        Oops! Page not found
      </p>
      <p className="text-gray-500 mt-2">
        The page you are looking for doesn’t exist.
      </p>

      <button
        onClick={() => navigate("/login")}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go to Login
      </button>
    </div>
  );
};

export default NotFoundPage;
