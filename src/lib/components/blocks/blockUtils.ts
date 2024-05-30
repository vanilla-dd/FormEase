import type { API } from '@editorjs/editorjs';

export function createRequiredButton(
	isRequired: boolean,
	toggleRequired: () => void,
	titleBlockId: string
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
	input.type = 'checkbox';
	input.checked = checked;
	input.addEventListener('change', onChange);

	const label = document.createElement('label');
	label.innerText = labelText;
	label.classList.add('cdx-settings-button');
	label.append(input);

	return { label, input };
}

export function addEventListenersToBlock(block: HTMLElement, api: API) {
	block.addEventListener('input', () => {
		block.classList.toggle(
			"before:focus:content-['Type_placeholder_text']",
			block.innerText.trim() === ''
		);
	});

	block.addEventListener('keydown', (e) => {
		if (e.key === 'Backspace' && block.innerText === '') {
			api.blocks.delete();
		} else if (e.key === 'Enter') {
			api.blocks.insert();
		}
	});
}
