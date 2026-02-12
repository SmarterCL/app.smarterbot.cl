import { supabaseService as db } from '../../services/supabaseClient';

export default async function handler(request, response) {
  const FlowApi = require('flowcl-node-api-client');
  
  // Validate environment variables exist
  if (!process.env.FLOW_API_KEY || !process.env.FLOW_SECRET_KEY) {
    console.error('Missing required environment variables for payment processing');
    return response.status(500).json({ error: 'Server configuration error' });
  }

  const config = {
    apiKey: process.env.FLOW_API_KEY,
    secretKey: process.env.FLOW_SECRET_KEY,
    apiURL: 'https://www.flow.cl/api',
    baseURL: 'https://rut.smarterbot.store',
  };

  try {
    // Validate query parameters
    if (!request.query.uid) {
      return response.redirect('/pay/add/error');
    }

    const { data: settings } = await db.from('settings').select('*').eq('id', '--').single();
    const { data: account } = await db.from('accounts').select('*').eq('id', request.query.uid).single();

    if (!account) {
      return response.redirect(`/pay/${request.query.uid}/add/error`);
    }

    // Validate account data
    if (account.addedSubscriptionsCount <= 0) {
      return response.redirect(`/pay/${request.query.uid}/add/error`);
    }

    const params = {
      commerceOrder: Math.floor(Math.random() * (2000 - 1100 + 1)) + 1100,
      subject: `SmarterBOT - ${account.addedSubscriptionsCount == 1
        ? '1 Suscripción Anual'
        : `${account.addedSubscriptionsCount} suscripciones anuales`
        }`,
      currency: 'CLP',
      amount:
        parseInt(account.addedSubscriptionsCount) *
        (settings && parseInt(settings.offerPrice) > 0
          ? parseInt(settings.offerPrice)
          : (settings ? parseInt(settings.price) : 24000)),
      email: account.email,
      paymentMethod: 9,
      urlConfirmation: config.baseURL + '/api/paymentCallback',
      urlReturn:
        config.baseURL + `/api/paymentAddResult?uid=${request.query.uid}`,
    };

    // Validate calculated amount
    if (isNaN(params.amount) || params.amount <= 0) {
      return response.redirect(`/pay/${request.query.uid}/add/error`);
    }

    const serviceName = 'payment/create';

    try {
      const flowApi = new FlowApi(config);
      let flowResponse = await flowApi.send(serviceName, params, 'POST');
      let redirect = flowResponse.url + '?token=' + flowResponse.token;
      return response.redirect(redirect);
    } catch (error) {
      console.error('Flow API error in processAddPayment:', error.message);
      return response.redirect(`/pay/${request.query.uid}/add/error`);
    }
  } catch (error) {
    console.error('Process add payment error:', error);
    return response.redirect('/pay/add/error');
  }
}
