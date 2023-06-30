import { useContext } from "react"
import { AuthContext } from "../../context/authContext"

const Profile = () => {
    const { currentUser } = useContext(AuthContext)

    return (
        <main>
            <div>
                <img src={currentUser?.coverPicture} alt="cover" />
                <img src={currentUser?.profilePicture} alt="user" />
            </div>
            <div>
                <span></span>
            </div>
        </main>
    )
}

export default Profile