export const IS_LOADING = 'IS_LOADING';

export function loading(isLoading) {
  return {
    type: IS_LOADING,
    payload: {
      isLoading,
    }
  };
}
