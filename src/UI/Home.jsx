import { useSelector } from "react-redux"
import CreateUser from "../Features/User/CreateUser"
import { Link } from "react-router-dom";

const Home = () => {

    const name = useSelector(state=>state.user.username);
    return (
        <div className="my-10 sm:my-16 text-center ">
            <h1 className="font-semibold text-2xl text-stone-700 text-center mb-8">The best pizza
                <br />
                <span className="text-yellow-500">
                    <h2>Straight out of the oven, straight to you</h2>
                </span>
            </h1>

            {name ? <Link to="/menu" className="bg-yellow-400 rounded-full px-3 py-1" >Continue Ordering {name}</Link> : <CreateUser />}
        </div>
    )
}

export default Home
