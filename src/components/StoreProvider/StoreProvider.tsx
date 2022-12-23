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
import { filterUsers } from '../../utilities/filterUsersByRange';
import { TCharacter, characters } from '../../constants/characters';

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
  score: number;
  avatar: string;
  character: TCharacter['name'];
  id: string;
}
export default class Store {
  name: string = '';
  wish: string = '';
  currentStep: TCurrentStep = null;
  avatar: string = '';
  db: Firestore = db;
  users: IUser[] = [];
  allCharacters: TCharacter[] = characters;
  isAdminLogged: boolean = false;
  isLoggedIn: boolean = false;

  constructor() {
    makeAutoObservable(this, {
      setIsAdminLogged: action,
      setCurrentStep: action,
      handleNameChange: action,
      handleWishChange: action,
      setAvatar: action,
      getUsers: action,
      createUser: action,
      changeScore: action,
      setUsersChange: action,
    });
    this.isLoggedIn =
      !!(typeof window !== 'undefined' && window.localStorage.getItem('character')) || false;

    this.init();
  }

  setIsAdminLogged = (value: boolean) => {
    this.isAdminLogged = value;
  };

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

  setUsersChange = (users: IUser[]) => {
    this.users = users;
  };

  get allWishes() {
    return this.users.map((user) => `${user.name}: ${user.wish}`);
  }

  get filteredCharacters() {
    return this.allCharacters.filter(
      (character) => !this.users.find((user) => user.character === character.name)
    );
  }

  get sortedUsers() {
    return toJS(this.users);
  }

  get filteredUsers() {
    const usersHigh = toJS(this.users)
      .filter(filterUsers([100, 36]))
      .sort((b, a) => a.score - b.score);
    const usersPrehigh = toJS(this.users)
      .filter(filterUsers([20, 15]))
      .sort((b, a) => a.score - b.score);
    const usersNormal = toJS(this.users)
      .filter(filterUsers([14, 8]))
      .sort((b, a) => a.score - b.score);
    const usersPrenormal = toJS(this.users)
      .filter(filterUsers([7, 4]))
      .sort((b, a) => a.score - b.score);
    const usersLow = toJS(this.users)
      .filter(filterUsers([3, -1]))
      .sort((b, a) => a.score - b.score);

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
      const usersSnap = await getDocs(collection(this.db, 'users'));

      runInAction(() => {
        this.users = usersSnap.docs.map((document) => document.data() as IUser);
      });
    } catch (e) {
      console.warn(e);
    }
  };

  createUser = async (user: IUser) => {
    try {
      await setDoc(doc(this.db, 'users', user.id), user);
      console.log('>>> New user sended!');
      runInAction(() => {
        this.isLoggedIn = true;
      });
    } catch (e) {
      console.warn(e);
    }
  };

  changeScore = async (value: number, userId: IUser['id']) => {
    try {
      await updateDoc(doc(this.db, 'users', userId), {
        score: increment(value),
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
