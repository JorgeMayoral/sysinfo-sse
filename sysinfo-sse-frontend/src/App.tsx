import { useEffect, useState } from 'react';
import {
	CategoryBar,
	Flex,
	Text,
	Card,
	Divider,
	AccordionList,
	Accordion,
	AccordionHeader,
	AccordionBody,
} from '@tremor/react';
import { secondsToTime } from './utils';

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
					<Accordion>
						<AccordionHeader>Info</AccordionHeader>
						<AccordionBody className="flex flex-col gap-4">
							<Flex>
								<Text>Hostname</Text>
								<Text>{sysinfo.hostname}</Text>
							</Flex>

							<Flex>
								<Text>Uptime</Text>
								<Text>{secondsToTime(sysinfo.uptime)}</Text>
							</Flex>

							<Flex>
								<Text>OS</Text>
								<Text>{sysinfo.os}</Text>
							</Flex>
						</AccordionBody>
					</Accordion>

					<Accordion>
						<AccordionHeader>Load</AccordionHeader>
						<AccordionBody className="flex flex-col gap-2">
							<Flex
								flexDirection="col"
								justifyContent="center"
								alignItems="center"
								className="w-full"
							>
								<Flex>
									<Text>Load 1 minute</Text>
									<Text>{sysinfo.load_one}%</Text>
								</Flex>
								<CategoryBar
									markerValue={sysinfo.load_one}
									values={[40, 30, 20, 10]}
									colors={['emerald', 'yellow', 'orange', 'rose']}
									className="w-full"
								/>
							</Flex>
							<Divider />
							<Flex
								flexDirection="col"
								justifyContent="center"
								alignItems="center"
								className="w-full"
							>
								<Flex>
									<Text>Load 5 minutes</Text>
									<Text>{sysinfo.load_five}%</Text>
								</Flex>
								<CategoryBar
									markerValue={sysinfo.load_five}
									values={[40, 30, 20, 10]}
									colors={['emerald', 'yellow', 'orange', 'rose']}
									className="w-full"
								/>
							</Flex>
							<Divider />
							<Flex
								flexDirection="col"
								justifyContent="center"
								alignItems="center"
								className="w-full"
							>
								<Flex>
									<Text>Load 15 minutes</Text>
									<Text>{sysinfo.load_fifteen}%</Text>
								</Flex>
								<CategoryBar
									markerValue={sysinfo.load_fifteen}
									values={[40, 30, 20, 10]}
									colors={['emerald', 'yellow', 'orange', 'rose']}
									className="w-full"
								/>
							</Flex>
						</AccordionBody>
					</Accordion>
				</AccordionList>
			)}
		</main>
	);
}

export default App;
