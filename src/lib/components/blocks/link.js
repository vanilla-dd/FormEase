import { createRequiredButton, createCheckbox, addEventListenersToBlock } from './blockUtils';

export class LinkBlock {
	static get toolbox() {
		return {
			title: 'Link',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`
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
		const titleButton = document.createElement('button');
		this.requiredToggle = createCheckbox('Required', this.data.required, this.toggleRequired);
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

	save(blockContent) {
		const block = blockContent.querySelector('div[contenteditable="true"]');
		return {
			placeholder: block ? block.innerText.trim() : '',
			required: this.data.required,
			titleBlockId: this.titleBlockId
		};
	}
}
