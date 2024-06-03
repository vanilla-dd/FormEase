<script lang="ts">
	let customSettingState = $FormBuilderData.settings.theme === 'custom' ? true : false;
	import { FormBuilderData } from '$lib/localStorage';
	import { Moon, Sun } from 'lucide-svelte';
</script>

<div class="flex-1">
	<div class="flex gap-2 sm:gap-3">
		<button
			class="custom-box-shadow flex h-[68px] w-20 flex-col items-center justify-center rounded-md bg-white text-xs"
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
			class="custom-box-shadow flex h-[68px] w-20 flex-col items-center justify-center rounded-md bg-white text-xs"
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
			class="custom-box-shadow flex h-[68px] w-20 flex-col items-center justify-center rounded-md bg-white text-xs"
			style="box-shadow:{$FormBuilderData.settings.theme === 'custom'
				? 'rgb(0, 122, 255) 0px 0px 0px 2px, rgba(61, 59, 53, 0.16) 0px 0px 0px 1px'
				: ''};color:{$FormBuilderData.settings.theme === 'custom' ? '#007AFF' : ''};"
			on:click={() => {
				customSettingState = true;
				FormBuilderData.update((curr) => {
					return {
						...curr,
						settings: {
							theme: 'custom',
							colors: curr.settings?.colors
						}
					};
				});
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
						style="background-color: {$FormBuilderData.settings.colors?.background};"
						class="relative left-1.5 top-1/2 h-full max-h-6 w-full max-w-6 -translate-y-1/2 rounded border-2 border-[#37352f17]"
					></div>
					<input
						type="text"
						value={$FormBuilderData.settings.colors?.background}
						class="h-full w-full appearance-none border-0 bg-transparent text-xs text-[#37352f] outline-none ring-0 sm:text-sm md:text-base"
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
				<div class="custom-box-shadow flex h-8 flex-1 gap-3 rounded">
					<div
						style="background-color: {$FormBuilderData.settings.colors?.text};"
						class="relative left-1.5 top-1/2 h-full max-h-5 w-full max-w-5 -translate-y-1/2 rounded border-2 border-[#37352f17]"
					></div>
					<input
						type="text"
						value={$FormBuilderData.settings.colors?.text}
						class="h-full w-full appearance-none border-0 bg-transparent text-xs text-[#37352f] outline-none ring-0 sm:text-sm md:text-base"
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
				<div class="custom-box-shadow flex h-8 flex-1 gap-3 rounded">
					<div
						style="background-color: {$FormBuilderData.settings.colors?.buttonBackground};"
						class="relative left-1.5 top-1/2 h-full max-h-5 w-full max-w-5 -translate-y-1/2 rounded border-2 border-[#37352f17]"
					></div>
					<input
						type="text"
						value={$FormBuilderData.settings.colors?.buttonBackground}
						class="h-full w-full appearance-none border-0 bg-transparent text-xs text-[#37352f] outline-none ring-0 sm:text-sm md:text-base"
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
						style="background-color: {$FormBuilderData.settings.colors?.buttonText};"
						class="relative left-1.5 top-1/2 h-full max-h-6 w-full max-w-6 -translate-y-1/2 rounded border-2 border-[#37352f17]"
					></div>
					<input
						type="text"
						value={$FormBuilderData.settings.colors?.buttonText}
						class="h-full w-full appearance-none border-0 bg-transparent text-xs text-[#37352f] outline-none ring-0 sm:text-sm md:text-base"
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
						style="background-color: {$FormBuilderData.settings.colors?.accent};"
						class="relative left-1.5 top-1/2 h-full max-h-6 w-full max-w-6 -translate-y-1/2 rounded border-2 border-[#37352f17]"
					></div>
					<input
						type="text"
						value={$FormBuilderData.settings.colors?.accent}
						class="h-full w-full appearance-none border-0 bg-transparent text-xs text-[#37352f] outline-none ring-0 sm:text-sm md:text-base"
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
