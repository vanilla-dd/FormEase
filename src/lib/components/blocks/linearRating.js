import { BaseBlock } from './baseBlock';

export class LinearRatingBlock extends BaseBlock {
	static get toolbox() {
		return {
			title: 'Linear Rating',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14a2 2 0 100-4 2 2 0 000 4zM20 14a2 2 0 100-4 2 2 0 000 4zM4 14a2 2 0 100-4 2 2 0 000 4zM21 12H3"></path></svg>`
		};
	}

	constructor({ data, api, block }) {
		super({ data, api, block });
		this.data = { required: true, starting: 1, end: 10, ...data };
		this.wrapper = document.createElement('div');
		this.updateRatingRange();
	}

	renderSettings = () => {
		const wrapper = super.renderSettings();
		const startingInput = this.createNumberInput('Start: ', this.data.starting, (value) => {
			this.data.starting = value;
			this.updateRatingRange();
		});
		const endingInput = this.createNumberInput('End: ', this.data.end, (value) => {
			this.data.end = value;
			this.updateRatingRange();
		});
		wrapper.append(startingInput.label, endingInput.label);
		return wrapper;
	};

	render() {
		const container = document.createElement('div');
		this.updateRatingRange();
		container.append(this.requiredButton, this.wrapper);
		container.classList.add('relative', 'w-fit', 'pb-2.5', 'pr-4');
		return container;
	}

	updateRatingRange = () => {
		if (this.wrapper) {
			this.wrapper.innerHTML = '';
			for (let index = this.data.starting; index <= this.data.end; index++) {
				const ratingElement = document.createElement('div');
				ratingElement.innerText = `${index}`;
				ratingElement.classList.add('ratingElement');
				this.wrapper.append(ratingElement);
			}
			this.wrapper.classList.add('flex', 'gap-2', 'rounded-md', 'flex-wrap');
		}
	};

	createNumberInput(labelText, value, onChange) {
		const input = document.createElement('input');
		input.type = 'number';
		input.value = value.toString();
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
			titleBlockId: this.titleBlockId,
			starting: this.data.starting,
			end: this.data.end
		};
	}
}
