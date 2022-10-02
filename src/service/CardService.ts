import { CardDTO } from "../dto/CardDTO";
import { CardById } from "../interface/CardInterface";
import { CardQuery } from "../repository/dynamodb/CardQuery";
import { CardHelper } from "../helper/CardHelper";
import { ApiResponse } from "../util/apiReponse/ApiResponse";

export const CardService = {
  createCard: async (cardDTO: CardDTO): Promise<CardDTO> => {
    const { cardNumber, cvv, expirationYear, expirationMonth, email } = cardDTO;

    const isValidCardNumber = CardHelper.validateCardNumber(cardNumber);
    const isValidCVV = CardHelper.validateCodeCVV(cvv);
    const isValidExpirationYear = CardHelper.validateYear(expirationYear);
    const isValidExpirationMonth = CardHelper.validateMonth(expirationMonth);
    const isValidEmail = CardHelper.validateEmail(email);

    if (!isValidCardNumber) {
      throw ApiResponse._404({ message: "The nummber card is invalid" });
    }

    if (!isValidCVV) {
      throw ApiResponse._404({ message: "The CVV code is invalid. Only support 3 digits" });
    }

    if (!isValidExpirationYear) {
      throw ApiResponse._404({ message: "The year entered is is invalid" });
    }

    if (!isValidExpirationMonth) {
      throw ApiResponse._404({ message: "The month entered is is invalid" });
    }

    if (!isValidEmail) {
      throw ApiResponse._404({ message: "The email entered is invalid" });
    }
    return await CardQuery.createCard(cardDTO);
  },
  getCards: async (): Promise<CardDTO[]> => {
    return await CardQuery.getCards();
  },
  getCardById: async (idCard: string): Promise<CardById> => {
    const cardById: CardById = await CardQuery.getCardById(idCard);
    const { cardNumber, expirationYear, expirationMonth, email, createdAt } = cardById;
    const formatCard = {
      cardNumber,
      expirationYear,
      expirationMonth,
      email,
      createdAt,
    };
    const isDeleteCard = CardHelper.validateTimeForCardExistence(createdAt);

    if (isDeleteCard) {
      await CardService.deleteCardById(idCard);
      throw ApiResponse._500({ message: "The register card was deleted, because the time was finished" });
    }
    return formatCard;
  },
  deleteCardById: async (idCard: string): Promise<CardById> => {
    return await CardQuery.deleteCardById(idCard);
  },
};
