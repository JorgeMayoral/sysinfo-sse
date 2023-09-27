import {
	Accordion,
	AccordionHeader,
	AccordionBody,
	Flex,
	Text,
} from '@tremor/react';
import { secondsToTime } from '../utils';

type Props = {
	systemName: string;
	hostname: string;
	uptimeInSeconds: number;
	os: string;
	kernelVersion: string;
};

export const InfoSection = ({
	systemName,
	hostname,
	uptimeInSeconds,
	os,
	kernelVersion,
}: Props) => {
	return (
		<Accordion>
			<AccordionHeader>Info</AccordionHeader>
			<AccordionBody className="flex flex-col gap-4">
				<Flex>
					<Text>System name</Text>
					<Text>{systemName}</Text>
				</Flex>

				<Flex>
					<Text>Hostname</Text>
					<Text>{hostname}</Text>
				</Flex>

				<Flex>
					<Text>Uptime</Text>
					<Text>{secondsToTime(uptimeInSeconds)}</Text>
				</Flex>

				<Flex>
					<Text>OS</Text>
					<Text>{os}</Text>
				</Flex>

				<Flex>
					<Text>Kernel version</Text>
					<Text>{kernelVersion}</Text>
				</Flex>
			</AccordionBody>
		</Accordion>
	);
};
