
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`https://api.ashyo.fullstackdev.uz/auth/login`, {
        email,
        password
    });

    console.log(res.data);
    
    const user = res.data.user.fullname;
    const token = res.data.accessToken;

    dispatch(login({ user, token }));
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className=" flex flex-col gap-y-2 p-4 rounded">
      <h2 className="text-xl font-bold">Login</h2>
      <input className='border outline-none h-[40px] px-2 rounded-[8px] border-gray-300' type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
      <input className='border outline-none h-[40px] px-2 rounded-[8px] border-gray-300' type="text" value={password} onChange={(e) => setPassword(e.target.value)} required/>
      <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-[8px] hover:bg-blue-800 duration-300">
        Login
      </button>
    </form>
  );
};

export default LoginForm;

