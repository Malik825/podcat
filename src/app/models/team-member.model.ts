export interface TeamMember {
  id: number;
  name: string;
  profile_image: string;
  bio: string;
  role: string;
  social_media_links: { platform: string; url: string }[];
}

export interface CreateTeamMember {
  name: string;
  profile_image?: string;
  bio: string;
  role: string;
  social_media_links: { platform: string; url: string }[];
}

export interface UpdateTeamMember extends Partial<CreateTeamMember> {}
