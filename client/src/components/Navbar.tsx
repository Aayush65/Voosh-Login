import { useContext } from "react";
import { context } from "../context";
import { logoutIcon } from "../assets";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
    const { name, setName, currPage, setCurrPage } = useContext(context);
    const navigate = useNavigate();

    function logout() {
        localStorage.clear()
        setName("");
        navigate("/login");
    }

    const pages : {[key: number]: string} = {0: "Your Orders", 1: "New Order?"}

    return (
        <div className="w-full flex justify-between py-5 px-10 border-b-2 border-slate-300 sticky">
            <h1 className="font-black text-3xl tracking-wide flex items-center">Welcome, {name.split(' ')[0]}</h1>
            <div className="flex gap-10">
                <h1 className="text-2xl font-semibold flex items-center hover:underline cursor-pointer" onClick={() => setCurrPage(1 - currPage)}>{pages[1 - currPage]}</h1>
                <img src={logoutIcon} alt="logout" className="w-10 h-10 hover:scale-110 cursor-pointer" onClick={() => logout()} />
            </div>
        </div>
    )
}

export default Navbar;