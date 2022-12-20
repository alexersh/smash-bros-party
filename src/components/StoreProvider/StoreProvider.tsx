import { NextComponentType, NextPageContext } from 'next';
import { useContext, createContext, ReactNode } from 'react';
import { makeAutoObservable, action } from 'mobx';

type TCurrentStep = '1' | '2' | null;

export default class Store {
  name: string = '';
  wish: string = '';
  currentStep: TCurrentStep = null;
  avatar: string = '';

  constructor() {
    makeAutoObservable(this, {
      setCurrentStep: action,
      handleNameChange: action,
      handleWishChange: action,
      setAvatar: action,
    });
    this.name = (typeof window !== 'undefined' && window.localStorage.getItem('name')) || '';
  }

  get isLoggedIn() {
    return this.currentStep === null && this.name;
  }

  setCurrentStep = (value: TCurrentStep) => {
    this.currentStep = value;
  };

  handleNameChange = (value: string) => {
    this.name = value;
  };

  handleWishChange = (value: string) => {
    this.wish = value;
  };

  setAvatar = (value: string) => {
    this.avatar = value;
  };
}

export class RootStore {
  store = new Store();

  constructor() {
    makeAutoObservable(this);
  }
}
export const StoreContext = createContext<RootStore | null>(null);

interface IStoreProviderProps {
  store: RootStore;
  children: ReactNode;
}

export const StoreProvider: React.FC<IStoreProviderProps> = ({ store, children }) => {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export const useStores = () => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useStore hook must be used within a StoreProvider!');
  }
  return store;
};
