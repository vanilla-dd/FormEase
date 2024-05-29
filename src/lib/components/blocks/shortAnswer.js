export class ShortAnswer {
	static get toolbox() {
		return {
			title: 'Short Answer',
			icon: `
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24">
					<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 14H3M21 10H3"></path>
				</svg>
			`
		};
	}

	constructor({ data, api, block }) {
		this.data = { required: true, ...data };
		this.api = api;
		this.block = block;
		this.titleBlockId = data.titleBlockId || null;
		this.requiredButton = null;
		this.requiredToggle = null;
	}

	toggleRequired = () => {
		this.data.required = !this.data.required;
		this.updateRequiredButton();
		this.updateTitleBlock();
	};

	updateRequiredButton = () => {
		if (this.requiredButton) {
			this.requiredButton.style.display = this.data.required ? 'flex' : 'none';
			if (this.titleBlockId)
				this.requiredButton.style.display = this.titleBlockId ? 'none' : 'flex';
		}
		if (this.requiredToggle) {
			this.requiredToggle.checked = this.data.required;
		}
	};

	updateTitleBlock = () => {
		if (this.titleBlockId) {
			const titleBlock = this.api.blocks.getById(this.titleBlockId);
			if (titleBlock) {
				// Update the title block data without causing a re-render
				this.api.blocks.update(this.titleBlockId, { required: this.data.required });
			}
		}
	};

	renderSettings() {
		const wrapper = document.createElement('div');
		this.requiredToggle = this.createCheckbox('Required', this.data.required, this.toggleRequired);
		wrapper.append(this.requiredToggle.label);

		const titleButton = document.createElement('button');
		titleButton.innerText = 'Add Title';
		titleButton.addEventListener('click', this.addTitle);
		wrapper.append(titleButton);

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
		const svg = document.createElement('div');

		block.innerText = this.data.placeholder ?? '';
		svg.innerHTML = ShortAnswer.toolbox.icon;
		svg.classList.add('absolute', 'right-2', 'top-1/2', '-translate-y-1/2');

		wrapper.classList.add('inputWrapper', 'wrapperMobile');
		block.classList.add('inputBlock');
		block.setAttribute('contentEditable', 'true');

		const updatePlaceholder = () => {
			block.classList.toggle(
				"before:focus:content-['Type_placeholder_text']",
				block.innerText.trim() === ''
			);
		};

		updatePlaceholder();
		block.addEventListener('input', updatePlaceholder);

		this.requiredButton = this.createRequiredButton();
		this.api.listeners.on(this.requiredButton, 'click', this.toggleRequired);
		this.updateRequiredButton();

		this.api.listeners.on(block, 'keydown', (e) => {
			if (e.key === 'Backspace' && block.innerText === '') {
				this.api.blocks.delete();
			} else if (e.key === 'Enter') {
				this.api.blocks.insert();
			}
		});

		wrapper.append(svg, block, this.requiredButton);

		return wrapper;
	}

	createRequiredButton = () => {
		const button = document.createElement('button');
		button.innerText = this.data.required ? '*' : '';
		button.classList.add('requiredButton');
		button.style.display = this.titleBlockId ? 'none' : 'flex';
		return button;
	};

	createCheckbox(labelText, checked, onChange) {
		const input = document.createElement('input');
		input.type = 'checkbox';
		input.checked = checked;
		input.addEventListener('change', onChange);

		const label = document.createElement('label');
		label.innerText = labelText;
		label.classList.add('cdx-settings-button');
		label.append(input);

		return { label, input };
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
