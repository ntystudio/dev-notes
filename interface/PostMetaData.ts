export interface PostMetaData {
  title: string;
  date: string;
  subtitle: string;
  folder: string;
  slug: string;
  tags: string
}

export type PostMetaDataCollection = {
    [key: string]: PostMetaData[];
};