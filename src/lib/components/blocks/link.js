export class Link {
	static get toolbox() {
		return {
			title: 'Link',
			icon: `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>   
		`
		};
	}

	constructor({ data, api }) {
		this.data = data;
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
		const svg = document.createElement('div');
		block.innerText = this.data.placeholder ?? '';
		svg.innerHTML = `
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
	  `;
		svg.classList.add('absolute', 'right-2', 'top-1/2', '-translate-y-1/2');

		wrapper.classList.add('inputWrapper', 'wrapperMobile');

		block.classList.add('inputBlock');

		block.setAttribute('contentEditable', 'true');
		const updatePlaceholder = () => {
			if (block.innerText.trim() === '') {
				block.classList.add("before:focus:content-['Type_placeholder_text']");
			} else {
				block.classList.remove("before:focus:content-['Type_placeholder_text']");
			}
		};

		updatePlaceholder();

		block.addEventListener('input', updatePlaceholder);

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
		this.requiredButton = this.createRequiredButton();
		this.api.listeners.on(this.requiredButton, 'click', this.toggleRequired);
		this.updateRequiredButton();
		wrapper.append(svg, block, this.requiredButton);

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
