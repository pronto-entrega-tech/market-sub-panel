import useSWR from 'swr';
import { Profile } from '~/core/types';

export const useProfile = () => useSWR<Profile>('/markets/sub/profile');
