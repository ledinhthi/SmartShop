import {appModel} from './appModel';

export const useStore = () => {
  const {
    AuthStore,
    MainStore,
  } = appModel;

  return {
    AuthStore,
    MainStore,
  };
};
