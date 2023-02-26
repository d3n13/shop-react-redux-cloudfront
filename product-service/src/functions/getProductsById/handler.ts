import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { productsStorage } from "@libs/products-storage";
import { middyfy } from "@libs/lambda";
import { NotFoundError, StatusCode } from "@libs/errors";

const getProductsById: ValidatedEventAPIGatewayProxyEvent<void> = async (
  event
) => {
  try {
    const { getById } = productsStorage;
    const productId = parseInt(event.pathParameters.productId);
    const product = await getById(productId);

    return formatJSONResponse({ product });
  } catch (e) {
    if (e instanceof NotFoundError) {
      return formatJSONResponse(
        { message: e.message },
        StatusCode.NotFoundError
      );
    }

    return formatJSONResponse({ message: e.message }, StatusCode.ServerError);
  }
};

export const main = middyfy(getProductsById);
