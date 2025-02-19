import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!email) {
      setError("Email address is required.");
      setIsModalOpen(true);
      return;
    }

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((user) => user.contact === email);

    if (user) {
      // Simulate reset link (in a real app, you'd generate a reset token)
      setMessage("A reset link has been sent to your email address.");
    } else {
      setError("No account found with this email address.");
    }

    setIsModalOpen(true); // Open modal after attempting to send a reset link
  };

  const closeModalAndRedirect = () => {
    setIsModalOpen(false);
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="flex items-center justify-center mb-20">
      <div className="w-10/12 md:w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-medium text-gray-800 mb-4">
          Forgot Password
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Enter your email address below to reset your password.
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            className="w-full py-2 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-3 bg-red-600 text-white rounded-md hover:bg-red-400"
          >
            Send Reset Link
          </button>
        </form>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md max-w-sm w-full">
            <h3 className="text-lg font-semibold">
              {message ? "Success" : "Error"}
            </h3>
            <p className="mt-4 text-center">
              {message && <span className="text-green-500">{message}</span>}
              {error && <span className="text-red-500">{error}</span>}
            </p>
            <div className="mt-4 flex justify-center">
              <button
                onClick={closeModalAndRedirect}
                className="py-2 px-4 bg-green-600 text-white rounded-md"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
