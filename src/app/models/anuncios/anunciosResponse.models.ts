// archivo modelos.ts

export interface AnunciosResponse {
    id: string;
    imageName: string;
    tag: string;
    urlImage: string;
  }
  
  export interface AnunciosApiResponse {
    anuncios: AnunciosResponse;
  }