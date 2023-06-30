interface CommentType {
    id: number,
    name: string,
    userId: number,
    profilePicture: string,
    desc: string
}

const Comment: React.FC<{comment: CommentType}> = ({ comment }) => {
    return (
        <div className='flex w-full gap-5 my-6'>
            <img className='object-cover w-8 h-8 rounded-full' src={comment.profilePicture} alt="user" />
            <div className='flex flex-col w-full gap-1'>
                <div className="flex justify-between">
                    <span className='font-semibold'>{comment.name}</span>
                    <span className="text-xs">1 hour ago</span>

                </div>
                <p className='text-gray-400'>{comment.desc}</p>
            </div>
        </div>
    )
}

export default Comment