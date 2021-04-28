import {appModel} from './appModel';

export const useStore = () => {
  const {
    AuthStore,
    MainStore,
    ProductStore,
    OrderStore,
  } = appModel;

  return {
    AuthStore,
    MainStore,
    ProductStore,
    OrderStore
  };
};
