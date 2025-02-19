import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import sideImage from "../../assets/images/Side Image.png";
import google from "../../assets/icons/Icon-Google.png";
import style from "./SignUp.module.css";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const registerSubmit = async (values) => {
    setLoading(true);
    setError(null); // Clear any previous errors

    try {
      // Create a new user object
      const newUser = {
        name: values.name,
        contact: values.contact,
        password: values.password,
      };

      // Save the user in localStorage
      let users = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = users.some((user) => user.contact === newUser.contact);

      if (userExists) {
        setLoading(false);
        setError("User already exists with this email or phone number.");
      } else {
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        setLoading(false);
        navigate("/login");
      }
    } catch (err) {
      setLoading(false);
      setError("An error occurred. Please try again.");
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters"),
    contact: Yup.string()
      .required("Email or Phone number is required")
      .test(
        "is-valid-contact",
        "Must be a valid email or phone number",
        (value) =>
          /^[0-9]{11}$/.test(value) || // Phone number validation (11 digits)
          /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) // Email validation
      ),
    password: Yup.string()
      .required("Password is required")
      .min(7, "Password must be at least 7 characters"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      contact: "",
      password: "",
    },
    validationSchema,
    onSubmit: registerSubmit,
  });

  return (
    <div className="min-h-screen flex mt-16 mb-44 md:mb-20 xl:m-0 ">
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
              Create an account
            </h2>
            <p className="mb-12 md:mb-8 sm:mb-6 text-base font-normal sm:text-sm">
              Enter your details below
            </p>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            <form onSubmit={formik.handleSubmit}>
              <div className="mb-7">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Name"
                  className="w-full py-2 sm:py-1 border-b border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formik.errors.name && formik.touched.name && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.name}
                  </div>
                )}
              </div>

              <div className="mb-7">
                <input
                  type="text"
                  name="contact"
                  id="contact"
                  placeholder="Email or Phone Number"
                  value={formik.values.contact}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full py-2 sm:py-1 border-b border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formik.errors.contact && formik.touched.contact && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.contact}
                  </div>
                )}
              </div>

              <div className="mb-7">
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Password"
                  className="w-full py-2 sm:py-1 border-b border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formik.errors.password && formik.touched.password && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.password}
                  </div>
                )}
              </div>

              <div className="mb-7 flex flex-col md:flex-row xl:flex-col md:space-x-4 xl:space-x-0">
                {loading ? (
                  <button
                    type="button"
                    className="flex-1 py-2 bg-green-500 text-white rounded-lg flex items-center justify-center"
                    disabled
                  >
                    Loading...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex-1 mb-4 md:mb-0 xl:mb-4 py-4 bg-red-600 text-base font-medium text-white rounded-lg hover:bg-red-400 transition"
                    disabled={!(formik.isValid && formik.dirty)}
                  >
                    Create Account
                  </button>
                )}

                <button className="flex-1 md:mt-0 py-4 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 transition">
                  <img src={google} alt="Google" className="h-6 w-6 mr-2" />
                  Sign up with Google
                </button>
              </div>
            </form>

            <p className="text-center text-base font-medium text-black mt-4">
              Already have an account?
              <Link to="/login" className={`ml-2 ${style.login}`}>
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
