
export default async function handler(request, response) {
  const FlowApi = require('flowcl-node-api-client');
  
  // Validate environment variables exist
  if (!process.env.FLOW_API_KEY || !process.env.FLOW_SECRET_KEY) {
    console.error('Missing required environment variables for payment processing');
    return response.status(500).json({ error: 'Server configuration error' });
  }

  try {
    console.log('PAYMENT CALLBACK');
    
    let config = {
      apiKey: process.env.FLOW_API_KEY,
      secretKey: process.env.FLOW_SECRET_KEY,
      apiURL: 'https://www.flow.cl/api',
      baseURL: 'https://rut.smarterbot.store',
    };
    
    // Validate request body
    if (!request.body || !request.body.token) {
      return response.status(400).json({ error: 'Token is required' });
    }
    
    let params = {
      token: request.body.token,
    };
    
    let serviceName = 'payment/getStatus';
    const flowApi = new FlowApi(config);
    let flowResponse = await flowApi.send(serviceName, params, 'GET');
    console.log(flowResponse);
    
    return response
      .status(200)
      .send({ status: 'OK', flowResponse: flowResponse });
  } catch (error) {
    console.error('Payment callback error:', error);
    // Don't expose internal error details to client
    return response.status(500).json({ status: 'ERROR', error: 'Internal server error' });
  }
}
