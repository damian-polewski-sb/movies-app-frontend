import Post from "../Post/Post"

const Posts = () => {
    // Temporary data
    const posts = [
        {
            id: 1,
            name: 'Robert Lewandowski',
            userId: 1,
            profilePicture: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Robert_Lewandowski%2C_FC_Bayern_M%C3%BCnchen_%28by_Sven_Mandel%2C_2019-05-27%29_01.jpg',
            movieId: 569094,
            movieTitle: 'Spider-Man: Across the Spider-Verse',
            moviePoster: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg' ,
            content: 'Good movie! Highly recommended',
            rating: 7
        },
        {
            id: 2,
            name: 'Robert Makłowicz',
            userId: 2,
            profilePicture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Augusty%C5%84ski_%26_Mak%C5%82owicz_na_Malcie_cropped.jpg/800px-Augusty%C5%84ski_%26_Mak%C5%82owicz_na_Malcie_cropped.jpg',
            movieId: 502356,
            movieTitle: 'The Super Mario Bros. Movie',
            moviePoster: 'https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg',
            content: 'Plans to watch it!'
        },
        {
            id: 3,
            name: 'Robert Kubica',
            userId: 3,
            profilePicture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Robert_Kubica_2019_Formula_One_tests_Barcelona_%28cropped%29.jpg/800px-Robert_Kubica_2019_Formula_One_tests_Barcelona_%28cropped%29.jpg',
            movieId: 603692,
            movieTitle: 'John Wick: Chapter 4',
            moviePoster: 'https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg',
            content: 'Watched it!'
        },
        {
            id: 4,
            name: 'Robert Makłowicz',
            userId: 2,
            profilePicture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Augusty%C5%84ski_%26_Mak%C5%82owicz_na_Malcie_cropped.jpg/800px-Augusty%C5%84ski_%26_Mak%C5%82owicz_na_Malcie_cropped.jpg',
            movieId: 667538,
            movieTitle: 'Transformers: Rise of the Beasts',
            moviePoster: 'https://image.tmdb.org/t/p/w500/gPbM0MK8CP8A174rmUwGsADNYKD.jpg',
            content: 'Plot is predictable but action scenes are cool to watch. Overall it is decent movie.',
            rating: 5,
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