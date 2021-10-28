export interface User {
  username: string;
  email: string;
  token: string;
  bio: string;
  password: string;
  imageURL: string;
}

export interface UserNotFullFieldRequire extends Partial<User> {}

export interface Data {
  user: User;
}

export interface Author {
  username: string;
  image: string;
  following: boolean;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  tagList: String[];
  favorited: boolean;
  favoritesCount: number;
  author: Author;
}

export interface DataArticles {
  articles: Article[];
  articlesCount: number;
}

export interface DataArticle {
  article: Article;
}

export interface DataTags {
  tags: String[];
}

export interface User {
  bio: string;
  following: boolean;
  image: string;
  username: string;
}

export interface DataUser {
  profile: User;
}
