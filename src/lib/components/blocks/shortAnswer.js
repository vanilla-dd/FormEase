export class SimpleImage {
	static get toolbox() {
		return {
			title: 'Short Answer',
			icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
		};
	}

	render() {
		const wrapper = document.createElement('div');
		const block = document.createElement('div');
		block.setAttribute('contentEditable', 'true');
		wrapper.classList.add(
			'relative',
			'cursor-text',
			'custom-box-shadow',
			'w-1/2',
			'rounded-md',
			'px-2',
			'py-2'
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
			"before:content-['Type_placeholder_text']"
		);
		block.addEventListener('input', (e) => {
			if (!e) return;
			e.currentTarget.innerText !== ''
				? e.currentTarget.classList.remove("before:content-['Type_placeholder_text']")
				: e.currentTarget.classList.add("before:content-['Type_placeholder_text']");
		});
		const buttom = document.createElement('button');
		this.api.listeners.on(
			buttom,
			'click',
			() => {
				this.data.required = false;
				console.log('Button clicked! Required field set to false.');
				buttom.remove();
			},
			false
		);
		// this.api.listeners.off(
		// 	buttom,
		// 	'click',
		// 	() => {
		// 		console.log('Button clicked!');
		// 	},
		// 	false
		// );
		buttom.innerText = '*';
		wrapper.appendChild(buttom);
		wrapper.appendChild(block);
		buttom.classList.add(
			'absolute',
			'-right-2',
			'-top-2',
			'flex',
			'h-4',
			'w-4',
			'items-center',
			'justify-center',
			'rounded-full',
			'bg-gray-300',
			'pt-2',
			'text-xl',
			'font-semibold'
		);
		return wrapper;
	}

	save(blockContent) {
		return {
			placeholder: blockContent.innerText,
			required: this.data.required ?? true
		};
	}
	constructor({ data, api }) {
		this.data = data;
		this.api = api;
	}
}
