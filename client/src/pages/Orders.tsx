import { useContext, useEffect, useState } from "react";
import { siteLoc } from "../constants";
import { getAccessToken } from "../utils";
import { context } from "../context";

interface OrderType {
    "order": string;
    "sub_total": number;
    "phno": number;
}

const Orders = () => {
    const [ allOrders, setAllOrders ] = useState<OrderType[]>([]);
    const { setName } = useContext(context);

    useEffect(() => {
        if (allOrders.length) return;

        async function fetchData() {
            try {
                const headers = {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-type': 'application/json; charset=UTF-8',
                }
                const response = await fetch(siteLoc + `/get-order`, { method: 'GET', headers});
                const data = await response.json();
                if (data.message && data.message === "Unauthorised Access") {
                    const values = await getAccessToken();
                    if (values && values.name) {
                        setName(values.name);
                        fetchData();
                    }
                } else if (data) {
                    setAllOrders(data);
                    console.log(data);
                }
            } catch(err) {
                console.log(err);
            };
        };

        fetchData();
    }, [])

    let total = 0;
    return allOrders.length ? (
        <div className="w-1/2 mt-12 mx-auto p-10 flex-col gap-10">
            <h1 className="text-2xl font-bold flex justify-center mb-5">Your Orders: </h1>
            {allOrders.map((entry, index) => {
                total += entry["sub_total"];
                return (
                <div className="w-3/4 flex items-center justify-around text-lg text-[#FFF1DC] font-medium bg-[#4D6CB8] mt-2 mx-auto p-3 rounded-lg" key={index}>
                    <div>{entry.order}</div>
                    <div>₹{entry["sub_total"]}</div>
                </div>
            )})}
            <h2 className="mt-4 text-xl font-bold flex justify-center">Ordered from: {allOrders[0].phno}</h2>
            <h1 className="mt-8 text-2xl font-bold flex justify-center">Grand Total: ₹{total}</h1>
        </div>
    ) : <p className="text-xl text-center m-20">You have no orders</p>;
}

export default Orders