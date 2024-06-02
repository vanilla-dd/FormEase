<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet';
	import { FormBuilderData } from '$lib/localStorage';
	import { Info, Moon, Sun } from 'lucide-svelte';

	let coverImg: HTMLImageElement;
	// mabye store in localstorage?
	let customSettingState = $FormBuilderData.settings.theme === 'custom' ? true : false;
	export let logoImg: HTMLImageElement;

	let designPanelState = false;
	//TODO: refactor
	const buttons = [
		{
			text: 'Add logo',
			logo: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-top"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><line x1="3" x2="21" y1="9" y2="9"></line></svg>`,
			active: $FormBuilderData.formMetaData
				? $FormBuilderData.formMetaData?.logo !== ''
					? true
					: false
				: false,
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
			active: $FormBuilderData.formMetaData
				? $FormBuilderData.formMetaData?.cover !== ''
					? true
					: false
				: false,
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
	<Sheet.Content class="flex flex-col">
		<Sheet.Header>
			<Sheet.Title>Design</Sheet.Title>
			<Sheet.Description>Customize form apperance</Sheet.Description>
		</Sheet.Header>
		<div class="flex-1">
			<div class="flex gap-4">
				<button
					class="flex h-[68px] w-20 flex-col items-center justify-center rounded-md bg-white text-xs"
					style="box-shadow:{$FormBuilderData.settings.theme === 'light' ||
					!$FormBuilderData.settings.theme
						? 'rgb(0, 122, 255) 0px 0px 0px 2px, rgba(61, 59, 53, 0.16) 0px 0px 0px 1px'
						: ''};color:{$FormBuilderData.settings.theme === 'light' ? '#007AFF' : ''};"
					on:click={() => {
						customSettingState = false;
						FormBuilderData.update((curr) => {
							return { ...curr, settings: { ...curr.settings, theme: 'light' } };
						});
					}}
				>
					<Sun class="mb-1.5 h-5 w-5" />
					Light</button
				>
				<button
					class="flex h-[68px] w-20 flex-col items-center justify-center rounded-md bg-white text-xs"
					style="box-shadow:{$FormBuilderData.settings.theme === 'dark'
						? 'rgb(0, 122, 255) 0px 0px 0px 2px, rgba(61, 59, 53, 0.16) 0px 0px 0px 1px'
						: ''};color:{$FormBuilderData.settings.theme === 'dark' ? '#007AFF' : ''};"
					on:click={() => {
						customSettingState = false;
						FormBuilderData.update((curr) => {
							return { ...curr, settings: { ...curr.settings, theme: 'dark' } };
						});
					}}
				>
					<Moon class="mb-1.5 h-5 w-5" />
					Dark</button
				>
				<button
					class="flex h-[68px] w-20 flex-col items-center justify-center rounded-md bg-white text-xs"
					style="box-shadow:{$FormBuilderData.settings.theme === 'custom'
						? 'rgb(0, 122, 255) 0px 0px 0px 2px, rgba(61, 59, 53, 0.16) 0px 0px 0px 1px'
						: ''};color:{$FormBuilderData.settings.theme === 'custom' ? '#007AFF' : ''};"
					on:click={() => {
						customSettingState = true;
						FormBuilderData.update((curr) => {
							return { ...curr, settings: { ...curr.settings, theme: 'custom' } };
						});
						$FormBuilderData.settings.colors = $FormBuilderData.settings.colors;
					}}
				>
					<Sun class="mb-1.5 h-5 w-5" />
					Custom</button
				>
			</div>

			{#if customSettingState}
				<div class="mt-8 text-xs text-[#777672]">
					<div class="mb-3 flex items-center justify-center">
						<div class="flex-1">Background</div>
						<div class="custom-box-shadow flex h-9 flex-1 gap-3 rounded">
							<div
								style="background-color: {$FormBuilderData.settings.colors};"
								class="relative left-1.5 top-1/2 h-full max-h-6 w-full max-w-6 -translate-y-1/2 rounded border-2 border-[#37352f17]"
							></div>
							<input
								type="text"
								value={$FormBuilderData.settings.colors.background}
								class="h-full w-full appearance-none border-0 bg-transparent text-base text-[#37352f] outline-none ring-0"
								on:input={(e) => {
									FormBuilderData.update((curr) => {
										return {
											...curr,
											settings: {
												...curr.settings,
												colors: {
													...curr.settings.colors,
													background: e.currentTarget.value
												}
											}
										};
									});
								}}
							/>
						</div>
					</div>
					<div class="mb-3 flex items-center justify-center">
						<div class="flex-1">Text</div>
						<div class="custom-box-shadow flex h-9 flex-1 gap-3 rounded">
							<div
								style="color: {$FormBuilderData.settings.colors.text};"
								class="relative left-1.5 top-1/2 h-full max-h-6 w-full max-w-6 -translate-y-1/2 rounded border-2 border-[#37352f17]"
							></div>
							<input
								type="text"
								value={$FormBuilderData.settings.colors.text}
								class="h-full w-full appearance-none border-0 bg-transparent text-base text-[#37352f] outline-none ring-0"
								on:input={(e) => {
									FormBuilderData.update((curr) => {
										return {
											...curr,
											settings: {
												...curr.settings,
												colors: {
													...curr.settings.colors,
													text: e.currentTarget.value
												}
											}
										};
									});
								}}
							/>
						</div>
					</div>
					<div class="mb-3 flex items-center justify-center">
						<div class="flex-1">Button Background</div>
						<div class="custom-box-shadow flex h-9 flex-1 gap-3 rounded">
							<div
								style="background-color: {$FormBuilderData.settings.colors.buttonBackground};"
								class="relative left-1.5 top-1/2 h-full max-h-6 w-full max-w-6 -translate-y-1/2 rounded border-2 border-[#37352f17]"
							></div>
							<input
								type="text"
								value={$FormBuilderData.settings.colors.buttonBackground}
								class="h-full w-full appearance-none border-0 bg-transparent text-base text-[#37352f] outline-none ring-0"
								on:input={(e) => {
									FormBuilderData.update((curr) => {
										return {
											...curr,
											settings: {
												...curr.settings,
												colors: {
													...curr.settings.colors,
													buttonBackground: e.currentTarget.value
												}
											}
										};
									});
								}}
							/>
						</div>
					</div>
					<div class="mb-3 flex items-center justify-center">
						<div class="flex-1">Button text</div>
						<div class="custom-box-shadow flex h-9 flex-1 gap-3 rounded">
							<div
								style="background-color: {$FormBuilderData.settings.colors.buttonText};"
								class="relative left-1.5 top-1/2 h-full max-h-6 w-full max-w-6 -translate-y-1/2 rounded border-2 border-[#37352f17]"
							></div>
							<input
								type="text"
								value={$FormBuilderData.settings.colors.buttonText}
								class="h-full w-full appearance-none border-0 bg-transparent text-base text-[#37352f] outline-none ring-0"
								on:input={(e) => {
									FormBuilderData.update((curr) => {
										return {
											...curr,
											settings: {
												...curr.settings,
												colors: {
													...curr.settings.colors,
													buttonText: e.currentTarget.value
												}
											}
										};
									});
								}}
							/>
						</div>
					</div>
					<div class="mb-3 flex items-center justify-center">
						<div class="flex-1">Accent</div>
						<div class="custom-box-shadow flex h-9 flex-1 gap-3 rounded">
							<div
								style="background-color: {$FormBuilderData.settings.colors.accent};"
								class="relative left-1.5 top-1/2 h-full max-h-6 w-full max-w-6 -translate-y-1/2 rounded border-2 border-[#37352f17]"
							></div>
							<input
								type="text"
								value={$FormBuilderData.settings.colors.accent}
								class="h-full w-full appearance-none border-0 bg-transparent text-base text-[#37352f] outline-none ring-0"
								on:input={(e) => {
									FormBuilderData.update((curr) => {
										return {
											...curr,
											settings: {
												...curr.settings,
												colors: {
													...curr.settings.colors,
													accent: e.currentTarget.value
												}
											}
										};
									});
								}}
							/>
						</div>
					</div>
				</div>
			{/if}
		</div>

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
