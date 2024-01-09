import { Navbar } from "../components";
import { useContext } from "react";
import { context } from "../context";
import { NewOrder, Orders } from "./";

const HomePage = () => {
    const { currPage } = useContext(context);

    return (
        <div className='w-full min-h-screen bg-[#EEEEEE]'>
            <Navbar />
            {currPage ? <NewOrder /> : <Orders />}
        </div>
    )
}

export default HomePage;