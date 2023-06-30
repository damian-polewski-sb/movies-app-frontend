import Posts from "../../components/Posts/Posts"
import TrendingDisplay from "../../components/TrendingDisplay/TrendingDisplay"

const Home = () => {
    return (
        <div className='flex max-w-screen-xl py-4 mx-auto'>
            <main className="w-2/3">
                <Posts />
            </main>
            <aside className="w-1/3">
                <TrendingDisplay />
            </aside>
        </div>
    )
}

export default Home