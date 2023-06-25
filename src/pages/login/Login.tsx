import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <section className="flex items-center justify-center h-screen bg-blue-950">
            <div className="flex w-1/2 overflow-hidden bg-white rounded-lg">
                <div className="flex flex-1 bg-center bg-cover bg-login-card-image h-[600px]">
                    <div className="flex flex-col justify-center w-full h-full gap-6 p-12 text-white select-none bg-blue-500/20 backdrop-brightness-75">
                        <h1 className="text-8xl">Movies App</h1>
                        <p>
                            It's a place where you can find all the best movies, create list of shows you want to watch, share your opinion on the things you watch and many more!
                        </p>
                        <span className="text-sm">Don't have an account?</span>
                        <Link to='/register'>
                            <button className="w-1/2 p-2 font-bold text-gray-900 bg-white border-none cursor-pointer">Register</button>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col justify-center flex-1 gap-6 p-12">
                    <h1 className="text-4xl font-bold text-gray-700 text-">Login</h1>
                    <form className="flex flex-col gap-5">
                        <input className="px-2 py-4 border-b-2 border-slate-200 focus:outline-none" type="text" placeholder="E-mail" />
                        <input className="px-2 py-4 border-b-2 border-slate-200 focus:outline-none" type="password" placeholder="Password" />
                        <button className="w-1/2 p-2 font-bold text-white bg-blue-900 border-0 cursor-pointer">Login</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Login