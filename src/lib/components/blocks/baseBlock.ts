// /src/BaseBlock.ts
import type { API, BlockAPI, BlockToolData } from '@editorjs/editorjs';
import { createRequiredButton, createCheckbox } from './blockUtils';

export class BaseBlock {
	protected data: BlockToolData;
	protected api: API;
	protected block: BlockAPI;
	protected titleBlockId: string | null;
	protected requiredButton: HTMLElement;

	constructor({ data, api, block }: { data: BlockToolData; api: API; block: BlockAPI }) {
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

	protected toggleRequired = (): void => {
		this.data.required = !this.data.required;
		this.updateRequiredButton();
		this.updateTitleBlock();
	};

	protected updateRequiredButton = (): void => {
		if (this.requiredButton) {
			this.requiredButton.style.display =
				this.data.required && !this.titleBlockId ? 'flex' : 'none';
		}
	};

	private updateTitleBlock = (): void => {
		if (this.titleBlockId) {
			const titleBlock = this.api.blocks.getById(this.titleBlockId);
			if (titleBlock) {
				this.api.blocks.update(this.titleBlockId, { required: this.data.required });
			}
		}
	};

	public renderSettings(): HTMLElement {
		const wrapper = document.createElement('div');
		const requiredToggle = createCheckbox('Required', this.data.required, this.toggleRequired);
		const titleButton = document.createElement('label');
		titleButton.htmlFor = 'title';
		titleButton.innerText = 'Add Title';

		const input = document.createElement('input');
		input.id = 'title';
		input.type = 'checkbox';
		input.addEventListener('click', (e) => {
			this.addTitle(e);
		});
		input.checked = this.titleBlockId ? true : false;
		titleButton.append(input);
		titleButton.classList.add(
			'cdx-settings-button',
			'text-[14px]',
			'font-medium',
			'flex',
			'justify-between',
			'items-center',
			'w-full',
			'px-3',
			'rounded-md'
		);

		wrapper.classList.add('flex', 'flex-col', 'gap-1', 'items-start', 'text-black');
		wrapper.append(requiredToggle.label, titleButton);
		return wrapper;
	}

	private addTitle = (e: Event): void => {
		if (this.titleBlockId) {
			e.preventDefault();
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

	destroy() {
		if (this.titleBlockId) {
			const titleBlock = this.api.blocks.getById(this.titleBlockId);
			if (titleBlock) {
				this.api.blocks.update(this.titleBlockId, { parentId: null });
			}
		}
	}
}
