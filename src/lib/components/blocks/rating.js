export class Rating {
	static get toolbox() {
		return {
			title: 'Rating',
			icon: `
				<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="transparent" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star">
					<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
				</svg>
			`
		};
	}

	constructor({ data, api }) {
		this.data = data || {};
		this.api = api;
	}

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
		const button = document.createElement('button');

		wrapper.classList.add('relative', 'w-fit');
		block.classList.add('relative', 'flex');

		for (let i = 0; i < 5; i++) {
			const star = this.createStar();
			block.appendChild(star);

			star.addEventListener('mouseover', () => this.highlightStars(block, i));
			star.addEventListener('mouseout', () => this.resetStars(block));
		}

		button.innerText = '*';
		button.classList.add(
			'absolute',
			'-right-4',
			'top-0',
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

		this.api.listeners.on(
			button,
			'click',
			() => {
				this.data.required = false;
				button.remove();
			},
			false
		);

		wrapper.appendChild(block);
		wrapper.appendChild(button);

		return wrapper;
	}

	highlightStars(block, index) {
		const stars = block.children;
		for (let i = 0; i <= index; i++) {
			stars[i].classList.add('fill-[#FFBE01]', 'stroke-[#FFBE01]');
		}
	}

	resetStars(block) {
		const stars = block.children;
		for (const star of stars) {
			star.classList.remove('fill-[#FFBE01]', 'stroke-[#FFBE01]');
		}
	}

	save(blockContent) {
		return {
			required: this.data.required ?? true
		};
	}
}
