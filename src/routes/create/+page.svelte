<script lang="ts">
	import { onMount } from 'svelte';
	import { ShortAnswer } from '$lib/components/blocks/shortAnswer';
	import { LongAnswer } from '$lib/components/blocks/longAnswer';
	onMount(async () => {
		const EditorJs = (await import('@editorjs/editorjs')).default;
		const Undo = await import('editorjs-undo');
		const editor = new EditorJs({
			tools: {
				shortAnswer: {
					class: ShortAnswer
				},
				longAnswer: LongAnswer
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

<div class="custom-box-shadow relative w-1/2 cursor-text rounded-md px-2 py-2 shadow">
	<div
		contenteditable="true"
		class="relative min-h-20 text-base text-[#BBBAB8] caret-black outline-none ring-0 before:absolute before:inset-0 before:content-['Type_placeholder_text']"
		on:input={(e) => {
			e.currentTarget.innerText !== ''
				? e.currentTarget.classList.remove("before:content-['Type_placeholder_text']")
				: e.currentTarget.classList.add("before:content-['Type_placeholder_text']");
		}}
	></div>
	<button
		class="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gray-300 pt-2 text-xl font-semibold"
		>*</button
	>
</div>
