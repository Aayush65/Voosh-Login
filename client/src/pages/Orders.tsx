import { useContext, useEffect, useState } from "react";
import { siteLoc } from "../constants";
import { getAccessToken } from "../utils";
import { context } from "../context";

interface OrderType {
    "order": string;
    "sub_total": number;
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
        <div className="m-20 p-6 flex-col justify-center items-center">
            <h1 className="text-2xl font-bold">Your Orders: </h1>
            {allOrders.map((entry, index) => {
                total += entry["sub_total"];
                return (
                <div className="flex items-center justify-around text-lg text-[#FFF1DC] font-medium bg-[#4D6CB8] m-2" key={index}>
                    <div className="">{entry.order}</div>
                    <div className="">₹{entry["sub_total"]}</div>
                </div>
            )})}
            <h1 className="text-2xl font-bold">Total: ₹{total}</h1>
        </div>
    ) : <p className="text-xl text-center m-20">You have no orders</p>;
}

export default Orders