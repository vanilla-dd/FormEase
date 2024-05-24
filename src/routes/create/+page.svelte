<script lang="ts">
	import { onMount } from 'svelte';
	import { ShortAnswer } from '$lib/components/blocks/shortAnswer';
	import { LongAnswer } from '$lib/components/blocks/longAnswer';
	import { Link } from '$lib/components/blocks/link';
	import { DateBlock } from '$lib/components/blocks/date';
	import { Rating } from '$lib/components/blocks/rating';
	import { Number } from '$lib/components/blocks/number';
	import { LinearRatingBlock } from '$lib/components/blocks/linearRating';
	import { FormBuilderData } from '$lib/localStorage';
	import { get } from 'svelte/store';
	import { ChevronRight } from 'lucide-svelte';
	let editor: any;
	const StoredFormBuilderData = get(FormBuilderData);
	onMount(async () => {
		const EditorJs = (await import('@editorjs/editorjs')).default;
		// const Undo = await import('editorjs-undo');
		editor = new EditorJs({
			// autofocus: true,
			tools: {
				shortAnswer: ShortAnswer,
				longAnswer: LongAnswer,
				link: Link,
				number: Number,
				date: DateBlock,
				rating: Rating,
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

	let coverImg: HTMLImageElement;
	const buttons = [
		{
			text: 'Add logo',
			logo: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-top"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><line x1="3" x2="21" y1="9" y2="9"></line></svg>`,
			active: false,
			action: () => {}
		},
		{
			text: 'Add cover',
			logo: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hexagon"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>`,
			active: $FormBuilderData.formMetaData?.cover !== '' ? true : false,
			action: () => {
				coverImg.src = './form-cover.jpg';
				coverImg.style.visibility = 'visible';
				$FormBuilderData.formMetaData.cover = './form-cover.jpg';
			}
		},
		{
			text: 'Design',
			logo: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-palette"><circle cx="13.5" cy="6.5" r=".5"></circle><circle cx="17.5" cy="10.5" r=".5"></circle><circle cx="8.5" cy="7.5" r=".5"></circle><circle cx="6.5" cy="12.5" r=".5"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path></svg>`,
			active: false,
			action: () => {}
		}
	];
</script>

<svelte:head>
	<script src="https://cdn.jsdelivr.net/npm/editorjs-drag-drop"></script>
</svelte:head>

<main class="flex min-h-dvh flex-col">
	<header class="px-3 pt-4">
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
				{$FormBuilderData.formMetaData?.title || 'Untitled'}
			</p>
		</div>
	</header>
	<div class="grid w-full flex-1 place-items-center">
		<div
			class="group/buttons relative -mt-8 flex h-[25vh] w-full items-center justify-center bg-transparent"
		>
			<img
				bind:this={coverImg}
				src={$FormBuilderData.formMetaData?.cover || ''}
				class={`${buttons[1].active ? 'block' : 'invisible'} h-full w-full border-none outline-none`}
				alt="form-cover"
			/>
			<div
				class="absolute -bottom-14 flex w-full justify-center gap-2 py-4 text-[#898884] opacity-0 focus-within:opacity-100 hover:opacity-100 group-hover/buttons:opacity-100"
			>
				{#each buttons as button}
					<button
						class={`${button.active ? '!hidden' : 'flex'} items-center justify-center gap-1 rounded-md px-2 py-1 text-sm font-semibold transition-colors hover:bg-[#37352f17] hover:text-[#37352f]`}
						on:click={() => {
							button.active = true;
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
		<div class="-mt-10 w-full max-w-[620px] px-4">
			<h1
				class="place-self-start whitespace-pre-wrap break-words pb-10 text-[40px] font-extrabold leading-none text-[#37352f] caret-current outline-none"
				contenteditable="true"
				on:keydown={(e) => {
					if (e.key === 'Enter') {
						e.preventDefault();
						editor.focus();
					}
				}}
				on:input={(e) => {
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
				{$FormBuilderData.formMetaData?.title || 'Form Title'}
			</h1>
			<div id="editorjs" class="h-[300px]"></div>
		</div>
	</div>
</main>
