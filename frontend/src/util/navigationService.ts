let navigate: ((to: string) => void) | null = null;

export const setNavigate = (navFunction: (to: string) => void) => {
  navigate = navFunction;
};

export const getNavigate = () => {
  return navigate;
};
