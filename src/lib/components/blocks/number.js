export class Number {
	static get toolbox() {
		return {
			title: 'Number',
			icon: `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hash"><line x1="4" x2="20" y1="9" y2="9"></line><line x1="4" x2="20" y1="15" y2="15"></line><line x1="10" x2="8" y1="3" y2="21"></line><line x1="16" x2="14" y1="3" y2="21"></line></svg>
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
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hash"><line x1="4" x2="20" y1="9" y2="9"></line><line x1="4" x2="20" y1="15" y2="15"></line><line x1="10" x2="8" y1="3" y2="21"></line><line x1="16" x2="14" y1="3" y2="21"></line></svg>
	  `;
		svg.classList.add('absolute', 'right-2', 'top-1/2', '-translate-y-1/2');

		wrapper.classList.add(
			'relative',
			'cursor-text',
			'custom-box-shadow',
			'w-1/2',
			'rounded-md',
			'px-2',
			'py-1.5'
		);

		block.classList.add(
			'relative',
			'text-[#BBBAB8]',
			'caret-black',
			'h-full',
			'w-full',
			'outline-none',
			'ring-0',
			'before:absolute',
			'before:inset-0',
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

		wrapper.appendChild(svg);
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
