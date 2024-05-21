<script lang="ts">
	import { onMount } from 'svelte';
	import { ShortAnswer } from '$lib/components/blocks/shortAnswer';
	import { LongAnswer } from '$lib/components/blocks/longAnswer';
	import { Link } from '$lib/components/blocks/link';
	import { DateBlock } from '$lib/components/blocks/date';
	import { Rating } from '$lib/components/blocks/rating';
	import { Number } from '$lib/components/blocks/number';
	import { LinearRatingBlock } from '$lib/components/blocks/linearRating';
	onMount(async () => {
		const EditorJs = (await import('@editorjs/editorjs')).default;
		const Undo = await import('editorjs-undo');
		const editor = new EditorJs({
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
				new DragDrop(editor);
				new Undo({ editor });
			}
		});
		setInterval(async () => {
			console.log(await editor.save());
		}, 5000);
	});
</script>

<svelte:head>
	<script src="https://cdn.jsdelivr.net/npm/editorjs-drag-drop"></script>
</svelte:head>

<div id="editorjs"></div>

<div class="relative flex w-fit cursor-text gap-2 rounded-md px-2 py-2">
	{#each Array(10) as ar, i}
		<div class="rounded-md bg-gray-400 px-4 py-2">{i}</div>
	{/each}
	<button
		class="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gray-300 pt-2 text-xl font-semibold"
		>*</button
	>
</div>
