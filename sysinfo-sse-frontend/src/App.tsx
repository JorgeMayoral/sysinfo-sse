import { useEffect, useState } from 'react';
import { AccordionList, Title } from '@tremor/react';
import { InfoSection } from './sections/info';
import { LoadSection } from './sections/load';
import { MemorySection } from './sections/memory';
import { CPUsSection } from './sections/cpus';
import { SysInfo } from './sysinfo';
import { ComponentsSection } from './sections/components';
import { DisksSection } from './sections/disks';
import { NetworkSection } from './sections/network';

function App() {
	const [sysinfo, setSysinfo] = useState<SysInfo>();

	useEffect(() => {
		const eventSource = new EventSource('http://localhost:8080/realtime');
		eventSource.onmessage = (event) => {
			const data = JSON.parse(event.data);
			console.log('🚀 ~ file: App.tsx:35 ~ useEffect ~ data:', data);
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
			<Title className="pt-12">SysInfo SSE</Title>
			{!sysinfo && <p className="text-center">Loading...</p>}
			<div className="w-full overflow-y-auto pt-6 pb-12">
				{sysinfo && (
					<AccordionList className="w-full max-w-sm mx-auto">
						<InfoSection
							systemName={sysinfo.system_name}
							hostname={sysinfo.hostname}
							uptimeInSeconds={sysinfo.uptime}
							os={sysinfo.os}
							kernelVersion={sysinfo.kernel_version}
						/>
						<LoadSection
							loadOne={sysinfo.load_one}
							loadFive={sysinfo.load_five}
							loadFifteen={sysinfo.load_fifteen}
						/>
						<MemorySection
							totalMemory={sysinfo.total_memory}
							usedMemory={sysinfo.used_memory}
							totalSwap={sysinfo.total_swap}
							usedSwap={sysinfo.used_swap}
						/>
						<CPUsSection cpuUsage={sysinfo.cpu_usage} />
						<DisksSection disksInfo={sysinfo.disks_info} />
						<ComponentsSection componentsInfo={sysinfo.components_info} />
						<NetworkSection networkInfo={sysinfo.network_info} />
					</AccordionList>
				)}
			</div>
		</main>
	);
}

export default App;
