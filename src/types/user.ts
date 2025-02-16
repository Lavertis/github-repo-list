export interface UserListResponse {
    items: UserListItem[];
    total_count: number;
    incomplete_results: boolean;
}

export interface UserListItem {
    id: string;
    login: string;
    avatar_url: string;
}
