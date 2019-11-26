export class Post {
  id: number;
  title: string;
  slug: string;
  category: number;
  author: {
    name: string;
    authorId: number;
  };
  description: string;
  body: string;
  image: string;
  featuredImage: string;
  created: Date;
  updated: Date;
}
