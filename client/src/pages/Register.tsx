import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { siteLoc } from "../constants";


const Register = () => {
    const [name, setName] = useState<string>("");
    const [phno, setPhno] = useState<number>(0);
    const [pass, setPass] = useState<string>("");
    const [repeatPass, setRepeatPass] = useState<string>("");
    const [isDataValid, setIsDataValid] = useState<boolean>(false);
    
    const [alert, setAlert] = useState<string>("");

    const navigate = useNavigate();

    // send user's registration data to the backend if all the data given is valid
    useEffect(() => {
        if (!isDataValid)
            return;
        setIsDataValid(false);
        fetch(siteLoc + '/add-user', {
            method: 'POST',
            body: JSON.stringify({ name, phno, pass }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(() => navigate('/login', { replace: true }))
            .catch(() => {
                handleReset();
            });
    }, [isDataValid]);

    // setTimeout for the alert message
    useEffect(() => {
        if (!alert.length)
            return;
        setTimeout(() => setAlert(''), alert.length * 100);
    }, [alert])

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if ( !pass || !repeatPass || !name || !phno ) {
            setAlert("Please fill all the fields");
            return;
        }
        if ( phno.toString().length !== 10 ) {
            setAlert("Please enter a valid 10 digit phone number");
            return;
        }
        if ( pass !== repeatPass ) {
            setAlert("Passwords do not match");
            setPass('');
            setRepeatPass('');
            return;
        }
        setIsDataValid(true);
    }
    
    function handleReset() {
        setPass("");
        setRepeatPass("");
        setName("");
        setPhno(0);
    }

    const registerDetails = [
        { name: "Name", value: name, type: "text", funct: setName, placeholder: "Enter your Full Name" },
        { name: "Phone Number", value: phno, type: "number", funct: (s: string) => setPhno(parseInt(s) || 0), placeholder: "Enter your Phone No (+91)" },
        { name: "Password", value: pass, type: "password", funct: setPass, placeholder: "Enter your Password" },
        { name: "Repeat Password", value: repeatPass, type: "password", funct: setRepeatPass, placeholder: "Repeat your Password" }
    ];
    
    return !localStorage.getItem("accessToken") ? (
        <div className="w-screen min-h-screen flex flex-col justify-center items-center bg-[#EEEEEE] p-3">
            <div className={`${alert ? "": "hidden"} fixed bg-red-500 text-white p-4 text-lg rounded-lg top-0 mx-auto flex gap-5`}>
                {alert}
                <button className="font-black z-10" onClick={() => setAlert('')}>x</button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center bg-[#4D6CB8] py-10 px-7 md:p-10 md:pb-7 gap-5 text-[#FFF1DC] rounded-3xl w-full md:w-auto">
                {registerDetails.map((detail, index) => (
                    <label key={index} className="flex flex-col gap-1 md:text-lg w-full">
                        {detail.name}
                        <input 
                            className="p-2 rounded-xl placeholder:text-gray-400 md:w-[400px] text-black" 
                            onChange={(e) => detail.funct(e.target.value)}
                            type={detail.type} 
                            placeholder={detail.placeholder} 
                            value={detail.value || ""} />
                        <Link to="/login" className={`${index === registerDetails.length - 1 ? "" : "hidden"} hover:underline self-end text-[13px] md:text-base`}>Already a User?</Link>
                    </label>
                ))}
                <button type="submit" className="bg-gray-700 p-3 px-4 rounded-xl md:text-lg active:scale-105">Register</button>
            </form>
        </div>
    ) : <Navigate to="/" />
}

export default Register;