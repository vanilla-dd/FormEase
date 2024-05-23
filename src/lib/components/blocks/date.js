export class DateBlock {
	static toolbox = {
		title: 'Date',
		icon: `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                <line x1="16" x2="16" y1="2" y2="6"></line>
                <line x1="8" x2="8" y1="2" y2="6"></line>
                <line x1="3" x2="21" y1="10" y2="10"></line>
            </svg>
        `
	};

	constructor({ data, api }) {
		this.data = { required: true, ...data };
		this.api = api;
	}

	toggleRequired() {
		this.data.required = !this.data.required;
		this.updateRequiredButton();
	}

	updateRequiredButton() {
		if (this.requiredButton) {
			this.requiredButton.classList.toggle('!hidden', !this.data.required);
		}
		if (this.requiredToggle) {
			this.requiredToggle.checked = this.data.required;
		}
	}

	renderSettings() {
		const wrapper = document.createElement('div');

		this.requiredToggle = document.createElement('input');
		this.requiredToggle.type = 'checkbox';
		this.requiredToggle.checked = this.data.required;
		this.requiredToggle.addEventListener('change', () => this.toggleRequired());

		const label = document.createElement('label');
		label.innerText = 'Required';
		label.classList.add('cdx-settings-button');
		label.append(this.requiredToggle);

		wrapper.appendChild(label);

		return wrapper;
	}

	render() {
		const wrapper = this.createWrapper();
		const block = this.createBlock();
		const svg = this.createSvg();
		this.requiredButton = this.createRequiredButton();
		block.innerText = this.data.placeholder ?? '';

		this.api.listeners.on(this.requiredButton, 'click', () => this.toggleRequired());
		this.api.listeners.on(block, 'keydown', (e) => this.handleKeyDown(e, block));
		const updatePlaceholder = () => {
			if (block.innerText.trim() === '') {
				block.classList.add("before:focus:content-['Type_placeholder_text']");
			} else {
				block.classList.remove("before:focus:content-['Type_placeholder_text']");
			}
		};

		updatePlaceholder();

		block.addEventListener('input', updatePlaceholder);
		wrapper.append(svg, block, this.requiredButton);
		this.updateRequiredButton();

		return wrapper;
	}

	createWrapper() {
		const wrapper = document.createElement('div');
		wrapper.classList.add(
			'relative',
			'cursor-text',
			'custom-box-shadow',
			'w-1/2',
			'rounded-md',
			'px-2',
			'py-1.5',
			'mb-2.5'
		);
		return wrapper;
	}

	createBlock() {
		const block = document.createElement('div');
		block.classList.add('inputBlock');
		block.setAttribute('contentEditable', 'true');

		return block;
	}

	createSvg() {
		const svg = document.createElement('div');
		svg.innerHTML = DateBlock.toolbox.icon;
		svg.classList.add('absolute', 'right-2', 'top-1/2', '-translate-y-1/2');
		return svg;
	}

	createRequiredButton() {
		const button = document.createElement('button');
		button.innerText = '*';
		button.classList.add('requiredButton');
		return button;
	}

	handleKeyDown(e, block) {
		if (e.key === 'Backspace' && block.innerText.trim() === '') {
			this.api.blocks.delete();
			e.preventDefault();
		} else if (e.key === 'Enter') {
			e.preventDefault();
			this.api.blocks.insert();
		}
	}

	save(blockContent) {
		const block = blockContent.querySelector('div[contenteditable="true"]');
		return {
			placeholder: block ? block.innerText.trim() : '',
			required: this.data.required
		};
	}
}
