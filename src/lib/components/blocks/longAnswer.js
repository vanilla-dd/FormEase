export class LongAnswer {
	static get toolbox() {
		return {
			title: 'Long Answer',
			icon: `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-align-justify"><line x1="3" x2="21" y1="6" y2="6"></line><line x1="3" x2="21" y1="12" y2="12"></line><line x1="3" x2="21" y1="18" y2="18"></line></svg>
		`
		};
	}

	constructor({ data, api }) {
		this.data = { required: true, ...data };
		this.api = api;
	}

	toggleRequired = () => {
		this.data.required = !this.data.required;
		this.updateRequiredButton();
	};

	updateRequiredButton = () => {
		if (this.requiredButton) {
			this.requiredButton.classList.toggle('!hidden', !this.data.required);
		}
		if (this.requiredToggle) {
			this.requiredToggle.checked = this.data.required;
		}
	};

	renderSettings() {
		const wrapper = document.createElement('div');
		this.requiredToggle = this.createCheckbox('Required', this.data.required, this.toggleRequired);
		wrapper.append(this.requiredToggle.label);
		return wrapper;
	}

	render() {
		const wrapper = document.createElement('div');
		const block = document.createElement('div');
		block.innerText = this.data.placeholder ?? '';
		const updatePlaceholder = () => {
			if (block.innerText.trim() === '') {
				block.classList.add("before:focus:content-['Type_placeholder_text']");
			} else {
				block.classList.remove("before:focus:content-['Type_placeholder_text']");
			}
		};

		updatePlaceholder();
		block.addEventListener('input', updatePlaceholder);
		wrapper.classList.add('inputWrapper');
		block.classList.add('inputBlock', 'min-h-20');

		block.setAttribute('contentEditable', 'true');
		block.setAttribute('spellCheck', 'false');
		this.requiredButton = this.createRequiredButton();
		this.api.listeners.on(this.requiredButton, 'click', this.toggleRequired);
		this.updateRequiredButton();
		this.api.listeners.on(
			block,
			'keydown',
			(e) => {
				if (e.key !== 'Backspace') return;
				if (e.key === 'Backspace' && e.currentTarget.innerText === '') {
					this.api.blocks.delete();
				}
			},
			false
		);

		this.api.listeners.on(
			block,
			'keydown',
			(e) => {
				if (e.key !== 'Enter') return;
				this.api.blocks.insert();
			},
			false
		);

		wrapper.append(block, this.requiredButton);
		return wrapper;
	}

	createRequiredButton = () => {
		const button = document.createElement('button');
		button.innerText = '*';
		button.classList.add('requiredButton');
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
			required: this.data.required ?? true
		};
	}
}
