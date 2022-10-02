export interface CardInterface {
  readonly cardNumber: number;
  readonly cvv: number;
  readonly expirationYear: string;
  readonly expirationMonth: string;
  readonly email: string;
  readonly cardID: string;
  readonly createdAt: string;
}

export interface CardById {
  readonly cardNumber: number;
  readonly expirationYear: string;
  readonly expirationMonth: string;
  readonly email: string;
  readonly createdAt: string;
}
