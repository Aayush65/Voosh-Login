import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainSite from "./MainSite";
import { Login, Register, ServerError, NonExistant, FirstLoad } from "./pages";
import { useState, useEffect } from "react";
import { siteLoc } from "./constants";

function App() {
	const [ isServerActive, setIsServerActive ] = useState(false);
	const [ isTimeout, setIsTimeout ] = useState(false);

	useEffect(() => {
		async function ping() {
			try {
				await fetch(siteLoc, { method: 'get' });
				setIsServerActive(true);
				return true;
			} catch (error) {
				setIsServerActive(false);
				return false;
			}	
		}

		ping();
		let i = 0;
		const id = setInterval(async () => {
			const res = await ping();
			if (res || i > 5)
				clearInterval(id);
			if (i > 10)
				setIsTimeout(true);
			i ++;
		}, 1500);
		ping();
	}, [])

	return isServerActive ? (
		<Router>
			<Routes>
				<Route path="/" element={<MainSite />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/*" element={<NonExistant />} />
			</Routes>
		</Router>
	) : isTimeout ? <ServerError /> : <FirstLoad />
}

export default App