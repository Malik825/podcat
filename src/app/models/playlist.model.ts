export interface Playlist {
  id: number;
  title: string;
  description: string;
  slug: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
  episodes: number[];
  items?: string[]; // ✅ Add this line
}
