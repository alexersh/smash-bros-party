import { useContext, createContext, ReactNode } from 'react';
import { makeAutoObservable, action, toJS, runInAction } from 'mobx';
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
import uniqid from 'uniqid';
import { filterUsers } from '../../utilities/filterUsersByRange';

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

export interface IUser {
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
      getUsers: action,
      createUser: action,
      increaseScore: action,
      init: action,
    });
    this.name = (typeof window !== 'undefined' && window.localStorage.getItem('character')) || '';

    this.init();
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

  get isLoggedIn() {
    return this.currentStep === null && this.name;
    // return true;
  }

  get allWishes() {
    return this.users.map((user) => user.wish);
  }

  get filteredUsers() {
    const usersHigh = toJS(this.users)
      .filter(filterUsers([100, 15]))
      .sort((a, b) => a.score - b.score);
    const usersPrehigh = toJS(this.users)
      .filter(filterUsers([15, 10]))
      .sort((a, b) => a.score - b.score);
    const usersNormal = toJS(this.users)
      .filter(filterUsers([10, 5]))
      .sort((a, b) => a.score - b.score);
    const usersPrenormal = toJS(this.users)
      .filter(filterUsers([5, 3]))
      .sort((a, b) => a.score - b.score);
    const usersLow = toJS(this.users)
      .filter(filterUsers([3, 0]))
      .sort((a, b) => a.score - b.score);

    return {
      usersHigh,
      usersPrehigh,
      usersNormal,
      usersPrenormal,
      usersLow,
    };
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
      console.log('>>> New user sended!');
    } catch (e) {
      console.warn(e);
    }
    runInAction(() => {
      this.users.push(user);
      // typeof window !== 'undefined' && window.localStorage.setItem('character', user.character);
    });
  };

  increaseScore = async (userId: IUser['character']) => {
    try {
      await updateDoc(doc(this.db, 'users', userId), {
        score: increment(1),
      });
    } catch (e) {
      console.warn(e);
    }
    const user = this.users.find((user) => user.character === userId);
    if (user) {
      user.score += 1;
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
