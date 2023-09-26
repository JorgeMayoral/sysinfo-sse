import {
	Accordion,
	AccordionHeader,
	AccordionBody,
	Flex,
	Text,
} from '@tremor/react';
import { secondsToTime } from '../utils';

type Props = {
	hostname: string;
	uptimeInSeconds: number;
	os: string;
};

export const InfoSection = ({ hostname, uptimeInSeconds, os }: Props) => {
	return (
		<Accordion>
			<AccordionHeader>Info</AccordionHeader>
			<AccordionBody className="flex flex-col gap-4">
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
			</AccordionBody>
		</Accordion>
	);
};
