import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext"; // Import your AuthContext
import sideImage from "../../assets/images/Side Image.png";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuth(); // Access login function from context
  const navigate = useNavigate();

  const loginSubmit = async (values) => {
    setLoading(true);
    setError(null); // Clear any previous errors

    try {
      let users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        (user) =>
          user.contact === values.contact && user.password === values.password
      );

      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        login(user); // Update the global authentication state
        setLoading(false);
        navigate("/"); // Redirect to home page
      } else {
        setLoading(false);
        setError("Invalid email or password.");
      }
    } catch (err) {
      setLoading(false);
      setError("An error occurred. Please try again.");
    }
  };

  const validationSchema = Yup.object({
    contact: Yup.string()
      .required("Email or phone number is required")
      .test(
        "is-valid-contact",
        "Must be a valid email or phone number",
        (value) =>
          /^[0-9]{11}$/.test(value) || // Phone number validation (11 digits)
          /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) // Email validation
      ),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      contact: "",
      password: "",
    },
    validationSchema,
    onSubmit: loginSubmit,
  });

  return (
    <div className="min-h-screen flex mt-16 mb-12 md:mb-20 xl:m-0 ">
      <div className="flex flex-col items-center xl:flex-row w-full">
        {/* Left Section: Image */}
        <div className="h-3/6 mb-5 md:h-5/6 w-full xl:w-[56%]">
          <img
            src={sideImage}
            alt="Signup Visual"
            className="object-cover h-full w-full"
          />
        </div>

        {/* Right Section: Form */}
        <div className="px-4 w-full md:w-full xl:w-5/12 xl:pl-32 xl:pr-0 md:px-10 lg:px-16 xl:max-w-lg">
          <div className="max-w-3xl max-h-96 mx-auto">
            <h2 className="text-2xl font-medium leading-[30px] mb-6 lg:text-2xl xl:text-3xl">
              Log in to your account
            </h2>
            <p className="mb-12 md:mb-8 sm:mb-6 text-base font-normal sm:text-sm">
              Enter your details below
            </p>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            <form
              onSubmit={formik.handleSubmit}
              className="space-y-6 xl:space-y-[40px]"
            >
              <div>
                <input
                  id="contact"
                  type="text"
                  name="contact"
                  placeholder="Email or Phone Number"
                  value={formik.values.contact}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full py-2 sm:py-1 border-b border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formik.touched.contact && formik.errors.contact && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.contact}
                  </div>
                )}
              </div>
              <div>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full lg:w-full py-2 sm:py-1 border-b border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5 sm:mb-0"
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.password}
                  </div>
                )}
              </div>
              <div className="mb-7 flex flex-col md:flex-row md:space-x-4 xl:space-x-0 justify-between items-center">
                {loading ? (
                  <button
                    type="button"
                    className="w-full sm:w-5/12 py-4 bg-green-500 text-white rounded mb-4 sm:mb-0"
                    disabled
                  >
                    Logging in...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-28 sm:px-[122px] xl:px-[48px] mb-8 xl:mb-0 py-4 bg-red-600 text-base font-medium text-white rounded-lg hover:bg-red-400 transition"
                    disabled={!(formik.isValid && formik.dirty)}
                  >
                    Log In
                  </button>
                )}

                <p className="text-center sm:text-right">
                  <Link
                    to="/forgotpassword"
                    className="text-sm text-red-600 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
