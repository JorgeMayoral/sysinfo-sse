import {
	Text,
	Accordion,
	AccordionBody,
	AccordionHeader,
	Flex,
	BarChart,
} from '@tremor/react';
import { ComponentInfo } from '../sysinfo';

type Props = {
	componentsInfo: ComponentInfo[];
};

const dataFormatter = (temp: number): string => {
	return `${temp}°C`;
};

export const ComponentsSection = ({ componentsInfo }: Props) => {
	return (
		<Accordion>
			<AccordionHeader>Components</AccordionHeader>
			<AccordionBody className="flex flex-col gap-2">
				<Flex
					flexDirection="col"
					justifyContent="center"
					alignItems="center"
					className="w-full"
				>
					<Flex>
						<Text>Components Temperature</Text>
					</Flex>
					<BarChart
						data={componentsInfo}
						index="label"
						categories={['temperature']}
						colors={['orange']}
						valueFormatter={dataFormatter}
					/>
				</Flex>
			</AccordionBody>
		</Accordion>
	);
};
