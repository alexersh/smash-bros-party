import { useContext, createContext, ReactNode } from 'react';
import { makeAutoObservable, action } from 'mobx';
import { initializeApp } from 'firebase/app';
import {
  Firestore,
  getFirestore,
  collection,
  getDocs,
  setDoc,
  updateDoc,
  doc,
  increment,
} from 'firebase/firestore';

type TCurrentStep = '1' | '2' | null;

const firebaseConfig = {
  apiKey: 'AIzaSyAQfcYL5n4Hb-fi4a0dQ_-_AxMjIBG6ROs',
  authDomain: 'smash-bros-party.firebaseapp.com',
  projectId: 'smash-bros-party',
  storageBucket: 'smash-bros-party.appspot.com',
  messagingSenderId: '689230664208',
  appId: '1:689230664208:web:fc2e09c7a3950f76577095',
  measurementId: 'G-21VBFSD10Z',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface IUser {
  name: string;
  wish: string;
  avatar: string;
  score: number;
  character: string;
}
export default class Store {
  name: string = '';
  wish: string = '';
  currentStep: TCurrentStep = null;
  avatar: string = '';
  db: Firestore = db;
  users: IUser[] = [];

  constructor() {
    makeAutoObservable(this, {
      setCurrentStep: action,
      handleNameChange: action,
      handleWishChange: action,
      setAvatar: action,
    });
    this.name = (typeof window !== 'undefined' && window.localStorage.getItem('name')) || '';

    this.init();
  }

  get isLoggedIn() {
    return this.currentStep === null && this.name;
    // return true;
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

  get allWishes() {
    return this.users.map((user) => user.wish);
  }

  get sortedUsers() {
    return this.users.sort((a, b) => a.score - b.score);
  }

  getUsers = async () => {
    try {
      const data = await getDocs(collection(this.db, 'users'));

      data.forEach((d) => {
        this.users.push(d.data() as IUser);
      });
    } catch (e) {
      console.warn(e);
    }
  };

  createUser = async (user: IUser) => {
    try {
      await setDoc(doc(this.db, 'users', uniqid()), user);
    } catch (e) {
      console.warn(e);
    }
    this.users.push(user);
  };

  increaseScore = async (userId: IUser['character']) => {
    try {
      await updateDoc(doc(this.db, 'users', userId), {
        score: increment(1),
      });
    } catch (e) {
      console.warn(e);
    }
  };

  init = async () => {
    await this.getUsers();
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
function uniqid(): string {
  throw new Error('Function not implemented.');
}
