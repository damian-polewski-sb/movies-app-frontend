import { useContext } from 'react'
import Comment from '../Comment/Comment'
import { AuthContext } from '../../context/authContext'

const Comments = () => {
    const { currentUser } = useContext(AuthContext)

    // Temporary data
    const comments = [
        {
            id: 1,
            name: 'Jan Kowalski',
            userId: 3,
            profilePicture: 'https://pixabay.com/get/g24abee1c3412bffe4bc3e7d7428d692437f4450f00412050b56a78a6b7c349e0fe6e135a77fe2a939223eb67a7b18589d21b772eac1ca2ace10b6907d1c4015107288e3843e802dd07abfb6c294b9413_640.png',
            desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
        },
        {
            id: 2,
            name: 'Ewa Materac',
            userId: 4,
            profilePicture: 'https://pixabay.com/get/g24abee1c3412bffe4bc3e7d7428d692437f4450f00412050b56a78a6b7c349e0fe6e135a77fe2a939223eb67a7b18589d21b772eac1ca2ace10b6907d1c4015107288e3843e802dd07abfb6c294b9413_640.png',
            desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit hic dolorem numquam voluptatem libero asperiores aperiam.'
        }
    ]

    return (
        <div>
            <div className='flex items-center justify-between gap-4 my-4'>
                <img className='object-cover w-8 h-8 rounded-full' src={currentUser?.profilePicture} alt="user" />
                <input className='w-full p-2 bg-gray-900 border-b focus:outline-none' type="text" placeholder='Write a comment...' />
                <button>Send</button>
            </div>
            {comments.map(comment => (
                <Comment comment={comment} key={comment.id} />
            ))}
        </div>
    )
}

export default Comments