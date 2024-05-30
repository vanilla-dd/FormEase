import { createRequiredButton, createCheckbox } from './blockUtils';

export class RatingBlock {
	static get toolbox() {
		return {
			title: 'Rating',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="transparent" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`
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
		wrapper.append(titleButton, this.requiredToggle.label);
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

	createStar() {
		const svgNS = 'http://www.w3.org/2000/svg';
		const star = document.createElementNS(svgNS, 'svg');
		star.setAttribute('width', '36');
		star.setAttribute('height', '36');
		star.setAttribute('viewBox', '0 0 24 24');
		star.setAttribute('fill', 'transparent');
		star.setAttribute('stroke', '#BBBAB8');
		star.setAttribute('stroke-width', '2');
		star.setAttribute('stroke-linecap', 'round');
		star.setAttribute('stroke-linejoin', 'round');
		star.classList.add('lucide', 'lucide-star');
		star.classList.add('dark:stroke-[#5A5A5A]');
		const polygon = document.createElementNS(svgNS, 'polygon');
		polygon.setAttribute(
			'points',
			'12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'
		);
		star.appendChild(polygon);

		return star;
	}

	render() {
		const wrapper = document.createElement('div');
		const block = document.createElement('div');

		wrapper.classList.add('relative', 'w-fit', 'mb-2.5', 'pr-2');
		block.classList.add('relative', 'flex');

		for (let i = 0; i < 5; i++) {
			const star = this.createStar();
			block.appendChild(star);

			star.addEventListener('mouseover', () => this.highlightStars(block, i));
			star.addEventListener('mouseout', () => this.resetStars(block));
		}

		wrapper.append(block, this.requiredButton);
		return wrapper;
	}

	highlightStars(block, index) {
		const stars = block.children;
		for (let i = 0; i <= index; i++) {
			stars[i].classList.add('fill-[#FFBE01]', '!stroke-[#FFBE01]');
		}
	}

	resetStars(block) {
		const stars = block.children;
		for (const star of stars) {
			star.classList.remove('fill-[#FFBE01]', '!stroke-[#FFBE01]');
		}
	}

	save(blockContent) {
		return {
			required: this.data.required,
			titleBlockId: this.titleBlockId
		};
	}
}
