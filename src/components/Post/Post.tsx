import { Link } from 'react-router-dom'

import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import CommentIcon from '@mui/icons-material/Comment';
import Comments from '../Comments/Comments';
import { useState } from 'react';

interface PostType {
    id: number,
    name: string,
    userId: number,
    profilePicture: string,
    movieId: number,
    movieTitle: string,
    moviePoster: string,
    content: string,
    rating?: number
}

const Post: React.FC<{post: PostType}> = ({post}) => {
    const [commentOpen, setCommentOpen] = useState(false)

    // TODO Create actual functionality
    const liked = false

    return (
        <div className="p-4 text-white bg-gray-900 rounded-lg  drop-shadow-lg">
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                    <img className='object-cover w-10 h-10 rounded-full' src={post.profilePicture} alt="user" />
                    <div>
                        <Link className='flex flex-col' to={`/profile/${post.userId}`}>
                            <span className='font-medium'>{post.name}</span>
                            <span className='text-sm'>1 min ago</span>
                        </Link>
                    </div>
                </div>
                <div>
                   <MoreHorizIcon /> 
                </div>
            </div>
            <div className='flex gap-4 p-4'>
                <img className='object-cover h-48 overflow-hidden rounded' src={post.moviePoster} alt="movie poster" />
                <div>
                    <h2 className='text-lg font-semibold'>{post.movieTitle}</h2>
                    {post.rating && 
                        <span>
                            Rating: {post.rating}/10
                        </span>
                    }
                    <p className='font-light'>
                        {post.content}
                    </p>
                </div>
            </div>
            <div className='flex items-center gap-4'>
                <div className='flex gap-1 cursor-pointer'>
                    {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    <span className='text-sm'>12</span>    
                </div>
                <div className='flex gap-1 cursor-pointer' onClick={() => setCommentOpen(!commentOpen)}>
                    <CommentIcon />
                    <span className='text-sm'>3</span>
                </div>
            </div>
            {commentOpen && <Comments />}
        </div>
    )
}

export default Post