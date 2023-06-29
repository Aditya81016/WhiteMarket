import { writable } from 'svelte/store';
import type { DocumentData } from 'firebase/firestore';

export const userData = writable({} as DocumentData);
export const currentPage = writable('Root');
export const successColor = writable('#50dd50');
export const dangerColor = writable('#dd5050');
