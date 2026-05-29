export interface Blog {
  id: number;
  heading: string;
  category?: string | null;
  tagline: string;
  imageUrl?: string | null;
  content: string;
  createdAt?: Date | null;
}

export interface BlogFeedItem extends Blog {
  authorName: string;
}

