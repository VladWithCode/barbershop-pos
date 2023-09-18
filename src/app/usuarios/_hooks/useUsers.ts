import { getUsers } from '@/app/usuarios/_services/UserService';
import { useQuery } from '@tanstack/react-query';

export function useUsers() {
	return useQuery(['users'], getUsers);
}
