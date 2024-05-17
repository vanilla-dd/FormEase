<script lang="ts">
	import { onMount } from 'svelte';
	import { SimpleImage } from '../../lib/components/blocks/shortAnswer.js';
	onMount(async () => {
		const EditorJs = (await import('@editorjs/editorjs')).default;
		const Undo = await import('editorjs-undo');
		const DragDrop = await import('editorjs-drag-drop');
		const editor = new EditorJs({
			tools: {
				image: SimpleImage
			},
			onReady: () => {
				new Undo({ editor });
				new DragDrop({ editor });
			}
		});
		setInterval(async () => {
			console.log(await editor.save());
		}, 1000);
	});
</script>

<div id="editorjs"></div>
