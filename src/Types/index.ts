export interface IAlert {
  isShown: boolean;
  variant: string;
  message: string;
}

export interface BeersQuery {
  page: number;
  perPage: number;
}
