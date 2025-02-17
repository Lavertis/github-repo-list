import { useEffect, useState } from 'react';
import { UserDetails } from '../../../../types/user.ts';
import axiosInstance from '../../../../api/axios-instance.ts';

export function useUserDetails(userId?: string) {
  const [user, setUser] = useState<UserDetails | undefined>();
  const [error, setError] = useState('');

  useEffect(() => {
    if (!userId) return;
    axiosInstance.get<UserDetails>(`users/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [userId]);

  return { user, error };
}