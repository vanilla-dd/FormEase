import type { OutputData } from '@editorjs/editorjs';
import { persisted } from 'svelte-persisted-store';

export const FormBuilderData = persisted('FormBuilderData', {
	settings: {
		theme: '',
		colors: {
			accent: '#007AFF',
			background: '#FFFFFF',
			buttonBackground: '#000000',
			buttonText: '#FFFFFF',
			text: '#37352f'
		}
	},
	formMetaData: {
		title: '',
		cover: '',
		logo: ''
	},
	data: {} as OutputData
});
