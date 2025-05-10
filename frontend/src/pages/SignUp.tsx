import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input';
const SignUp = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();


    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        try {

            const response = await axios.post("http://localhost:5000/auth/signup", {
                name,
                email,
                password
            });
            console.log(response.data);

            navigate("/login")
        } catch (error) {
            console.error(error);
        } finally {
            setName("");
            setEmail("");
            setPassword("");
        }
    }

    return (
        <div><section className=" h-screen ">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full outline outline-neutral-800 bg-neutral-900 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0  ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-neutral-100 md:text-2xl ">
                            Create an account
                        </h1>
                        <form className="space-y-4 md:space-y-6"
                            onSubmit={handleSignUp}
                        >
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-neutral-100 "
                                >
                                    Name
                                </label>
                                <Input
                                    type='text'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-neutral-100 "
                                >
                                    Your email
                                </label>
                                <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-neutral-100 "
                                >
                                    Password
                                </label>
                                <Input
                                    type='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-neutral-700 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Create an account
                            </button>
                            <span className="text-sm font-light text-neutral-500 ">
                                Already have an account?{' '}
                                <button
                                    onClick={() => navigate('/login')}
                                    className=" cursor-pointer font-medium text-primary-600 hover:underline"
                                >
                                    Login here
                                </button>

                            </span>
                        </form>
                    </div>
                </div>
            </div>
        </section></div>
    )
}

export default SignUp