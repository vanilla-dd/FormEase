import { BaseBlock } from './baseBlock';
import { addEventListenersToBlock } from './blockUtils';

export class ShortAnswerBlock extends BaseBlock {
	static get toolbox() {
		return {
			title: 'Short Answer',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 14H3M21 10H3"></path></svg>`
		};
	}

	render() {
		const wrapper = document.createElement('div');
		const block = document.createElement('div');
		const svg = document.createElement('div');

		svg.innerHTML = ShortAnswerBlock.toolbox.icon;
		svg.classList.add('absolute', 'right-2', 'top-1/2', '-translate-y-1/2');

		block.innerText = this.data.placeholder ?? '';
		block.classList.add('inputBlock');
		block.setAttribute('contentEditable', 'true');
		addEventListenersToBlock(block, this.api);

		wrapper.classList.add('inputWrapper', 'wrapperMobile');
		wrapper.append(svg, block, this.requiredButton);
		return wrapper;
	}

	save(blockContent: HTMLElement) {
		const block: HTMLDivElement | null = blockContent.querySelector('div[contenteditable="true"]');
		return {
			placeholder: block ? block.innerText.trim() : '',
			required: this.data.required,
			titleBlockId: this.titleBlockId
		};
	}
}
