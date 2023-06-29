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
            profilePicture: 'https://pixabay.com/get/g24abee1c3412bffe4bc3e7d7428d692437f4450f00412050b56a78a6b7c349e0fe6e135a77fe2a939223eb67a7b18589d21b772eac1ca2ace10b6907d1c4015107288e3843e802dd07abfb6c294b9413_640.png'
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