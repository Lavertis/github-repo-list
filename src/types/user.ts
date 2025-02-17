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

export interface UserDetails {
  id: string;
  login: string;
  avatar_url: string;
  name: string;
  location: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}