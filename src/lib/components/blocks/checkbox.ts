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

	constructor({ data, api, block }) {
		super({ data, api, block });
		this.data = { required: true, text: '', first: true, last: true, groupId: uuidv4(), ...data };
	}

	renderSettings() {
		return super.renderSettings();
	}

	render() {
		const wrapper = document.createElement('div');
		wrapper.classList.add('flex', 'flex-col', 'gap-2', 'w-1/4', 'relative');

		const block = document.createElement('div');
		block.classList.add('inputBlock', 'border');
		block.setAttribute('contentEditable', 'true');
		block.innerText = this.data.text;
		addEventListenersToBlock(block, this.api);

		wrapper.append(block);

		if (this.data.last) {
			const fadedBlock = document.createElement('div');
			fadedBlock.classList.add('inputBlock', 'border', 'opacity-50');
			fadedBlock.setAttribute('contentEditable', 'true');
			fadedBlock.innerText = 'Click to add another option...';
			fadedBlock.addEventListener('click', this.addNewOption.bind(this));

			wrapper.append(fadedBlock);
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
				groupId: this.data.groupId
			},
			{},
			currentIndex + 1
		);
	}

	toggleRequired = async () => {
		const blocksCount = this.api.blocks.getBlocksCount();

		for (let i = 0; i < blocksCount; i++) {
			const blockAPI = this.api.blocks.getBlockByIndex(i);
			if (blockAPI) {
				const blockData = await blockAPI.save();
				console.log('Block Data:', blockData);
				if (blockData.data.groupId === this.data.groupId) {
					console.log(this.data.required);
					this.api.blocks.update(blockAPI.id, { ...blockData, required: !this.data.required });
				}
			}
		}
	};

	save(blockContent: HTMLElement) {
		const block: HTMLDivElement | null = blockContent.querySelector('.inputBlock');
		return {
			text: block ? block.innerText.trim() : '',
			required: this.data.required,
			titleBlockId: this.titleBlockId,
			first: this.data.first,
			last: this.data.last,
			groupId: this.data.groupId
		};
	}
}
