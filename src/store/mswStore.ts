import { create } from 'zustand';

interface MswState {
	isReady: boolean;
	setReady: (ready: boolean) => void;
	reset: () => void;
}

export const useMswStore = create<MswState>((set) => ({
	isReady: false,
	setReady: (ready) => set({ isReady: ready }),
	reset: () => set({ isReady: false }),
}));

export const setMswReady = (ready: boolean) => {
	useMswStore.setState({ isReady: ready });
};