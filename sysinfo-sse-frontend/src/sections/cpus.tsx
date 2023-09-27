import {
	Text,
	Accordion,
	AccordionBody,
	AccordionHeader,
	Flex,
	CategoryBar,
	Divider,
} from '@tremor/react';

type Props = {
	cpuUsage: number[];
};

export const CPUsSection = ({ cpuUsage }: Props) => {
	return (
		<Accordion>
			<AccordionHeader>CPUs</AccordionHeader>
			<AccordionBody className="flex flex-col gap-2">
				{cpuUsage.map((usage, index) => (
					<>
						<Flex
							flexDirection="col"
							justifyContent="center"
							alignItems="center"
							className="w-full"
						>
							<Flex>
								<Text>CPU {index}</Text>
							</Flex>
							<Flex>
								<Text>Usage</Text>
								<Text>{usage}%</Text>
							</Flex>
							<CategoryBar
								markerValue={usage}
								values={[40, 30, 20, 10]}
								colors={['emerald', 'yellow', 'orange', 'rose']}
								className="w-full"
							/>
						</Flex>
						{index < cpuUsage.length - 1 && <Divider />}
					</>
				))}
			</AccordionBody>
		</Accordion>
	);
};
