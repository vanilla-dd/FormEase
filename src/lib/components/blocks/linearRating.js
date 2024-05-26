export class LinearRatingBlock {
	static toolbox = {
		title: 'Linear Rating',
		icon: `
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24">
		  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14a2 2 0 100-4 2 2 0 000 4zM20 14a2 2 0 100-4 2 2 0 000 4zM4 14a2 2 0 100-4 2 2 0 000 4zM21 12H3"></path>
		</svg>
	  `
	};

	constructor({ data, api }) {
		this.data = { required: true, starting: 1, end: 10, ...data };
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

	renderSettings = () => {
		this.requiredToggle = this.createCheckbox('Required', this.data.required, this.toggleRequired);
		const wrapper = document.createElement('div');
		const startingInput = this.createNumberInput('Start: ', this.data.starting, (value) => {
			this.data.starting = value;
			this.updateRatingRange();
		});
		const endingInput = this.createNumberInput('End: ', this.data.end, (value) => {
			this.data.end = value;
			this.updateRatingRange();
		});
		wrapper.append(this.requiredToggle.label, startingInput.label, endingInput.label);
		return wrapper;
	};

	render() {
		const container = document.createElement('div');
		this.wrapper = document.createElement('div');
		this.updateRatingRange();
		this.requiredButton = this.createRequiredButton();
		this.api.listeners.on(this.requiredButton, 'click', this.toggleRequired);
		container.append(this.requiredButton, this.wrapper);
		this.updateRequiredButton();
		container.classList.add('relative', 'w-fit', 'pb-2.5', 'pr-2');

		return container;
	}

	updateRatingRange = () => {
		if (this.wrapper) {
			this.wrapper.innerHTML = '';
			for (let index = this.data.starting; index <= this.data.end; index++) {
				const ratingElement = document.createElement('div');
				ratingElement.innerText = `${index}`;
				ratingElement.classList.add(
					'rounded-md',
					'custom-box-shadow',
					'dark:custom-box-shadow-dark',
					'dark:bg-[#ffffff0e]',
					'dark:text-[#D8D8D8]',
					'font-500',
					'cursor-pointer',
					'bg-white',
					'flex',
					'justify-center',
					'items-center',
					'min-w-9',
					'min-h-9',
					'custom-box-shadow'
				);
				this.wrapper.append(ratingElement);
			}
			this.wrapper.classList.add('flex', 'gap-2', 'rounded-md', 'flex-wrap');
		}
	};

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

	createNumberInput(labelText, value, onChange) {
		const input = document.createElement('input');
		input.type = 'number';
		input.value = value;
		input.addEventListener('input', (e) => {
			const newValue = parseInt(e.target.value, 10);
			onChange(isNaN(newValue) ? value : newValue);
		});

		const label = document.createElement('label');
		label.innerText = labelText;
		label.append(input);

		return { label, input };
	}
	save() {
		return {
			required: this.data.required,
			starting: this.data.starting,
			end: this.data.end
		};
	}
}
