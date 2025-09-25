export interface Comic {
  id: number;
  title: string;
  thumbnail: {
    extension: string;
    path: string;
  };
  modified: Date;
  prices: Array<{ price: number }>;
  description: string;
  characters: {
    items: Array<{ name: string }>;
  };
  creators: {
    available: number;
    items: Array<{ name: string; role: string }>;
  };
}

export interface Serie {
  id: number;
  title: string;
  thumbnail: {
    extension: string;
    path: string;
  };
  description: string;
}
