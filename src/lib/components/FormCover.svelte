<!--TODO: refactor to diffrent components -->
<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet';
	import { FormBuilderData } from '$lib/localStorage';
	import { Info } from 'lucide-svelte';
	import SheetData from './SheetData.svelte';

	let coverImg: HTMLImageElement;
	// mabye store in localstorage?
	export let logoImg: HTMLImageElement;

	let designPanelState = false;
	//TODO: refactor
	const buttons = [
		{
			text: 'Add logo',
			logo: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-top"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><line x1="3" x2="21" y1="9" y2="9"></line></svg>`,
			active:
				$FormBuilderData.formMetaData && $FormBuilderData.formMetaData?.logo !== '' ? true : false,
			action: () => {
				logoImg.src = './form-logo.jpg';
				FormBuilderData.update((curr) => {
					return { ...curr, formMetaData: { ...curr.formMetaData, logo: './form-logo.jpg' } };
				});
			}
		},
		{
			text: 'Add cover',
			logo: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hexagon"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>`,
			active:
				$FormBuilderData.formMetaData && $FormBuilderData.formMetaData?.cover !== '' ? true : false,
			action: () => {
				coverImg.src = './form-cover.jpg';
				coverImg.style.visibility = 'visible';
				FormBuilderData.update((curr) => {
					return { ...curr, formMetaData: { ...curr.formMetaData, cover: './form-cover.jpg' } };
				});
			}
		},
		{
			text: 'Design',
			logo: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-palette"><circle cx="13.5" cy="6.5" r=".5"></circle><circle cx="17.5" cy="10.5" r=".5"></circle><circle cx="8.5" cy="7.5" r=".5"></circle><circle cx="6.5" cy="12.5" r=".5"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path></svg>`,
			// active: false,
			action: () => {
				designPanelState = !designPanelState;
			}
		}
	];
</script>

<Sheet.Root open={designPanelState}>
	<Sheet.Content class="flex flex-col p-2 sm:px-4 sm:py-3">
		<Sheet.Header>
			<Sheet.Title>Design</Sheet.Title>
			<Sheet.Description>Customize form apperance</Sheet.Description>
		</Sheet.Header>
		<SheetData />
		<Sheet.Footer>
			<Sheet.Description class="flex gap-2">
				<Info class="stroke-blue-500" /> This is still work in progress more options will be added soon...
			</Sheet.Description>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>

<div class="group/buttons relative flex h-[20vh] w-full items-center justify-center bg-transparent">
	<div class="h-full w-full">
		<img
			bind:this={coverImg}
			src={$FormBuilderData.formMetaData?.cover || ''}
			class={`${buttons[1].active ? 'block' : 'invisible'} h-full w-full border-none outline-none`}
			alt="form-cover"
		/>
	</div>
	<div
		class="absolute -bottom-12 flex w-full justify-center gap-2 pb-1 pt-2 text-[#898884] opacity-0 focus-within:opacity-100 hover:opacity-100 group-hover/buttons:opacity-100"
	>
		{#each buttons as button}
			<button
				class={`${button.active ? '!hidden' : 'flex'} items-center justify-center gap-1 rounded-md px-2.5 py-1.5 text-sm font-semibold transition-colors hover:bg-[#37352f17] hover:text-[#37352f] dark:text-[#8A8A8A] dark:hover:bg-[#ffffff0e] dark:hover:text-[#D8D8D8]`}
				on:click={() => {
					if (button.text !== 'Design') {
						button.active = true;
					}
					button.action();
				}}
			>
				{@html button.logo}
				<span>
					{button.text}
				</span>
			</button>
		{/each}
	</div>
</div>
