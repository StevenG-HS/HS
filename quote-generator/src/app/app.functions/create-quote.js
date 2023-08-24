// for HubSpot API calls
const hubspot = require('@hubspot/api-client');

const hubspotClient = new hubspot.Client({
  accessToken: process.env['PRIVATE_APP_ACCESS_TOKEN'],
});

exports.main = async (context = {}, sendResponse) => {
  const { hs_object_id } = context.propertiesToSend;
  const { distance, sku, numberOfBuses, quoteName } = context.event.payload;

  const product = await findProductBySKU(sku);

  if (product === null) {
    sendResponse({ error: 'PRODUCT_NOT_FOUND' });
  } else {
    const quote = await createQuote({
      dealId: hs_object_id,
      quoteName,
    });
    for (let i = 0; i < numberOfBuses; i++) {
      await addLineItem({
        productId: product.id,
        quoteId: quote.id,
        quantity: distance,
      });
    }
    sendResponse({ quote });
  }
};

async function createQuote({ dealId, quoteName }) {
  const oneWeek = 168 * 60 * 60000;
  const request = {
    properties: {
      hs_title: quoteName,
      hs_expiration_date: Date.now() + oneWeek,
      hs_status: 'DRAFT',
      hs_currency: 'USD',
      hs_language: 'en',
      hs_locale: 'en-us',
    },
    associations: [
      {
        to: { id: dealId },
        types: [
          {
            associationCategory: 'HUBSPOT_DEFINED',
            associationTypeId: hubspot.AssociationTypes.quoteToDeal,
          },
        ],
      },
    ],
  };

  return await hubspotClient.crm.quotes.basicApi.create(request);
}

async function addLineItem({ productId, quoteId, quantity }) {
  const request = {
    properties: {
      hs_product_id: productId,
      quantity,
    },
    associations: [
      {
        to: { id: quoteId },
        types: [
          {
            associationCategory: 'HUBSPOT_DEFINED',
            associationTypeId: hubspot.AssociationTypes.lineItemToQuote,
          },
        ],
      },
    ],
  };

  await hubspotClient.crm.lineItems.basicApi.create(request);
}

async function findProductBySKU(sku) {
  try {
    const product = await hubspotClient.crm.products.basicApi.getById(
      sku,
      undefined,
      undefined,
      undefined,
      undefined,
      'hs_sku',
    );
    return product;
  } catch (error) {
    if (error.code != 404) {
      console.error(error.message);
    }
    return null;
  }
}
