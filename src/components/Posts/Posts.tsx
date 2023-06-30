import Post from "../Post/Post"

const Posts = () => {

    const posts = [
        {
            id: 1,
            name: 'Robert Kowalski',
            userId: 1,
            profilePicture: 'https://pixabay.com/get/g24abee1c3412bffe4bc3e7d7428d692437f4450f00412050b56a78a6b7c349e0fe6e135a77fe2a939223eb67a7b18589d21b772eac1ca2ace10b6907d1c4015107288e3843e802dd07abfb6c294b9413_640.png',
            movieId: 569094,
            movieTitle: 'Spider-Man: Across the Spider-Verse',
            moviePoster: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg' ,
            content: 'Good movie! Highly recommended',
            rating: 7
        },
        {
            id: 2,
            name: 'Piotr Nowak',
            userId: 2,
            profilePicture: 'https://pixabay.com/get/g24abee1c3412bffe4bc3e7d7428d692437f4450f00412050b56a78a6b7c349e0fe6e135a77fe2a939223eb67a7b18589d21b772eac1ca2ace10b6907d1c4015107288e3843e802dd07abfb6c294b9413_640.png',
            movieId: 502356,
            movieTitle: 'The Super Mario Bros. Movie',
            moviePoster: 'https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg',
            content: 'Plan to watch it!'
        }
    ]

    return (
        <div className="flex flex-col gap-8 px-6">
            {posts.map(post => (
                <Post post={post} key={post.id} />
            ))}
        </div>
    )
}

export default Posts