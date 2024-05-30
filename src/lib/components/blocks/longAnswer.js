import { createRequiredButton, createCheckbox, addEventListenersToBlock } from './blockUtils';

export class LongAnswerBlock {
	static get toolbox() {
		return {
			title: 'Long Answer',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-align-justify"><line x1="3" x2="21" y1="6" y2="6"></line><line x1="3" x2="21" y1="12" y2="12"></line><line x1="3" x2="21" y1="18" y2="18"></line></svg>`
		};
	}

	constructor({ data, api, block }) {
		this.data = { required: true, ...data };
		this.api = api;
		this.block = block;
		this.titleBlockId = data.titleBlockId || null;
		this.requiredButton = createRequiredButton(
			this.data.required,
			this.toggleRequired,
			this.titleBlockId
		);
		this.api.listeners.on(this.requiredButton, 'click', this.toggleRequired);
		this.updateRequiredButton();
	}

	toggleRequired = () => {
		this.data.required = !this.data.required;
		this.updateRequiredButton();
		this.updateTitleBlock();
	};

	updateRequiredButton = () => {
		if (this.requiredButton) {
			this.requiredButton.style.display =
				this.data.required && !this.titleBlockId ? 'flex' : 'none';
		}
	};

	updateTitleBlock = () => {
		if (this.titleBlockId) {
			const titleBlock = this.api.blocks.getById(this.titleBlockId);
			if (titleBlock) {
				this.api.blocks.update(this.titleBlockId, { required: this.data.required });
			}
		}
	};
	renderSettings() {
		const wrapper = document.createElement('div');
		this.requiredToggle = createCheckbox('Required', this.data.required, this.toggleRequired);
		const titleButton = document.createElement('button');
		titleButton.innerText = 'Add Title';
		titleButton.addEventListener('click', this.addTitle);
		wrapper.append(titleButton);
		wrapper.append(this.requiredToggle.label);
		return wrapper;
	}
	addTitle = () => {
		if (this.titleBlockId) {
			alert('A Title block already exists for this Short Answer block.');
			return;
		}
		const currentIndex = this.api.blocks.getCurrentBlockIndex();
		const titleBlock = this.api.blocks.insert(
			'title',
			{ required: this.data.required, parentId: this.block.id },
			{},
			currentIndex
		);
		this.titleBlockId = titleBlock.id;
		this.updateRequiredButton();
	};
	render() {
		const wrapper = document.createElement('div');
		const block = document.createElement('div');
		block.innerText = this.data.placeholder ?? '';

		addEventListenersToBlock(block, this.api);

		wrapper.classList.add('inputWrapper');
		block.classList.add('inputBlock', 'min-h-20');

		block.setAttribute('contentEditable', 'true');
		block.setAttribute('spellCheck', 'false');
		this.api.listeners.on(this.requiredButton, 'click', this.toggleRequired);
		this.updateRequiredButton();

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
