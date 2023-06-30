import Posts from "../../components/Posts/Posts"

const Home = () => {
    return (
        <div className='flex max-w-screen-xl py-4 mx-auto'>
            <main className="grow-[3]">
                <Posts />
            </main>
            <aside className="grow-[2]">
                <h1>PEPEPE</h1>
            </aside>
        </div>
    )
}

export default Home