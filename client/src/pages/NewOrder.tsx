import { FormEvent, useContext, useEffect, useState } from "react";
import { siteLoc } from "../constants";
import { getAccessToken } from "../utils";
import { context } from "../context";


const NewOrder = () => {
    const { setName } = useContext(context);
    const [ order, setOrder ] = useState<string>("");
    const [ subTotal, setSubTotal ] = useState<number>(0);
    const [ isDataValid, setIsDataValid ] = useState<boolean>(false);
    
    const [ alert, setAlert ] = useState<[string, boolean]>(["", false]);

    // posts the submitted details to the server
    useEffect(() => {
        async function postData() {
            try {
                const headers = {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-type': 'application/json; charset=UTF-8',
                }
                const body = JSON.stringify({ order, sub_total: subTotal });
                const response = await fetch(siteLoc + `/add-order`, { method: 'POST', headers, body })
                const data = await response.json();
                if (data.message && data.message === "Unauthorised Access") {
                    const values = await getAccessToken();
                    if (values) {
                        setName(values.name);
                        postData();
                    }
                } else if (data) {
                    setAlert(["Order Added Successfully", true])
                    handleReset();
                }
            } catch(err) {
                setAlert(["Error in adding Order", false]);
            };
        }
        if (!isDataValid)
            return;
        postData();
    }, [isDataValid])
    
    useEffect(() => {
        if (!alert[0])
            return;
        setTimeout(() => setAlert(['', false]), alert[0].length * 100);
    }, [alert])

    // checks the validity of the submitted details
    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if ( !order || !subTotal ) {
            setAlert(["Please fill all the fields", false]);
            return;
        }
        if ( subTotal < 0 ) {
            setAlert(["Sub_total cannot be negative", false]);
        }
        setIsDataValid(true);
    }
    
    function handleReset() {
        setOrder("");
        setSubTotal(0);
        setIsDataValid(false);
    }

    const PostingDetails = [
        { name: "Item/s", value: order, type: "text", funct: setOrder, placeholder: "Jalapeño Garlic Breads..." },
        { name: "Sub-Total", value: subTotal, type: "number", funct: (s: string) => setSubTotal(parseInt(s) || 0), placeholder: "Enter the Sub-Total" },
    ];

    return (
        <div className="m-20 flex flex-col justify-center items-center bg-[#EEEEEE] p-3">
            <div className={`${alert[0] ? "": "hidden"} fixed ${alert[1] ? "bg-green-500" : "bg-red-500"} text-white p-4 text-lg rounded-lg top-0 mx-auto flex gap-5`}>
                {alert[0]}
                <button className="font-black z-10" onClick={() => setAlert(['', false])}>x</button>
            </div>
            <div className="flex flex-col justify-center items-center bg-[#4D6CB8] py-10 px-7 md:p-10 md:pb-7 gap-5 text-[#FFF1DC] rounded-3xl w-full md:w-auto">
                {PostingDetails.map((detail, index) => (
                    <label key={index} className="flex flex-col gap-1 md:text-lg w-full">
                        {detail.name}
                        <input 
                            className="p-2 rounded-xl placeholder:text-gray-400 md:w-[400px] text-black" 
                            onChange={(e) => detail.funct(e.target.value)} 
                            type={detail.type} 
                            placeholder={detail.placeholder} 
                            value={detail.value || ""} />
                    </label>
                ))}
                <button type="submit" onClick={handleSubmit} className="bg-gray-700 p-3 px-4 rounded-xl md:text-lg active:scale-105">Submit</button>
            </div>
        </div>
    )
}
export default NewOrder