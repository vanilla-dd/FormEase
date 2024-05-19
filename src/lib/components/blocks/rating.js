export class Rating {
	static get toolbox() {
		return {
			title: 'Rating',
			icon: `
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="transparent" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
		`
		};
	}

	constructor({ data, api }) {
		this.data = data;
		this.api = api;
	}

	render() {
		const wrapper = document.createElement('div');
		const block = document.createElement('div');
		const button = document.createElement('button');

		wrapper.classList.add('relative', 'w-fit');

		block.classList.add('relative', 'flex');
		block.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="transparent" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="transparent" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="transparent" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="transparent" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="transparent" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
		button.innerText = '*';
		[...block.children].map((e) => {
			e.classList.add('hover:fill-[#FFBE01]', 'hover:stroke-[#FFBE01]', 'stroke-[#BBBAB8]');
		});
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

	save(blockContent) {
		return {
			placeholder: blockContent.innerText,
			required: this.data.required ?? true
		};
	}
}
