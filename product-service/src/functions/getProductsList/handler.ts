import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { productsStorage } from "@libs/products-storage";
import { middyfy } from "@libs/lambda";
import { StatusCode } from "@libs/errors";

const getProductsList: ValidatedEventAPIGatewayProxyEvent<void> = async (
  event
) => {
  try {
    const { getAll } = productsStorage;
    const products = await getAll();

    return formatJSONResponse({ products });
  } catch (e) {
    return formatJSONResponse({ message: e.message }, StatusCode.ServerError);
  }
};

export const main = middyfy(getProductsList);
