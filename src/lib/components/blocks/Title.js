export class Title {
	constructor({ data, api, block }) {
		this.parentId = data.parentId;
		this.data = data;
		this.api = api;
		this.block = block;
		console.log(this.api.toolbar);
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

		const updatePlaceholder = () => {
			block.classList.toggle(
				"before:content-['Type_placeholder_text']",
				block.innerText.trim() === '' && block.innerText.length === 0
			);
		};

		updatePlaceholder();
		block.addEventListener('input', updatePlaceholder);

		const requiredButton = this.createRequiredButton();
		this.api.listeners.on(block, 'keydown', (e) => {
			if (e.key === 'Backspace' && block.innerText === '') {
				this.api.blocks.delete();
			} else if (e.key === 'Enter') {
				this.api.blocks.insert();
			}
		});

		block.innerText = this.data.placeholder ?? '';

		wrapper.append(block, requiredButton);

		return wrapper;
	}

	createRequiredButton = () => {
		const button = document.createElement('button');
		button.style.display = this.data.required ? 'flex' : 'none';
		button.innerText = '*';
		button.classList.add('requiredButton');
		return button;
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
