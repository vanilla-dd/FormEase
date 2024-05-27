import type { OutputData } from '@editorjs/editorjs';
import { persisted } from 'svelte-persisted-store';

export const FormBuilderData = persisted('FormBuilderData', {
	settings: { theme: 'light' },
	formMetaData: {
		title: '',
		cover: '',
		logo: ''
	},
	data: {} as OutputData
});
