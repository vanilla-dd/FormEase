import type { OutputData } from '@editorjs/editorjs';
import { persisted } from 'svelte-persisted-store';

export const FormBuilderData = persisted('FormBuilderData', {
	settings: {
		theme: '',
		colors: {
			accent: '',
			background: '',
			buttonBackground: '',
			buttonText: '',
			text: ''
		}
	},
	formMetaData: {
		title: '',
		cover: '',
		logo: ''
	},
	data: {} as OutputData
});
