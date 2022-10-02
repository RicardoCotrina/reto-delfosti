import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 } from "uuid";
import { ApiResponse } from "../util/apiReponse/ApiResponse";
import { CardService } from "../service/CardService";
import { CardSchema } from "../model/schema/CardSchema";

export const createCard = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const body = JSON.parse(event?.body as string);
    const createdAt = new Date();

    try {
      await CardSchema.validate(body, { abortEarly: false });
    } catch (err) {
      throw new Error("The body is not correctly formatted");
    }

    if (!body) {
      return ApiResponse._404({ message: "Body undefined" });
    }

    const card = {
      cardID: v4(),
      createdAt: createdAt.toISOString(),
      ...body,
    };
    const cardCreated = await CardService.createCard(card);

    return ApiResponse._200({ message: cardCreated });
  } catch (error) {
    console.log("error", error);
    return ApiResponse._500({ error: "Internal error server", message: error });
  }
};

export const getCards = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const listCard = await CardService.getCards();

    return ApiResponse._200({ message: listCard });
  } catch (error) {
    console.log("error", error);
    return ApiResponse._500({ error: "Internal error server", message: error });
  }
};

export const getCard = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const idCard = event.pathParameters?.id;
    const product = await CardService.getCardById(idCard as string);
    if (!product) {
      return ApiResponse._404({ error: "Not found", message: `The card with con id ${idCard} not exists` });
    }
    return ApiResponse._200({ message: product });
  } catch (error) {
    console.log("error", error);
    return ApiResponse._500({ error: "Internal error server", message: error });
  }
};
