<script lang="ts">
	import { onMount } from 'svelte';

	import { FormBuilderData } from '$lib/localStorage';
	import { get } from 'svelte/store';
	import { ArrowRight, ChevronRight } from 'lucide-svelte';
	import FormCover from '$lib/components/FormCover.svelte';
	import {
		DateBlock,
		LinearRatingBlock,
		LinkBlock,
		LongAnswerBlock,
		NumberBlock,
		RatingBlock,
		ShortAnswerBlock,
		Title,
		CheckboxBlock
	} from '$lib/components/blocks/index';

	let editor: any;
	let logoImg: HTMLImageElement;
	const StoredFormBuilderData = get(FormBuilderData);
	onMount(async () => {
		const EditorJs = (await import('@editorjs/editorjs')).default;
		// const Undo = await import('editorjs-undo');
		editor = new EditorJs({
			// autofocus: true,
			tools: {
				// @ts-ignore
				title: Title,
				checkbox: CheckboxBlock,
				shortAnswer: ShortAnswerBlock,
				longAnswer: LongAnswerBlock,
				link: LinkBlock,
				number: NumberBlock,
				date: DateBlock,
				rating: RatingBlock,
				linearRating: LinearRatingBlock
			},
			inlineToolbar: true,
			onReady: () => {
				// @ts-ignore
				new DragDrop(editor);
				// new Undo({ editor });
			},
			async onChange() {
				const editorData = await editor.save();
				FormBuilderData.update((curr) => {
					return { ...curr, data: editorData };
				});
			},
			data: StoredFormBuilderData.data,
			style: { nonce: '' }
		});
	});
</script>

<svelte:head>
	<script src="https://cdn.jsdelivr.net/npm/editorjs-drag-drop"></script>
</svelte:head>
<main
	class={`${$FormBuilderData.settings ? $FormBuilderData.settings.theme : 'light'} flex min-h-dvh flex-col`}
	id="main"
>
	<header class="px-3 py-2">
		<div class="flex items-center gap-1">
			<a href="/" class="group rounded-md p-1.5 transition-colors hover:bg-[#37352f17]">
				<svg
					viewBox="264.7875 152.3327 132.5105 133.3573"
					xmlns="http://www.w3.org/2000/svg"
					class="w-5 fill-[#BBBAB8] transition-colors group-hover:fill-black"
				>
					<path
						d="M 292.024 260.345 C 302.021 275.194 316.774 281.798 334.065 284.005 C 333.949 284.567 333.833 285.129 333.717 285.69 C 330.026 285.229 326.285 285.001 322.658 284.236 C 319.428 283.554 316.205 281.149 313.184 281.464 C 302.088 282.622 295.729 274.91 288.589 268.995 C 280.809 262.55 275.168 254.281 271.571 244.734 C 271.481 244.495 271.092 244.369 270.629 244.039 C 270.204 244.856 269.803 245.627 269.105 246.971 C 268.05 243.129 266.964 239.78 266.218 236.357 C 260.158 208.557 273.083 170.748 310.131 157.026 C 332.073 148.899 352.899 152.096 373.623 160.735 C 378.627 162.821 383.863 164.636 386.996 170.721 C 384.305 170.163 382.331 169.753 378.732 169.006 C 382.641 176.422 393.548 177.835 390.622 187.518 C 389.918 187.383 388.233 187.06 385.889 186.609 C 389.299 191.105 392.354 195.079 395.338 199.108 C 396.021 200.031 396.794 201.094 396.935 202.171 C 397.253 204.585 397.2 207.049 397.298 209.492 C 395.394 208.494 393.489 207.496 391.18 206.286 C 391.18 210.898 391.18 215.977 391.18 221.056 C 390.873 221.062 390.567 221.068 390.261 221.074 C 389.75 218.736 389.661 216.183 388.61 214.12 C 387.556 212.052 385.789 209.308 383.901 208.909 C 379.123 207.899 377.01 204.803 375.207 200.926 C 372.504 195.11 368.152 191.443 361.58 190.769 C 360.618 190.671 359.327 190.776 358.767 190.213 C 350.805 182.188 341.649 185.46 332.783 187.587 C 327.874 188.766 323.184 190.859 318.396 192.54 C 318.222 192.152 318.048 191.763 317.874 191.375 C 319.456 190.432 321.038 189.488 323.052 188.151 C 323.093 187.567 322.701 187.377 322.31 187.188 C 317.659 188.926 312.829 190.298 308.388 192.467 C 291.297 200.816 284.657 222.183 292.869 241.672 C 302.265 263.973 330.835 276.872 353.755 268.955 C 357.785 267.563 361.476 265.19 365.911 262.977 C 363.31 268.89 358.672 272.237 353.434 274.246 C 341.406 278.861 329.316 276.553 317.883 272.196 C 309.428 268.973 301.646 263.986 293.116 259.463 C 292.223 259.086 291.777 259.031 291.332 258.976 C 291.563 259.432 291.794 259.889 292.024 260.345 Z"
					/>
				</svg>
			</a>
			<ChevronRight class="w-5 stroke-[#BBBAB8]" />
			<p class="font-semibold text-[#777672]">
				{$FormBuilderData.formMetaData.title ? $FormBuilderData.formMetaData.title : 'Untitled'}
			</p>
		</div>
	</header>
	<div
		class="grid w-full flex-1 place-items-center pb-10 text-[#37352f] dark:bg-[#191919] dark:text-[#5A5A5A]"
		style="color:{$FormBuilderData.settings.theme === 'custom'
			? $FormBuilderData.settings.colors?.text
			: ''};background-color: {$FormBuilderData.settings.theme === 'custom'
			? $FormBuilderData.settings.colors?.background
			: ''};"
	>
		<FormCover {logoImg} />
		<div class="mt-12 flex w-full max-w-[750px] flex-col items-stretch px-4">
			<div class="relative">
				<h1
					class="place-self-start whitespace-pre-wrap break-words pb-12 text-[40px] font-extrabold leading-none caret-current outline-none md:pl-3"
					contenteditable="true"
					on:keydown={(e) => {
						if (e.key === 'Enter') {
							e.preventDefault();
							editor.focus();
						}
					}}
					on:input={(e) => {
						e.currentTarget.classList.add('dark:text-[#d8d8d8]');
						FormBuilderData.update((curr) => {
							return {
								...curr,
								formMetaData: {
									...curr.formMetaData,
									title: e.currentTarget.innerText
								}
							};
						});
					}}
				>
					{$FormBuilderData.formMetaData.title ? $FormBuilderData.formMetaData.title : 'Form Title'}
				</h1>
				<img
					src={$FormBuilderData.formMetaData.logo || ''}
					alt=""
					class="absolute -top-full w-28 -translate-y-1/3 rounded-full"
					bind:this={logoImg}
				/>
			</div>
			<div id="editorjs" class="min-h-[300px] md:mr-11" />
			<div class="md:pl-2">
				<button
					style="background-color: {$FormBuilderData.settings.theme === 'custom'
						? $FormBuilderData.settings.colors?.buttonBackground
						: ''};color:{$FormBuilderData.settings?.theme === 'custom'
						? $FormBuilderData.settings.colors?.buttonText
						: ''}"
					class="flex items-center gap-1 self-start rounded-md bg-black px-4 py-2 font-bold text-white dark:bg-[#7957FF] dark:text-white"
					>Submit <ArrowRight class="h-4 w-4 stroke-2" /></button
				>
			</div>
		</div>
	</div>
</main>
