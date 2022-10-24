import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const PageButtonNum = atom({
	key: 'PageButtonNum',
	default: 0,
	effects_UNSTABLE: [persistAtom],
});
