import SidebarMenu from "../../small Components/Sidebar/Sidebar";

export default function Account() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:mt-10 mb-20">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4 mb-8 lg:mb-0 lg:pr-6">
            <SidebarMenu />
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4 bg-white shadow-md rounded-lg p-6 lg:p-8">
            <div className="font-poppins">
              <h2 className="text-xl font-medium text-red-500 mt-4 mb-6">
                Edit Your Profile
              </h2>
              <form>
                {/* Personal Information Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-base font-normal text-black font-poppins"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="pl-4 mt-2 block w-full rounded bg-[#F5F5F5] h-[50px] focus:ring-red-500 focus:border-red-500 text-base font-normal font-poppins"
                      placeholder="Md"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-base font-normal text-black font-poppins"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="pl-4 mt-2 block w-full rounded bg-[#F5F5F5] h-[50px] focus:ring-red-500 focus:border-red-500 text-base font-normal font-poppins"
                      placeholder="Rimel"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-base font-normal text-black font-poppins"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="pl-4 mt-2 block w-full rounded bg-[#F5F5F5] h-[50px] focus:ring-red-500 focus:border-red-500 text-base font-normal font-poppins"
                      placeholder="rimel111@gmail.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-base font-normal text-black font-poppins"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      className="pl-4 mt-2 block w-full rounded bg-[#F5F5F5] h-[50px] focus:ring-red-500 focus:border-red-500 text-base font-normal font-poppins"
                      placeholder="Kingston, 5236, United State"
                    />
                  </div>
                </div>

                {/* Password Change Section */}
                <h3 className="block text-lg font-medium text-black font-poppins mb-4">
                  Password Changes
                </h3>
                <div className="grid grid-cols-1 gap-6 mb-6">
                  <div>
                    <input
                      type="password"
                      placeholder="Current Password"
                      className="pl-4 mt-2 block w-full rounded bg-[#F5F5F5] h-[50px] focus:ring-red-500 focus:border-red-500 text-base font-normal font-poppins"
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="New Password"
                      className="pl-4 mt-4 block w-full rounded bg-[#F5F5F5] h-[50px] focus:ring-red-500 focus:border-red-500 text-base font-normal font-poppins"
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      className="pl-4 mt-4 mb-6 block w-full rounded bg-[#F5F5F5] h-[50px] focus:ring-red-500 focus:border-red-500 text-base font-normal font-poppins"
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    className="text-black font-poppins font-normal text-base hover:bg-gray-100 px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 sm:px-6 py-3 rounded bg-[#DB4444] font-medium text-xs sm:text-base text-white hover:bg-red-600"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
