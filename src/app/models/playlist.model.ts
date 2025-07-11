import { Episode } from './episode.model';

export interface Playlist {
  id: number;
  name: string;
  description: string;
  slug: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
  episodes: Episode[];
  items?: string[];
}

// export interface Playlist {
//   status: 'string';
//   data: {
//     id: 1;
//     name: 'Playlist One';
//     description: 'This is a sample playlist.';
//     created_at: '2024-12-01T12:00:00Z';
//     updated_at: '2024-12-01T12:00:00Z';
//     episodes: [
//       {
//         id: 10;
//         title: 'The Journey Begins';
//         description: 'The first episode of the series.';
//         duration: '00:45:30';
//         posted_on: '2024-12-01T12:00:00Z';
//       }
//     ];
//   };
// }
