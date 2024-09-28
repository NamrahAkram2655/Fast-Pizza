import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateName } from './UserSlice';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const [username, setUsername] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!username) return;
    dispatch(updateName(username));

    navigate('/menu');
  }

  return (
    <form onSubmit={handleSubmit} >
      <p className='mb-4 sm:text-base text-sm text-stone-600'>👋 Welcome! Please start by telling us your name:</p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className='w-72 rounded-full px-3 py-1 focus:outline-none focus:outline-yellow-400'
      />

      {username !== '' && (
        <div>
          <button className='my-3 text-sm rounded-full bg-yellow-300 p-3 hover:bg-yellow-500 transition-all duration-300'>Start ordering</button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;