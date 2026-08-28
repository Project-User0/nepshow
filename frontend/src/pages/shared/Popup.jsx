import React, { useState } from 'react';
import profile from '../images/user.jpg'

function Popup() {

    const [backgroundImage, setBackgroundImage] = useState(`url(${profile})`);

    const previewImage = (event) => {
        const reader = new FileReader();
        reader.onload = () => {
            setBackgroundImage(`url(${reader.result})`);
        };
        reader.readAsDataURL(event.target.files[0]);
    };

    const openModal = (modalId) => {
        document.getElementById(modalId).style.display = 'block';
        document.body.classList.add('overflow-y-hidden');
    };

    const closeModal = (modalId) => {
        document.getElementById(modalId).style.display = 'none';
        document.body.classList.remove('overflow-y-hidden');
    };

    React.useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.keyCode === 27) {
                document.body.classList.remove('overflow-y-hidden');
                let modals = document.getElementsByClassName('modal');
                Array.prototype.slice.call(modals).forEach(i => {
                    i.style.display = 'none';
                });
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <>
            <button className="bg-rose-500 text-white rounded-md px-4 py-2 hover:bg-rose-700 transition" onClick={() => openModal('modelConfirm')}>
                Click to Open modal
            </button>

            <div id="modelConfirm" className="fixed hidden z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 modal">
                <div className="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md">

                    <div className="flex justify-end p-2">
                        <button onClick={() => closeModal('modelConfirm')} type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"></path>
                            </svg>
                        </button>
                    </div>

                    <div className="p-6 pt-0 text-center">
                        <div
                            className="mx-auto flex justify-center w-[100px] h-[100px] bg-blue-300/20 rounded-full"
                            style={{ backgroundImage: backgroundImage, backgroundSize: 'cover', backgroundPosition: 'center' }}
                        >
                            <div className="bg-white/90 rounded-full w-6 h-6 text-center ml-28 mt-4">
                                <input type="file" name="profile" id="upload_profile" hidden required onChange={previewImage} />
                                <label htmlFor="upload_profile">
                                    <svg data-slot="icon" className="w-6 h-5 text-black cursor-pointer" fill="none"
                                        strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z">
                                        </path>
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z">
                                        </path>
                                    </svg>
                                </label>
                            </div>
                        </div>
                        <h3 className="text-xl font-normal text-gray-500 mt-5 mb-6">Upload this photo as your profile?</h3>
                        <button onClick={() => closeModal('modelConfirm')}
                            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                            Yes, I'm sure
                        </button>
                        <button onClick={() => closeModal('modelConfirm')}
                            className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center"
                            data-modal-toggle="delete-user-modal">
                            No, cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Popup;
