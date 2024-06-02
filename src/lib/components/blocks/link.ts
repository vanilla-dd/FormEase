import { BaseBlock } from './baseBlock';
import { addEventListenersToBlock } from './blockUtils';

export class LinkBlock extends BaseBlock {
	static get toolbox() {
		return {
			title: 'Link',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`
		};
	}

	render() {
		const wrapper = document.createElement('div');
		const block = document.createElement('div');
		const svg = document.createElement('div');
		svg.innerHTML = LinkBlock.toolbox.icon;
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
