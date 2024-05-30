import { createRequiredButton, createCheckbox, addEventListenersToBlock } from './blockUtils';

export class ShortAnswerBlock {
	static get toolbox() {
		return {
			title: 'Short Answer',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 14H3M21 10H3"></path></svg>`
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
		const requiredToggle = createCheckbox('Required', this.data.required, this.toggleRequired);
		const titleButton = document.createElement('button');

		titleButton.innerText = 'Add Title';
		titleButton.addEventListener('click', this.addTitle);

		wrapper.append(requiredToggle.label, titleButton);
		return wrapper;
	}

	addTitle = () => {
		if (this.titleBlockId) {
			alert('A Title block already exists for this Short Answer block.');
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

	save(blockContent) {
		const block = blockContent.querySelector('div[contenteditable="true"]');
		return {
			placeholder: block ? block.innerText.trim() : '',
			required: this.data.required,
			titleBlockId: this.titleBlockId
		};
	}
}
