import {
	Accordion,
	AccordionBody,
	AccordionHeader,
	CategoryBar,
	Divider,
	Flex,
	Text,
} from '@tremor/react';

type Props = {
	loadOne: number;
	loadFive: number;
	loadFifteen: number;
};

export const LoadSection = ({ loadOne, loadFive, loadFifteen }: Props) => {
	return (
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
						<Text>{loadOne}%</Text>
					</Flex>
					<CategoryBar
						markerValue={loadOne}
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
						<Text>{loadFive}%</Text>
					</Flex>
					<CategoryBar
						markerValue={loadFive}
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
						<Text>{loadFifteen}%</Text>
					</Flex>
					<CategoryBar
						markerValue={loadFifteen}
						values={[40, 30, 20, 10]}
						colors={['emerald', 'yellow', 'orange', 'rose']}
						className="w-full"
					/>
				</Flex>
			</AccordionBody>
		</Accordion>
	);
};
