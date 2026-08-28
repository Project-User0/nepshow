import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { nepshow } from '../../images'
import { loginAPI } from '../../utils/api';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validate = () => {
        if (!email.trim()) {
            setError('Email is required');
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Enter a valid email');
            return false;
        }
        if (!password) {
            setError('Password is required');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!validate()) return;
        setLoading(true);

        try {
            const response = await loginAPI(email, password);
            if (response.success) {
                navigate(response.user.role === 'admin' ? '/admin' : '/userdash');
            }
        } catch (err) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="custom-bg  min-h-screen">
                <div className="h-screen flex justify-center items-center bg-black bg-opacity-90">
                    <div className="relative mx-auto w-full max-w-md px-6 pt-10 pb-8 border-[1px] border-[#81808053] sm:rounded-md sm:px-10 backdrop-blur-[2px]-sm bg-[#000000a1]">
                        <div className="w-full bg-transparent">
                            <div className="bg-transparent w-full text-center flex items-center justify-center">
                                <h1 className="bg-transparent text-3xl font-semibold text-gray-300">Login to</h1>
                                <img className="bg-transparent h-8 cursor-pointer px-2 mt-2" src={nepshow} alt="" />
                            </div>
                            <div className="mt-5 bg-transparent">
                                {error && <div className="mb-4 p-2 bg-red-600 text-white text-sm rounded">{error}</div>}
                                <form className="bg-transparent" onSubmit={handleSubmit}>
                                    <div className="relative mt-6 bg-transparent">
                                        <input type="email" name="email" id="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-transparent text-white peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" autoComplete="off" required disabled={loading} />
                                        <label htmlFor="email" className="bg-transparent pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-white">Email Address</label>
                                    </div>
                                    <div className="relative mt-6 bg-transparent">
                                        <input type="password" name="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-transparent text-white peer peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" required disabled={loading} />
                                        <label htmlFor="password" className="bg-transparent pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-white">Password</label>
                                    </div>
                                    <div className="mt-6 mb-4 bg-transparent">
                                        <button type="submit" className="w-full rounded-md border px-3 py-[10px] text-white focus:bg-gray-600 focus:outline-none hover:bg-gray-200 hover:text-black disabled:opacity-50" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
                                    </div>
                                    <p className="mb-1 text-center text-sm bg-transparent">
                                        <a href="/forgetpass" className="bg-transparent my-1 transform font-semibold text-gray-500 duration-300 hover:text-gray-300">FORGOT PASSWORD?</a>
                                    </p>
                                    <p className="text-center text-sm text-gray-400 bg-transparent">Don&apos;t have an account yet?
                                        <a href="/signup" className="bg-transparent text-gray-200 hover:underline hover:italic focus:text-white focus:outline-none"> Sign up</a>.
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default LoginPage
