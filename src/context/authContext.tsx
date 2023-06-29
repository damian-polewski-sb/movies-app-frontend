import { createContext, useEffect, useState, ReactElement } from "react"

interface User {
    id: string
    name: string
    email: string
    profilePicture: string
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
            id: '1',
            name: 'Jan Kowalski',
            email: 'jankowalski@example.com',
            profilePicture: '../img/user-placeholder.png'
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