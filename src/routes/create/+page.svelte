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
	onMount(async () => {
		const StoredFormBuilderData = get(FormBuilderData);
		const EditorJs = (await import('@editorjs/editorjs')).default;
		// const Undo = await import('editorjs-undo');
		const editor = new EditorJs({
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
			async onChange(api, event) {
				FormBuilderData.set(await editor.save());
			},
			data: StoredFormBuilderData
		});
	});
</script>

<svelte:head>
	<script src="https://cdn.jsdelivr.net/npm/editorjs-drag-drop"></script>
</svelte:head>

<main class="flex min-h-dvh w-full items-center justify-center">
	<div class="w-full px-4">
		<h1
			class="whitespace-pre-wrap break-words pb-10 text-[40px] font-extrabold leading-none text-[#37352f] caret-current outline-none"
			contenteditable="true"
		>
			Form Title
		</h1>
		<div id="editorjs" class="h-[300px] w-full"></div>
	</div>
</main>
