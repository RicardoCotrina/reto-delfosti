import { docClient } from "../../db/dynamodb/DynamoDB";
import { CardDTO } from "../../dto/CardDTO";
import { Constants } from "../../util/constans/Constants";

export const CardQuery = {
  createCard: async (cardDTO: CardDTO): Promise<any> => {
    await docClient
      .put({
        TableName: Constants.tableName,
        Item: cardDTO,
      })
      .promise();
    return cardDTO.cardID;
  },
  getCards: async (): Promise<any> => {
    const listCards = await docClient
      .scan({
        TableName: Constants.tableName,
      })
      .promise();
    const { Items } = listCards;
    return Items;
  },
  getCardById: async (idCard: string): Promise<any> => {
    const listCards = await docClient
      .get({
        TableName: Constants.tableName,
        Key: {
          cardID: idCard,
        },
      })
      .promise();
    const { Item } = listCards;
    return Item;
  },
  deleteCardById: async (idCard: string): Promise<any> => {
    await docClient
      .delete({
        TableName: Constants.tableName,
        Key: {
          cardID: idCard,
        },
      })
      .promise();
  },
};
