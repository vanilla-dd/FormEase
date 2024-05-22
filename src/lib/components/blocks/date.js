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
		this.data = data || {};
		this.api = api;
		this.data.required = this.data.required ?? true;
	}

	toggleRequired() {
		this.data.required = !this.data.required;
		this.updateRequiredButton();
	}

	updateRequiredButton() {
		if (this.requiredButton) {
			if (this.data.required) {
				this.requiredButton.innerText = '*';
				this.requiredButton.classList.remove('hidden');
			} else {
				this.requiredButton.innerText = '';
				this.requiredButton.classList.add('hidden');
			}
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

		this.api.listeners.on(this.requiredButton, 'click', () => this.toggleRequired());
		this.api.listeners.on(block, 'keydown', (e) => this.handleKeyDown(e, block));

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
		block.classList.add(
			'relative',
			'text-[#BBBAB8]',
			'caret-black',
			'h-full',
			'w-full',
			'outline-none',
			'ring-0',
			'px-1'
		);
		block.setAttribute('contentEditable', 'true');
		block.dataset.placeholder = 'Type placeholder text';
		block.addEventListener('input', this.updatePlaceholder.bind(this, block));
		this.updatePlaceholder(block);
		return block;
	}

	updatePlaceholder(block) {
		if (block.innerText.trim() === '') {
			block.classList.add("before:focus:content-['Type_placeholder_text']");
		} else {
			block.classList.remove("before:focus:content-['Type_placeholder_text']");
		}
	}

	createSvg() {
		const svg = document.createElement('div');
		svg.innerHTML = DateBlock.toolbox.icon;
		svg.classList.add('absolute', 'right-2', 'top-1/2', '-translate-y-1/2');
		return svg;
	}

	createRequiredButton() {
		const button = document.createElement('button');
		button.classList.add(
			'absolute',
			'-right-2',
			'-top-2',
			'flex',
			'h-4',
			'w-4',
			'items-center',
			'justify-center',
			'rounded-full',
			'bg-[#f3f3f3]',
			'pt-2',
			'text-lg',
			'font-semibold'
		);
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
		return {
			placeholder: blockContent.innerText,
			required: this.data.required
		};
	}
}
