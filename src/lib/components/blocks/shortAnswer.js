export class ShortAnswer {
	static get toolbox() {
		return {
			title: 'Short Answer',
			icon: `
		  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24">
			<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 14H3M21 10H3"></path>
		  </svg>
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
		const svg = document.createElement('div');

		svg.innerHTML = `
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24">
		  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 14H3M21 10H3"></path>
		</svg>
	  `;
		svg.classList.add('absolute', 'right-2', 'top-1/2', '-translate-y-1/2');

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

		block.classList.add(
			'relative',
			'text-[#BBBAB8]',
			'caret-black',
			'h-full',
			'w-full',
			'outline-none',
			'ring-0',
			'px-1',
			'before:absolute',
			'before:left-1',
			"before:focus:content-['Type_placeholder_text']"
		);

		block.setAttribute('contentEditable', 'true');
		block.addEventListener('input', (e) => {
			if (!e) return;
			e.currentTarget.innerText !== ''
				? e.currentTarget.classList.remove("before:focus:content-['Type_placeholder_text']")
				: e.currentTarget.classList.add("before:focus:content-['Type_placeholder_text']");
		});

		button.innerText = '*';
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

		this.api.listeners.on(
			button,
			'click',
			() => {
				this.data.required = false;
				button.remove();
			},
			false
		);

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

		wrapper.append(svg, block, button);

		return wrapper;
	}

	save(blockContent) {
		return {
			placeholder: blockContent.innerText,
			required: this.data.required ?? true
		};
	}
}
