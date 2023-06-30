import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

const Layout = () => {
    return (
        <>
            <Navbar />
            <div className='bg-gray-800'>
                <Outlet />
            </div>
        </>
    )
}

export default Layout