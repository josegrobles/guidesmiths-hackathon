export const IS_LOADING = 'IS_LOADING';

export function mainLoading(isLoading) {
  return {
    type: IS_LOADING,
    payload: {
      isLoading,
    }
  };
}
