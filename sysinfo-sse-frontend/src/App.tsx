import { useEffect, useState } from 'react';
import { AccordionList } from '@tremor/react';
import { InfoSection } from './sections/info';
import { LoadSection } from './sections/load';

interface SysInfo {
	hostname: string;
	uptime: number;
	os: string;
	load_one: number;
	load_five: number;
	load_fifteen: number;
}

function App() {
	const [sysinfo, setSysinfo] = useState<SysInfo>();

	useEffect(() => {
		const eventSource = new EventSource('http://localhost:8080/realtime');
		eventSource.onmessage = (event) => {
			const data = JSON.parse(event.data);
			setSysinfo(data);
		};
		eventSource.onerror = (event) => {
			console.error(event);
		};

		return () => {
			eventSource.close();
		};
	}, []);

	return (
		<main className="h-screen w-screen flex flex-col justify-center items-center gap-8">
			<h1 className="font-bold text-center text-4xl underline">SysInfo SSE</h1>
			{!sysinfo && <p className="text-center">Loading...</p>}
			{sysinfo && (
				<AccordionList className="w-full max-w-sm mx-auto">
					<InfoSection
						hostname={sysinfo.hostname}
						uptimeInSeconds={sysinfo.uptime}
						os={sysinfo.os}
					/>
					<LoadSection
						loadOne={sysinfo.load_one}
						loadFive={sysinfo.load_five}
						loadFifteen={sysinfo.load_fifteen}
					/>
				</AccordionList>
			)}
		</main>
	);
}

export default App;
