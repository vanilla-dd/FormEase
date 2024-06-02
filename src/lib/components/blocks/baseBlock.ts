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

	private toggleRequired = (): void => {
		this.data.required = !this.data.required;
		this.updateRequiredButton();
		this.updateTitleBlock();
	};

	private updateRequiredButton = (): void => {
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
		const titleButton = document.createElement('button');
		titleButton.innerText = 'Add Title';
		titleButton.addEventListener('click', this.addTitle);
		wrapper.append(requiredToggle.label, titleButton);
		return wrapper;
	}

	private addTitle = (): void => {
		if (this.titleBlockId) {
			alert('A Title block already exists for this block.');
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
}
