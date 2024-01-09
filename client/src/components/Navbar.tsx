import { useContext } from "react";
import { context } from "../context";
import { logoutIcon } from "../assets";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
    const { name, setName } = useContext(context);
    const navigate = useNavigate();

    function logout() {
        localStorage.clear()
        setName("");
        navigate("/login");
    }

    return (
        <div className="w-full flex justify-between py-5 px-10 border-b-2 border-slate-300">
            <h1 className=" font-black text-3xl tracking-wide">Welcome, {name.split(' ')[0]}</h1>
            <img src={logoutIcon} alt="logout" className="w-10 h-10 hover:scale-110 cursor-pointer" onClick={() => logout()} />
        </div>
    )
}

export default Navbar;