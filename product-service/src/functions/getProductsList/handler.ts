import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { StatusCode } from "@libs/errors";
import { getProductsList } from "./getProductsList";

const handler: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {
  try {
    const products = await getProductsList();

    return formatJSONResponse({ products });
  } catch (e) {
    return formatJSONResponse({ message: e.message }, StatusCode.ServerError);
  }
};

export const main = middyfy(handler);
