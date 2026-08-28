import { useState, useEffect } from 'react';
import nepshow from '../../images/nepshow.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ResetPasswordPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedEmail = sessionStorage.getItem('user_email');
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    const handleForm = async (event) => {
        event.preventDefault();
        setError('');

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            const otp = sessionStorage.getItem('otp_code') || '';
            const response = await axios.post('http://localhost:8000/api/auth/reset-password', {
                email,
                otp: otp,
                password,
                password_confirmation: confirmPassword,
            });
            alert(response.data.message || 'Password has been changed');
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Unable to reset password');
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
                            <form method="post" className="space-y-4" onSubmit={handleForm}>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Enter new password:
                                    </label>
                                    <input
                                        className="mt-1 block bg-transparent text-white w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        type="password"
                                        id="password"
                                        name="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                                        Confirm new Password:
                                    </label>
                                    <input
                                        className="mt-1 block bg-transparent text-white w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        type="password"
                                        id="confirm-password"
                                        name="confirm-password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                {error && <p className="text-sm text-red-400">{error}</p>}
                                <button
                                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? 'Updating...' : 'Submit'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default ResetPasswordPage
