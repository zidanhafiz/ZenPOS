export type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  photo_url: string | null;
  is_verified: boolean;
  created_at: string;
};
