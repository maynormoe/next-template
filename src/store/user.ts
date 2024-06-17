import { produce } from 'immer';
import { create } from 'zustand';

type State = {
  user: {
    name: string;
  };
};

type Action = {
  updateUser: (name: string) => void;
};

type Store = State & Action;

export const useUserStore = create<Store>()((set) => ({
  user: {
    name: '',
  },
  updateUser: (name: string) => {
    set(
      produce(({ user }: State) => {
        user.name = name;
      }),
    );
  },
}));
