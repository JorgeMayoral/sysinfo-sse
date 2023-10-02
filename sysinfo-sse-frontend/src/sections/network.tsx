import {
	Text,
	Accordion,
	AccordionBody,
	AccordionHeader,
	Flex,
	BarChart,
} from '@tremor/react';
import { NetworkInfo } from '../sysinfo';
import prettyBytes from 'pretty-bytes';

type Props = {
	networkInfo: NetworkInfo[];
};

const dataFormatter = (val: number): string => {
	return prettyBytes(val);
};

const generateData = (data_received: number, data_transmitted: number) => {
	return [
		{
			name: 'Data Received',
			bytes: data_received,
		},
		{
			name: 'Data Transmitted',
			bytes: data_transmitted,
		},
	];
};

export const NetworkSection = ({ networkInfo }: Props) => {
	return (
		<Accordion>
			<AccordionHeader>Network</AccordionHeader>
			<AccordionBody className="flex flex-col gap-2">
				{networkInfo.map(
					({ interface_name, data_received, data_transmitted }, index) => (
						<>
							<Flex
								flexDirection="col"
								justifyContent="center"
								alignItems="center"
								className="w-full"
								key={index}
							>
								<Flex>
									<Text>{interface_name}</Text>
								</Flex>
								<BarChart
									data={generateData(data_received, data_transmitted)}
									index="name"
									categories={['bytes']}
									colors={['blue', 'green']}
									valueFormatter={dataFormatter}
								/>
							</Flex>
						</>
					),
				)}
			</AccordionBody>
		</Accordion>
	);
};
