import { useState } from 'react';
import { nepshow } from '../../images';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ForgetPasswordPage() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const sendEmail = async (e) => {
        e.preventDefault();
        setError('');

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Please enter a valid email');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8000/api/auth/forgot-password', { email });
            sessionStorage.setItem('user_email', email);
            alert(response.data.message || 'The OTP has been sent to the given email address');
            navigate('/otp');
        } catch (err) {
            setError(err.response?.data?.message || 'Unable to send OTP');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="custom-bg  min-h-screen">
                <div className="h-screen flex justify-center items-center bg-black bg-opacity-90">
                    <div id="ff0001" className="border-[1px] border-[#81808053] backdrop-blur-[2px]-sm bg-[#000000a1] p-6 rounded-lg shadow-lg max-w-md w-full">
                        <div className="flex justify-center mb-6">
                            <img className="mx-auto h-12" src={nepshow} alt="logo" />
                        </div>
                        <div className="text-center text-gray-200 mb-6">
                            <h4 className="text-xl font-semibold my-2">Forgot Password</h4>
                            <p className="text-gray-200">Please provide your registered email to receive the OTP from the website.</p>
                        </div>
                        <div className="inp">
                            <form className="space-y-4" onSubmit={sendEmail}>
                                <div>
                                    <label htmlFor="email" className="block text-sm text-white">
                                        Your Email:
                                    </label>
                                    <input
                                        className="mt-1 block bg-transparent text-white w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
                                </div>
                                <button
                                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                    type="submit"
                                >
                                    {loading ? 'Sending...' : 'Get OTP'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ForgetPasswordPage
