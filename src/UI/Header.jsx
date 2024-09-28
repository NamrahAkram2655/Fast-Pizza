import { useState } from "react"
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"

const Header = () => {

  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  function submitHandler(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`order/${query}`);
    setQuery("");
  }

  const name = useSelector(state => state.user.username);

  return (
    <div className="bg-yellow-500 uppercase px-4 py-3 border-b flex items-center justify-between border-stone-500 sm:px-6">

      <Link to="/" className="tracking-widest">
        fast React Pizza co.
      </Link>

      <form onSubmit={submitHandler}>
        <input type="text" placeholder="search order no..." value={query} onChange={(e) => setQuery(e.target.value)} className="py-1 px-3 rounded-full text-sm placeholder:text-stone-700 bg-yellow-200 w-28 sm:w-64 sm:focus:w-72 transition-all duration-300 focus:ring focus:ring-yellow-300 focus:outline-none focus:ring-offset-2 focus:ring-opacity-50" />
      </form>

      <p className="hidden md:block">
        {name}
      </p>
    </div>
  )
}

export default Header
