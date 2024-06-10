import type { API } from '@editorjs/editorjs';

export function createRequiredButton(
	isRequired: boolean,
	toggleRequired: () => void,
	titleBlockId: string | null
) {
	const button = document.createElement('button');
	button.innerText = isRequired ? '*' : '';
	button.classList.add('requiredButton');
	button.style.display = titleBlockId ? 'none' : isRequired ? 'flex' : 'none';
	button.addEventListener('click', toggleRequired);
	return button;
}

export function createCheckbox(labelText: string, checked: boolean, onChange: () => void) {
	const input = document.createElement('input');
	input.id = 'required';
	input.type = 'checkbox';
	input.checked = checked;
	input.addEventListener('change', onChange);

	const label = document.createElement('label');
	label.htmlFor = 'required';
	label.innerText = labelText;
	label.classList.add('cdx-settings-button', 'font-medium', 'text-[14px]');
	label.append(input);

	label.classList.add('flex', 'justify-between', 'items-center', 'w-full', 'px-3', 'rounded-md');
	return { label };
}

export function addEventListenersToBlock(block: HTMLElement, api: API) {
	block.addEventListener('input', () => {
		block.classList.toggle(
			"before:focus:content-['Type_placeholder_text']",
			block.innerText.trim() === ''
		);
	});

	block.addEventListener('keydown', (e) => {
		if (e.key === 'Backspace' && block.innerText.trim() === '') {
			e.preventDefault();
			e.stopPropagation();
			const blockIndex = api.blocks.getCurrentBlockIndex();
			if (blockIndex !== -1) {
				api.blocks.delete(blockIndex);
			}
			api.caret.setToPreviousBlock('end', blockIndex);
		} else if (e.key === 'Enter') {
			e.preventDefault();
			e.stopPropagation();
			api.blocks.insert();
			api.caret.setToNextBlock();
		}
	});
}
