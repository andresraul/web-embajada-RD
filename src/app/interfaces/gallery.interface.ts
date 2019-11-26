export interface Response {
  photosets: PhotoSets;
}

export interface PhotoSets {
  page: number;
  pages: number;
  photoset: PhotoSet[];
  length: number;
}

export interface PhotoSet {
  id: string;
  description: String;
  title: String;
}

export interface String {
  _content: string;
}

export interface PhotoSetByIds {
  photoset: PhotoSetById;
}

export interface PhotoSetById {
  id: string;
  owner: string;
  ownername: string;
  page: number;
  pages: number;
  per_page: number;
  perpage: number;
  photo: Photo[];
  primary: string;
  title: string;
  total: string;
}

export interface Photo {
  length: number;
  farm: number;
  id: string;
  isfamily: number;
  isfriend: number;
  ispramy: string;
  ispublic: number;
  secret: string;
  server: string;
  title: string;
}
