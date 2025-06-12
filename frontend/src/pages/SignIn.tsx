import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";

const SignIn = () => {


    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate()
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/auth/login", {
                email,
                password
            });
            const data = await response.data
            localStorage.setItem("token", data.token)
            window.location.href = "/";
        } catch (error) {
            console.error(error);
        } finally {
            setEmail("");
            setPassword("");
        }

    }


    return (
        <section className="bg-neutral-800    overflow-y-clip h-screen  ">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-neutral-900 text-neutral-100 rounded-lg shadow outline  outline-neutral-800  md:mt-0 sm:max-w-md xl:p-0  ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-neutral-100 md:text-2xl ">
                            Log In to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6"
                            onSubmit={handleLogin}
                        >
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-neutral-100 "
                                >
                                    Your email
                                </label>
                                <Input value={email}
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@company.com"
                                    required />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-neutral-100 "
                                >
                                    Password
                                </label>
                                <Input

                                    value={password}
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="enter password"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-neutral-700 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                            >
                                {localStorage.getItem("token") ? "sigin In " : "Sign IN "}
                            </button>
                            <div className=' flex  justify-center'>

                                <p className="text-sm font-light text-neutral-500 ">
                                    Don't have account?{' '}
                                    <button
                                        onClick={() => navigate('/signup')}
                                        className="font-medium text-primary-600 cursor-pointer hover:underline "
                                    >
                                        SignUp here
                                    </button>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignIn