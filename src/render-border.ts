import cliBoxes from 'cli-boxes';
import colorize from './colorize';
import {DOMNode} from './dom';
import Output from './output';

export default (x: number, y: number, node: DOMNode, output: Output): void => {
	if (typeof node.style.borderStyle === 'string') {
		const width = node.yogaNode!.getComputedWidth();
		const height = node.yogaNode!.getComputedHeight();
		const color = node.style.borderColor;
		const box = cliBoxes[node.style.borderStyle];
		const title = (node.style.title || "").substr(0, width - 3);

		const topBorder = colorize(
			box.topLeft + box.horizontal + title + box.horizontal.repeat(width - 3 - title.length) + box.topRight,
			color,
			'foreground'
		);

		const verticalBorder = (
			colorize(box.vertical, color, 'foreground') + '\n'
		).repeat(height - 2);

		const bottomBorder = colorize(
			box.bottomLeft + box.horizontal.repeat(width - 2) + box.bottomRight,
			color,
			'foreground'
		);

		output.write(x, y, topBorder, {transformers: []});
		output.write(x, y + 1, verticalBorder, {transformers: []});
		output.write(x + width - 1, y + 1, verticalBorder, {transformers: []});
		output.write(x, y + height - 1, bottomBorder, {transformers: []});
	}
};
