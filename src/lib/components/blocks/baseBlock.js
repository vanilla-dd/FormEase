import { createRequiredButton, createCheckbox } from './blockUtils';

export class BaseBlock {
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
		const requiredToggle = createCheckbox('Required', this.data.required, this.toggleRequired);
		const titleButton = document.createElement('button');
		titleButton.innerText = 'Add Title';
		titleButton.addEventListener('click', this.addTitle);
		wrapper.append(requiredToggle.label, titleButton);
		return wrapper;
	}

	addTitle = () => {
		if (this.titleBlockId) {
			alert('A Title block already exists for this block.');
			return;
		}
		const titleBlock = this.api.blocks.insert(
			'title',
			{ required: this.data.required, parentId: this.block.id },
			{},
			this.api.blocks.getCurrentBlockIndex()
		);
		this.titleBlockId = titleBlock.id;
		this.updateRequiredButton();
	};
}
