import { BaseBlock } from './baseBlock';
import { addEventListenersToBlock } from './blockUtils';

export class NumberBlock extends BaseBlock {
	static get toolbox() {
		return {
			title: 'Number',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hash"><line x1="4" x2="20" y1="9" y2="9"></line><line x1="4" x2="20" y1="15" y2="15"></line><line x1="10" x2="8" y1="3" y2="21"></line><line x1="16" x2="14" y1="3" y2="21"></line></svg>`
		};
	}

	render() {
		const wrapper = document.createElement('div');
		const block = document.createElement('div');
		const svg = document.createElement('div');

		svg.innerHTML = NumberBlock.toolbox.icon;
		svg.classList.add('absolute', 'right-2', 'top-1/2', '-translate-y-1/2');

		block.innerText = this.data.placeholder ?? '';
		block.classList.add('inputBlock');
		block.setAttribute('contentEditable', 'true');
		addEventListenersToBlock(block, this.api);

		wrapper.classList.add('inputWrapper', 'wrapperMobile');

		wrapper.append(block, svg, this.requiredButton);
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
