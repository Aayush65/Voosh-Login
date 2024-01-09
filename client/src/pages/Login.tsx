import { useState, useEffect, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { context } from "../context";
import { siteLoc } from "../constants";

const Login = () => {
    const [phno, setPhno] = useState<number>(0);
    const [pass, setPass] = useState<string>("");
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [isTestLogin, setIsTestLogin] = useState('');

    const [alert, setAlert] = useState<string>("");

    const { setName } = useContext(context);
    const navigate = useNavigate();

    // sending the login details for authentication and setting the jwt token
    useEffect(() => {
        if (!isSubmit)
            return;
        fetch(siteLoc + "/login-user", {
            method: 'POST',
            body: JSON.stringify({ phno, pass }),
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data && data.name) {
                    localStorage.clear();
                    localStorage.setItem("refreshToken", data.refreshToken);
                    localStorage.setItem("accessToken", data.accessToken);
                    setName(data.name);
                    navigate('/');
                } else {
                    setAlert("Incorrect Phone No or Password");
                    localStorage.removeItem("accessToken");
                    handleReset();
                }
            })
            .catch(() => {
                handleReset();
            })
        setIsSubmit(false);
    }, [isSubmit])

    // setTimeout for the alert message
    useEffect(() => {
        if (!alert.length)
            return;
        setTimeout(() => setAlert(''), alert.length * 100);
    }, [alert])

    // setting variables for test login
    useEffect(() => {
        if (!isTestLogin)
            return;
        setPhno(9999999999);
        setPass("testuserpass");
    }, [isTestLogin])

    // confirming test variables
    useEffect(() => {
        if (!isTestLogin)
            return;
        if (phno !== 9999999999 && pass !== "testuserpass")
            return;
        setIsSubmit(true);
    }, [phno, pass])

    function handleSubmit() {
        if ( !phno || !pass ){
            setAlert("Please fill all the fields");
            return;
        }
        if ( phno.toString().length !== 10 ) {
            setAlert("Please enter a valid 10 digit phone number");
            return;
        }
        setIsSubmit(true);
    }

    function handleReset() {
        setPhno(0);
        setPass('');
    }
    
    const loginDetails = [
        { name: "Phone No", value: phno, type: "number", funct: (s: string) => setPhno(parseInt(s) || 0), placeholder: "Enter your Phone No" },
        { name: "Password", value: pass, type: "password", funct: setPass, placeholder: "Enter your Password" },
    ];

    return !localStorage.getItem("accessToken") ? (
        <div className="w-screen h-screen flex flex-col justify-center items-center bg-[#EEEEEE] p-3">
            <div className={`${alert ? "": "hidden"} fixed bg-red-500 text-white p-4 text-lg rounded-lg top-0 mx-auto flex gap-5`}>
                {alert}
                <button className="font-black z-10" onClick={() => setAlert('')}>x</button>
            </div>
            <div className="flex flex-col justify-center items-center bg-[#3A98B9] py-10 px-7 md:p-10 md:pb-7 gap-5 text-[#FFF1DC] rounded-3xl w-full md:w-auto">
                {loginDetails.map((detail, index) => (
                    <label key={index} className="flex flex-col gap-1 md:text-lg w-full">
                        {detail.name}
                        <input 
                            className="p-2 rounded-xl placeholder:text-gray-400 md:w-[400px] text-black" 
                            onChange={(e) => detail.funct(e.target.value)} 
                            type={detail.name.toLowerCase()} 
                            placeholder={detail.placeholder} 
                            value={detail.value || ""} />
                        <Link to="/register" className={`hover:underline self-start text-[13px] md:text-base ${index === loginDetails.length - 1 ? "": "hidden"}`}>Register Here</Link>
                    </label>
                ))}
                <div className="flex flex-col justify-start gap-1 self-start">
                    <button onClick={() => setIsTestLogin("user")} className="text-[13px] md:text-base flex justify-start hover:underline">Test User Login</button>
                    <button onClick={() => setIsTestLogin("admin")} className="text-[13px] md:text-base flex justify-start hover:underline">Test Admin Login</button>
                </div>
                <button type="submit" onClick={handleSubmit} className="bg-gray-700 p-3 px-4 rounded-xl md:text-lg active:scale-105">Submit</button>
            </div>
        </div>
    ) : <Navigate to="/" />
}

export default Login;