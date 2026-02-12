import { supabaseService as db } from "../../services/supabaseClient";

export default async function handler(request, response) {
  const FlowApi = require("flowcl-node-api-client");

  // Validate environment variables exist
  if (!process.env.FLOW_API_KEY || !process.env.FLOW_SECRET_KEY) {
    console.error('Missing required environment variables for payment processing');
    return response.status(500).json({ error: 'Server configuration error' });
  }

  const config = {
    apiKey: process.env.FLOW_API_KEY,
    secretKey: process.env.FLOW_SECRET_KEY,
    apiURL: "https://www.flow.cl/api",
    baseURL: "https://rut.smarterbot.store",
  };

  try {
    // Validate query parameters
    if (!request.query.uid) {
      return response.redirect('/pay/error');
    }

    const { data: settings } = await db.from("settings").select("*").eq("id", "--").single();

    const { data: account, error } = await db
      .from("accounts")
      .select("*")
      .eq("id", request.query.uid)
      .single();

    if (error) {
      console.error('Database error in processPayment:', error);
      return response.redirect(`/pay/${request.query.uid}/error`);
    }

    if (!account) {
      return response.redirect(`/pay/${request.query.uid}/error`);
    }

    if (account.paymentStatus != "PENDING") {
      return response
        .status(200)
        .send({ status: "ERROR", message: "PAYMENT_ALREADY_DONE" });
    }

    // Validate account data
    if (!account.totalPrice || parseInt(account.totalPrice) <= 0) {
      return response.redirect(`/pay/${request.query.uid}/error`);
    }

    const params = {
      commerceOrder: Math.floor(Math.random() * (2000 - 1100 + 1)) + 1100,
      subject: `SmarterBOT - ${account.subscriptionsCount == 1
        ? "1 Suscripción Anual"
        : `${account.subscriptionsCount
        } suscripciones anuales`
        }`,
      currency: "CLP",
      amount: parseInt(account.totalPrice),
      email: account.email,
      paymentMethod: 9,
      urlConfirmation: config.baseURL + "/api/paymentCallback",
      urlReturn:
        config.baseURL + `/api/paymentResult?uid=${request.query.uid}`,
    };

    // Validate calculated amount
    if (isNaN(params.amount) || params.amount <= 0) {
      return response.redirect(`/pay/${request.query.uid}/error`);
    }

    const serviceName = "payment/create";

    try {
      const flowApi = new FlowApi(config);
      let flowResponse = await flowApi.send(serviceName, params, "POST");
      let redirect = flowResponse.url + "?token=" + flowResponse.token;
      return response.redirect(redirect);
    } catch (error) {
      console.error("Flow API error in processPayment:", error.message);
      return response.redirect(`/pay/${request.query.uid}/error`);
    }
  } catch (error) {
    console.error('Process payment error:', error);
    return response.redirect('/pay/error');
  }
}
