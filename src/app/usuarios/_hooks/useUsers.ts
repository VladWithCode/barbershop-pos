import { getUsers } from '@/app/usuarios/_services/user.service';
import { useQuery } from '@tanstack/react-query';

export function useUsers() {
	return useQuery(['users'], getUsers);
}
