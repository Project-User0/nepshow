import React, { useEffect, useState } from "react";
import Usernav from "../../components/user/Usernav";
import { user } from "../../images";
import {
  fetchCurrentUserAPI,
  updateCurrentUserAPI,
  refreshUserState,
} from "../../utils/api";

function Profile() {
  const [activeSection, setActiveSection] = useState("account");
  const [backgroundImage, setBackgroundImage] = useState(`url(${user})`);
  const [tempImage, setTempImage] = useState(null);
  const [userData, setUserData] = useState(null);
  const [editData, setEditData] = useState({ name: "", phone: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const previewImage = (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      setTempImage(`url(${reader.result})`);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const openModal = (modalId) => {
    document.getElementById(modalId).style.display = "block";
    document.body.classList.add("overflow-y-hidden");
  };

  const closeModal = (modalId) => {
    document.getElementById(modalId).style.display = "none";
    document.body.classList.remove("overflow-y-hidden");
  };

  const confirmUpload = () => {
    setBackgroundImage(tempImage);
    closeModal("modelConfirm");
  };

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      try {
        const currentUser = await fetchCurrentUserAPI();
        setUserData(currentUser || {});
        setEditData({
          name: currentUser.name || "",
          phone: currentUser.phone || "",
        });
      } catch (err) {
        setError(err?.message || "Unable to load profile");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSuccessMessage("");
    try {
      const response = await updateCurrentUserAPI({
        name: editData.name,
        phone: editData.phone,
      });
      const updatedUser = response?.data || {};
      setUserData(updatedUser);
      await refreshUserState();
      setSuccessMessage("Profile updated successfully.");
    } catch (err) {
      setError(err?.message || "Unable to save profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="details min-h-screen flex items-center justify-center">
        <p className="text-white">Loading profile...</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="details min-h-screen flex items-center justify-center">
        <p className="text-red-200">Unable to load profile data.</p>
      </div>
    );
  }

  return (
    <>
      <div className="details">
        <Usernav />
        <div className="min-h-screen flex items-center backdrop-blur-lg bg-[#000000b1] bg-opacity-90 justify-center xl:p-6 lg:p-6 pt-24 px-2">
          <div className="rounded-md bg-[#00000059] max-w-4xl w-full py-8 transition-all duration-300 animate-fade-in">
            <div className="flex flex-col md:flex-row bg-transparent">
              <div className="w-full md:w-1/2 lg:w-1/3 text-center mb-8 md:mb-0 border-r">
                <div
                  className="mx-auto flex justify-center w-[100px] h-[100px] bg-blue-300/20 rounded-full"
                  style={{
                    backgroundImage: backgroundImage,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="bg-white/90 rounded-full w-6 h-6 text-center ml-28 mt-4">
                    <button onClick={() => openModal("modelConfirm")}>
                      <svg
                        data-slot="icon"
                        className="w-6 h-5 text-black cursor-pointer"
                        fill="none"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <h1 className="text-2xl font-semibold text-indigo-800 dark:text-white mb-4">
                  {userData.name || "User Name"}
                </h1>
                <input
                  type="file"
                  id="uploaded_image"
                  className="hidden"
                  onChange={previewImage}
                />
                <button
                  onClick={() => setActiveSection("account")}
                  className="w-full py-2 bg-transparent text-white hover:bg-white text-left hover:text-black px-8"
                >
                  Account Info
                </button>
                <button
                  onClick={() => setActiveSection("update")}
                  className="w-full py-2 bg-transparent text-white hover:bg-white text-left hover:text-black px-8"
                >
                  Account Setting
                </button>
                <button
                  onClick={() => setActiveSection("password")}
                  className="w-full py-2 bg-transparent text-white hover:bg-white text-left hover:text-black px-8"
                >
                  Security Info
                </button>
                {/* <button onClick={() => setActiveSection('payment')} className="w-full py-2 bg-transparent text-white hover:bg-white text-left hover:text-black px-8">
                                    Payment Info
                                </button> */}
                <button
                  onClick={() => setActiveSection("terms")}
                  className="w-full py-2 bg-transparent text-white hover:bg-white text-left hover:text-black px-8"
                >
                  Terms & Policies
                </button>
              </div>
              <div className="flex-1 p-4">
                {activeSection === "account" && (
                  <div className="md:w-2/3 xl:w-full md:pl-8">
                    <h2 className="text-xl font-semibold text-indigo-800 dark:text-white mb-2">
                      About Me
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-8">
                      {userData.bio ||
                        "Manage your profile and keep your contact information up to date."}
                    </p>
                    <div className="my-6">
                      <h2 className="text-xl font-semibold text-indigo-800 dark:text-white">
                        Role
                      </h2>
                      <span className="text-gray-300 py-1 text-[14px]">
                        {userData.role || "User"}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold text-indigo-800 dark:text-white mb-4">
                      Contact Information
                    </h2>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2 text-indigo-800 dark:text-blue-900"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        {userData.email}
                      </li>
                      <li className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2 text-indigo-800 dark:text-blue-900"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        {userData.phone || "Not provided"}
                      </li>
                      <li className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2 text-indigo-800 dark:text-blue-900"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {userData.address || "Address not set"}
                      </li>
                    </ul>
                  </div>
                )}
                {activeSection === "update" && (
                  <div className="h-full w-full">
                    <h1 className="text-2xl text-white font-semibold">
                      Account Setting
                    </h1>
                    <div className="grid grid-cols-1 gap-4 mt-2 md:grid-cols-2">
                      <div className="col-span-2">
                        <label className="block text-gray-700 dark:text-gray-300 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={editData.name}
                          onChange={handleChange}
                          className="text-white placeholder:text-white bg-transparent p-2 border border-gray-800 outline-none rounded focus:border-blue-600 w-full text-[14px]"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-gray-700 dark:text-gray-300 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          value={userData.email}
                          disabled
                          className="text-white bg-gray-800 p-2 border border-gray-800 rounded outline-none w-full text-[14px]"
                        />
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-gray-700 dark:text-gray-300 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          name="phone"
                          value={editData.phone}
                          onChange={handleChange}
                          className="text-white placeholder:text-white bg-transparent p-2 border border-gray-800 outline-none rounded focus:border-blue-600 w-full text-[14px]"
                        />
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-gray-700 dark:text-gray-300 mb-1">
                          Subscription
                        </label>
                        <input
                          type="text"
                          value={userData.subscription?.plan || "free"}
                          disabled
                          className="text-white bg-gray-800 p-2 border border-gray-800 rounded outline-none w-full text-[14px]"
                        />
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button
                        type="button"
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        disabled={saving}
                      >
                        {saving ? "Saving..." : "Save Changes"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditData({
                            name: userData.name || "",
                            phone: userData.phone || "",
                          });
                          setSuccessMessage("");
                          setError("");
                        }}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-400"
                      >
                        Reset
                      </button>
                    </div>
                    {successMessage && (
                      <div className="mt-4 rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-700">
                        {successMessage}
                      </div>
                    )}
                    {error && (
                      <div className="mt-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                        {error}
                      </div>
                    )}
                  </div>
                )}
                {activeSection === "password" && (
                  <div>
                    <h1 className="text-2xl text-white font-semibold">
                      Password Setting
                    </h1>
                    <div className="grid grid-cols-2 gap-4 my-4">
                      <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-1">
                          Old Password
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your old password"
                          className="text-white placeholder:text-white bg-transparent p-2 border border-gray-800 outline-none rounded focus:border-blue-600 w-full text-[14px]"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-1">
                          New Password
                        </label>
                        <input
                          type="password"
                          placeholder="Enter your new password"
                          className="text-white placeholder:text-white bg-transparent p-2 border border-gray-800 outline-none rounded focus:border-blue-600 w-full text-[14px]"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-1">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          placeholder="Confirm your new password"
                          className="text-white placeholder:text-white bg-transparent p-2 border border-gray-800 outline-none rounded focus:border-blue-600 w-full text-[14px]"
                        />
                      </div>
                    </div>
                    <div className="mt-8 flex space-x-2">
                      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Update
                      </button>
                      <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
                {/* {activeSection === 'payment' && (
                                    <div className="rounded-lg shadow-lg p-6">
                                        <h2 className="text-lg font-medium text-white mb-6">Payment Information</h2>
                                        <form>
                                            <div className="grid grid-cols-2 gap-6">
                                                <div className="col-span-2 sm:col-span-1">
                                                    <label htmlFor="card-number" className="block text-sm font-medium text-gray-200 mb-2">Card Number</label>
                                                    <input type="text" name="card-number" id="card-number" placeholder="0000 0000 0000 0000" className="w-full py-3 px-4 border border-gray-800 bg-transparent rounded focus:outline-none focus:border-blue-500" />
                                                </div>
                                                <div className="col-span-2 sm:col-span-1">
                                                    <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-200 mb-2">Expiration Date</label>
                                                    <input type="text" name="expiration-date" id="expiration-date" placeholder="MM / YY" className="w-full py-3 px-4 border border-gray-800 bg-transparent rounded focus:outline-none focus:border-blue-500" />
                                                </div>
                                                <div className="col-span-2 sm:col-span-1">
                                                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-200 mb-2">CVV</label>
                                                    <input type="text" name="cvv" id="cvv" placeholder="000" className="w-full py-3 px-4 border border-gray-800 bg-transparent rounded focus:outline-none focus:border-blue-500" />
                                                </div>
                                                <div className="col-span-2 sm:col-span-1">
                                                    <label htmlFor="card-holder" className="block text-sm font-medium text-gray-200 mb-2">Card Holder</label>
                                                    <input type="text" name="card-holder" id="card-holder" placeholder="Full Name" className="w-full py-3 px-4 border border-gray-800 bg-transparent rounded focus:outline-none focus:border-blue-500" />
                                                </div>
                                            </div>
                                            <div className="mt-8">
                                                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg focus:outline-none">Update</button>
                                            </div>
                                        </form>
                                    </div>
                                )} */}
                {activeSection === "terms" && (
                  <div className="w-full block space-y-2 px-2 text-white">
                    <div>
                      <h1 className="text-2xl font-semibold mb-2">
                        Our Terms & Conditions
                      </h1>
                      <p className="text-[14px]">
                        Welcome to our website. If you continue to browse and
                        use this website, you are agreeing to comply with and be
                        bound by the following terms and conditions of use,
                      </p>
                      <a
                        href="#"
                        className="mb-2 text-blue-400 text-[13px] hover:italic hover:underline"
                      >
                        Link for the privacy policy
                      </a>
                    </div>
                    <div>
                      <h1 className="text-2xl font-semibold mb-2">
                        Our Privacy Policy
                      </h1>
                      <p className="text-[14px]">
                        NepSHOW respects your privacy and is committed to
                        protecting your personal data. Our Privacy Policy
                        outlines how we collect, use, store, and safeguard your
                        data when you use our web app or website.
                      </p>
                      <a
                        href="#"
                        className="mb-2 text-blue-400 text-[13px] hover:italic hover:underline"
                      >
                        Link for the privacy policy
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            id="modelConfirm"
            className="fixed hidden z-50 inset-0 bg-opacity-60 overflow-y-auto h-full w-full px-4 modal"
          >
            <div className="relative top-40 mx-auto shadow-xl rounded-md bg-gray-200 max-w-md">
              <div className="flex justify-end p-2">
                <button
                  onClick={() => closeModal("modelConfirm")}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>

              <div className="p-6 pt-0 text-center">
                <div
                  className="mx-auto flex justify-center w-[100px] h-[100px] rounded"
                  style={{
                    backgroundImage: tempImage || backgroundImage,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="bg-white/90 rounded-full w-6 h-6 text-center ml-28 mt-4">
                    <input
                      type="file"
                      name="profile"
                      id="upload_profile"
                      hidden
                      required
                      onChange={previewImage}
                    />
                    <label htmlFor="upload_profile">
                      <svg
                        data-slot="icon"
                        className="w-6 h-5 text-black cursor-pointer"
                        fill="none"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                        ></path>
                      </svg>
                    </label>
                  </div>
                </div>
                <h3 className="text-xl font-normal text-gray-500 mt-5 mb-6">
                  Upload this picture as your profile?
                </h3>
                <button
                  onClick={confirmUpload}
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2"
                >
                  Yes, I'm sure
                </button>
                <button
                  onClick={() => closeModal("modelConfirm")}
                  className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center"
                  data-modal-toggle="delete-user-modal"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
