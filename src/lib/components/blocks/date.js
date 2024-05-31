import { BaseBlock } from './baseBlock';
import { addEventListenersToBlock } from './blockUtils';

export class DateBlock extends BaseBlock {
	static get toolbox() {
		return {
			title: 'Date',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>`
		};
	}

	render() {
		const wrapper = document.createElement('div');
		const block = document.createElement('div');
		const svg = document.createElement('div');
		svg.innerHTML = DateBlock.toolbox.icon;
		svg.classList.add('absolute', 'right-2', 'top-1/2', '-translate-y-1/2');

		block.innerText = this.data.placeholder ?? '';
		block.classList.add('inputBlock');
		block.setAttribute('contentEditable', 'true');
		addEventListenersToBlock(block, this.api);

		wrapper.classList.add('inputWrapper', 'wrapperMobile');

		wrapper.append(block, svg, this.requiredButton);
		return wrapper;
	}

	save(blockContent) {
		const block = blockContent.querySelector('div[contenteditable="true"]');
		return {
			placeholder: block ? block.innerText.trim() : '',
			required: this.data.required,
			titleBlockId: this.titleBlockId
		};
	}
}
