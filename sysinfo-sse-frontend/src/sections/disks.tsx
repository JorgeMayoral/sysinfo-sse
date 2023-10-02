import {
	Text,
	Accordion,
	AccordionBody,
	AccordionHeader,
	Flex,
	DonutChart,
} from '@tremor/react';
import { DiskInfo } from '../sysinfo';
import prettyBytes from 'pretty-bytes';

type Props = {
	disksInfo: DiskInfo[];
};

const dataFormatter = (temp: number): string => {
	return prettyBytes(temp);
};

const generateData = (available_space: number, total_space: number) => {
	return [
		{
			label: 'Available Space',
			value: available_space,
		},
		{
			label: 'Used Space',
			value: total_space - available_space,
		},
	];
};

export const DisksSection = ({ disksInfo }: Props) => {
	return (
		<Accordion>
			<AccordionHeader>Disks</AccordionHeader>
			<AccordionBody className="flex flex-col gap-2">
				{disksInfo.map(({ name, available_space, total_space }, index) => (
					<>
						<Flex
							flexDirection="col"
							justifyContent="center"
							alignItems="center"
							className="w-full"
							key={index}
						>
							<Flex>
								<Text>{name}</Text>
							</Flex>
							<DonutChart
								data={generateData(available_space, total_space)}
								index="label"
								category="value"
								valueFormatter={dataFormatter}
								colors={['green', 'red']}
							/>
						</Flex>
					</>
				))}
			</AccordionBody>
		</Accordion>
	);
};
