import { useEffect, useState } from 'react';

interface SysInfo {
	hostname: string;
	uptime: number;
	os: string;
	loadOne: number;
	loadFive: number;
	loadFifteen: number;
}

function App() {
	const [sysinfo, setSysinfo] = useState<SysInfo>();

	useEffect(() => {
		const eventSource = new EventSource('http://localhost:8080/realtime');
		eventSource.onmessage = (event) => {
			const data = JSON.parse(event.data);
			setSysinfo(data);
			console.log(data);
		};
		eventSource.onerror = (event) => {
			console.error(event);
		};

		return () => {
			eventSource.close();
		};
	}, []);

	return (
		<main className="h-screen w-screen flex flex-col justify-center items-center">
			<h1 className="font-bold text-center text-4xl underline">SysInfo SSE</h1>
		</main>
	);
}

export default App;
