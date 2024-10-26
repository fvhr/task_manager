export const isAuthenticated = (): boolean => {
  const accessToken = localStorage.getItem('access');
  const refreshToken = localStorage.getItem('refresh');

  if (!accessToken || !refreshToken) {
    return false;
  }

  return true;
};
