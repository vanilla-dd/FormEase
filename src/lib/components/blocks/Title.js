import { createRequiredButton, addEventListenersToBlock } from './blockUtils';
export class Title {
	constructor({ data, api, block }) {
		this.parentId = data.parentId;
		this.data = data;
		this.api = api;
		this.block = block;
	}

	renderSettings() {
		return null;
	}

	render() {
		const wrapper = document.createElement('div');
		const block = document.createElement('div');

		block.classList.add(
			'inputBlock',
			'text-xl',
			'leading-tight',
			'dark:!text-[#D8D8D8]',
			'font-semibold',
			"before:content-['Type_placeholder_text']",
			'before:dark:text-[#5A5A5A]',
			'!text-[#37352f]'
		);
		block.setAttribute('contentEditable', 'true');
		wrapper.classList.add('pb-2.5', 'relative', 'w-full', 'max-w-80');

		addEventListenersToBlock(block, this.api);
		this.Button = createRequiredButton(this.data.required, this.toggleRequired);
		block.innerText = this.data.placeholder ?? '';

		wrapper.append(block, this.Button);

		return wrapper;
	}

	toggleRequired = () => {
		this.data.required = !this.data.required;
		this.updateRequiredButton();
		this.updateBlockRequiredState();
	};

	updateRequiredButton = () => {
		if (this.Button) {
			this.Button.style.display = this.data.required ? 'flex' : 'none';
		}
	};

	updateBlockRequiredState = () => {
		if (this.parentId) {
			this.api.blocks.update(this.parentId, {
				required: this.data.required
			});
		}
	};

	save(blockContent) {
		const block = blockContent.querySelector('div[contenteditable="true"]');
		return {
			placeholder: block ? block.innerText.trim() : '',
			parentId: this.parentId,
			required: this.data.required
		};
	}

	static get isReadOnlySupported() {
		return true;
	}

	destroy() {
		const parentBlock = this.api.blocks.getById(this.parentId);
		if (parentBlock) {
			this.api.blocks.update(this.parentId, {
				titleBlockId: null
			});
		}
	}
}
