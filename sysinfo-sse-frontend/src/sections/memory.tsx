import {
	Accordion,
	AccordionBody,
	AccordionHeader,
	Divider,
	Flex,
	ProgressBar,
	Text,
} from '@tremor/react';
import prettyBytes from 'pretty-bytes';

type Props = {
	totalMemory: number;
	usedMemory: number;
	totalSwap: number;
	usedSwap: number;
};

export const MemorySection = ({
	totalMemory,
	usedMemory,
	totalSwap,
	usedSwap,
}: Props) => {
	const readableUsedMemory = prettyBytes(usedMemory);
	const readableTotalMemory = prettyBytes(totalMemory);
	const usedMemoryPercentage = (usedMemory / totalMemory) * 100;

	const readableUsedSwap = prettyBytes(usedSwap);
	const readableTotalSwap = prettyBytes(totalSwap);
	const usedSwapPercentage = (usedSwap / totalSwap) * 100;

	return (
		<Accordion>
			<AccordionHeader>Memory</AccordionHeader>
			<AccordionBody className="flex flex-col gap-2">
				<Flex
					flexDirection="col"
					justifyContent="center"
					alignItems="center"
					className="w-full"
				>
					<Flex>
						<Text>RAM</Text>
					</Flex>
					<Flex>
						<Text>{readableUsedMemory}</Text>
						<Text>{readableTotalMemory}</Text>
					</Flex>
					<ProgressBar
						value={usedMemoryPercentage}
						color={progressColor(usedMemoryPercentage)}
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
						<Text>Swap</Text>
					</Flex>
					<Flex>
						<Text>{readableUsedSwap}</Text>
						<Text>{readableTotalSwap}</Text>
					</Flex>
					<ProgressBar
						value={usedSwapPercentage}
						color={progressColor(usedSwapPercentage)}
					/>
				</Flex>
			</AccordionBody>
		</Accordion>
	);
};

const progressColor = (value: number) => {
	if (value < 50) {
		return 'green';
	} else if (value < 75) {
		return 'yellow';
	} else {
		return 'red';
	}
};
