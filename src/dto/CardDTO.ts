export class CardDTO {
  readonly cardNumber!: number;
  readonly cvv!: number;
  readonly expirationYear!: string;
  readonly expirationMonth!: string;
  readonly email!: string;
  readonly cardID?: string;
  readonly createdAt!: string;
}
