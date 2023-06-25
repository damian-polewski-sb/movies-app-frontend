import { Link } from 'react-router-dom'

const Register = () => {
    return (
        <section className="flex items-center justify-center h-screen bg-blue-950">
            <div className="flex flex-row-reverse w-1/2 overflow-hidden bg-white rounded-lg">
                <div className="flex flex-1 bg-center bg-cover bg-register-card-image h-[600px]">
                    <div className="flex flex-col justify-center w-full h-full gap-6 p-12 text-white select-none bg-blue-500/20 backdrop-brightness-75">
                        <h1 className="text-8xl">Movies App</h1>
                        <p>
                            It's a place where you can find all the best movies, create list of shows you want to watch, share your opinion on the things you watch and many more!
                        </p>
                        <span className="text-sm">Do you have an account?</span>
                        <Link to='/login'>
                            <button className="w-1/2 p-2 font-bold text-gray-900 bg-white border-none cursor-pointer">Login</button>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col justify-center flex-1 gap-6 p-12">
                    <h1 className="text-4xl font-bold text-gray-700 text-">Register</h1>
                    <form className="flex flex-col gap-5">
                        <input className="px-2 py-4 border-b-2 border-slate-200 focus:outline-none" type="text" placeholder="Name" />
                        <input className="px-2 py-4 border-b-2 border-slate-200 focus:outline-none" type="text" placeholder="E-mail" />
                        <input className="px-2 py-4 border-b-2 border-slate-200 focus:outline-none" type="password" placeholder="Password" />
                        <input className="px-2 py-4 border-b-2 border-slate-200 focus:outline-none" type="password" placeholder="Confirm password" />
                        <button className="w-1/2 p-2 font-bold text-white bg-indigo-900 border-0 cursor-pointer">Register</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Register