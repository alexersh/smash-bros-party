import { IUser } from '../components/StoreProvider/StoreProvider';

export const filterUsers = (range: number[]) => {
  return (user: IUser) => range[0] >= user.score && range[1] <= user.score;
};
