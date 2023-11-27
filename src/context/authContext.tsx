import { createContext, useEffect, useState, ReactElement } from "react"

export interface User {
    id: number
    name: string
    email: string
    profilePicture: string
    coverPicture: string
}

interface AuthContextType {
    currentUser: User | null
    login: () => void
}

export const AuthContext = createContext<AuthContextType>({
    currentUser: null,
    login: () => {}
})

export const AuthContextProvider: React.FC<{children: ReactElement}> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(
        JSON.parse(localStorage["user"] || null)
    )

    const login = () => {
        // TODO
        setCurrentUser({
            id: 1,
            name: 'Andrew Garfield',
            email: 'andrewgarfield@example.com',
            profilePicture: 'https://upload.wikimedia.org/wikipedia/commons/6/68/Flickr_-_csztova_-_Andrew_Garfield_-_TIFF_09%27_%281%29_cropped.jpg',
            coverPicture: 'https://upload.wikimedia.org/wikipedia/commons/6/68/Flickr_-_csztova_-_Andrew_Garfield_-_TIFF_09%27_%281%29_cropped.jpg'
        })
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser])

    return (
        <AuthContext.Provider value={{ currentUser, login }}>
            { children }
        </AuthContext.Provider>
    )
}