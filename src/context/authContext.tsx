import { createContext, useEffect, useState, ReactElement } from "react"

interface User {
    id: number
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
            id: 1,
            name: 'Jan Kowalski',
            email: 'jankowalski@example.com',
            profilePicture: 'https://pixabay.com/get/g39e36aedf7f9ff028ae3cfa745ad90b190de3573918bdf9250d5c22b4c3ddfcdee8b79bc6c5660c9bf16f9ca0349a82721939d40ca486baa4c6d5fbb993e2e0520f4c20f65af0205e4f66cb995ae10c8_640.jpg'
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