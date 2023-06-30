import { useContext } from 'react'
import Comment from '../Comment/Comment'
import { AuthContext } from '../../context/authContext'

import SendIcon from '@mui/icons-material/Send';

const Comments = () => {
    const { currentUser } = useContext(AuthContext)

    // Temporary data
    const comments = [
        {
            id: 1,
            name: 'Jan Kowalski',
            userId: 3,
            profilePicture: 'https://pixabay.com/get/g91076ba856bda65b5d576d6c47d9c0e4a99e5aa31a4f3f1eb9fb1386af014f3d90b4e5305e404016145710786d9e654c81f8cb3c765261d627c11db593f96aefd80bf8afcf21d7efb9de4ddf0a2f7fd8_640.jpg',
            desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
        },
        {
            id: 2,
            name: 'Ewa Materac',
            userId: 4,
            profilePicture: 'https://pixabay.com/get/ga0479e9d2c2390733ff618d31d1c16f960b82d144bb88c15958a160028df477cae738fae9c4e6405b0a0f08976dc3f845a40bb8c5ea3965c0e43f4da9de3a108252602a6e151c58965b9b1f15c3ac81b_640.jpg',
            desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit hic dolorem numquam voluptatem libero asperiores aperiam.'
        }
    ]

    return (
        <div>
            <div className='flex items-center justify-between gap-4 my-4'>
                <img className='object-cover w-8 h-8 rounded-full' src={currentUser?.profilePicture} alt="user" />
                <input className='w-full p-2 bg-gray-900 border-b focus:outline-none' type="text" placeholder='Write a comment...' />
                <button>
                    <SendIcon />
                </button>
            </div>
            {comments.map(comment => (
                <Comment comment={comment} key={comment.id} />
            ))}
        </div>
    )
}

export default Comments