import type { API, BlockAPI, BlockToolData } from '@editorjs/editorjs';
import { BaseBlock } from './baseBlock';
import { addEventListenersToBlock } from './blockUtils';
import { v4 as uuidv4 } from 'uuid';

export class CheckboxBlock extends BaseBlock {
	static get toolbox() {
		return {
			title: 'Multiple Choice',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 14H3M21 10H3"></path></svg>`
		};
	}

	constructor({ data, api, block }: { data: BlockToolData; api: API; block: BlockAPI }) {
		super({ data, api, block });
		this.data = {
			required: true,
			text: '',
			first: true,
			last: true,
			groupId: uuidv4(),
			index: 0,
			...data
		};
	}

	renderSettings() {
		return super.renderSettings();
	}

	render() {
		const wrapper = document.createElement('div');
		const blockWrapper = document.createElement('div');
		wrapper.classList.add('flex', 'flex-col', 'gap-2', 'w-1/4', 'relative', 'pb-4');
		blockWrapper.classList.add('flex', 'gap-2');
		const block = document.createElement('div');
		const checkboxDiv = document.createElement('div');
		checkboxDiv.classList.add('w-6', 'h-6', 'border', 'rounded-md', 'custom-box-shadow');
		block.setAttribute('data-index', this.data.index + 1);
		block.classList.add(
			'inputBlock',
			`before:content-["Option_"attr(data-index)]`,
			'before:inset-0',
			'before:absolute',
			'relative'
		);
		block.setAttribute('contentEditable', 'true');
		blockWrapper.append(checkboxDiv, block);
		addEventListenersToBlock(block, this.api);

		wrapper.append(blockWrapper);

		if (this.data.last) {
			const fadedBlockWrapper = document.createElement('div');
			const fadedBlock = document.createElement('div');
			const fcheckboxDiv = document.createElement('div');
			fcheckboxDiv.classList.add('w-6', 'border', 'rounded-md', 'custom-box-shadow');
			fadedBlock.classList.add('inputBlock', 'opacity-50', '-ml-1');
			fadedBlock.innerText = `Option ${this.data.index + 2}`;
			fadedBlockWrapper.addEventListener('click', this.addNewOption.bind(this));
			fadedBlockWrapper.append(fcheckboxDiv, fadedBlock);
			fadedBlockWrapper.classList.add('flex', 'gap-2', 'pt-1', 'hover:cursor-pointer');

			wrapper.append(fadedBlockWrapper);
		}

		if (this.data.first) {
			this.requiredButton.addEventListener('click', this.toggleRequired);
			wrapper.append(this.requiredButton);
		}

		return wrapper;
	}

	addNewOption() {
		this.data.last = false;
		this.api.blocks.update(this.block.id, this.data);

		const currentIndex = this.api.blocks.getCurrentBlockIndex();
		this.api.blocks.insert(
			'checkbox',
			{
				required: this.data.required,
				text: '',
				first: false,
				last: true,
				groupId: this.data.groupId,
				index: currentIndex + 1
			},
			{},
			currentIndex + 1
		);
	}

	protected toggleRequired = async () => {
		const blockData = await this.api.saver.save();
		blockData.blocks.map((e) => {
			if (e.data.groupId === this.data.groupId && e.id) {
				this.api.blocks.update(e.id, { ...e.data, required: !e.data.required });
			}
		});
	};

	protected updateRequiredButton = async () => {
		const blockData = await this.api.saver.save();
		blockData.blocks.map((e) => {
			if (e.data.groupId === this.data.groupId && e.id) {
				this.api.blocks.update(e.id, { ...e.data, required: !e.data.required });
			}
		});
	};

	save(blockContent: HTMLElement) {
		const block: HTMLDivElement | null = blockContent.querySelector('.inputBlock');
		return {
			text: block ? block.innerText.trim() : '',
			required: this.data.required,
			titleBlockId: this.titleBlockId,
			first: this.data.first,
			last: this.data.last,
			groupId: this.data.groupId,
			index: this.data.index
		};
	}
	async destroy() {
		const blockData = await this.api.saver.save();
		if (blockData.blocks.length <= 1) return;
		console.log(blockData.blocks.length);
		this.api.blocks.update(blockData.blocks.at(-2)?.id ?? '', { last: true });
	}
}
