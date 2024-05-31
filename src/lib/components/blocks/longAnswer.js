import { BaseBlock } from './baseBlock';
import { addEventListenersToBlock } from './blockUtils';

export class LongAnswerBlock extends BaseBlock {
	static get toolbox() {
		return {
			title: 'Long Answer',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-align-justify"><line x1="3" x2="21" y1="6" y2="6"></line><line x1="3" x2="21" y1="12" y2="12"></line><line x1="3" x2="21" y1="18" y2="18"></line></svg>`
		};
	}

	render() {
		const wrapper = document.createElement('div');
		const block = document.createElement('div');
		block.innerText = this.data.placeholder ?? '';

		block.setAttribute('spellCheck', 'false');
		block.setAttribute('contentEditable', 'true');
		block.classList.add('inputBlock', 'min-h-20');
		addEventListenersToBlock(block, this.api);
		wrapper.classList.add('inputWrapper');

		wrapper.append(block, this.requiredButton);
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
