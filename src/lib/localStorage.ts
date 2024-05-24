import type { OutputData } from '@editorjs/editorjs';
import { persisted } from 'svelte-persisted-store';

export const FormBuilderData = persisted('FormBuilderData', {
	formMetaData: {
		title: 'fsddsfdf',
		cover: ''
	},
	data: {} as OutputData
});
