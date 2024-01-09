import { useContext } from "react"
import { context } from "../context"


const HomePage = () => {
    const { name } = useContext(context);

    return (
        <div className='w-full min-h-screen bg-[#EEEEEE]'>
            <h1>Hi {name}</h1>
        </div>
    )
}

export default HomePage;