import axios from 'axios';

export class MobileVtuClient {
  constructor(config) {
    this.config = config;
    this.client = axios.create({
      baseURL: config.baseURL || 'https://api.mobilevtu.com/v1',
      headers: {
        'Api-Token': config.apiToken,
        'content-type': 'application/x-www-form-urlencoded',
      },
    });  
  }

  getRequestId() {
    return Date.now().toString();
  }

  getUrl(endpoint) {
    return `/${this.config.apiKey}/${endpoint}`;
  }

  async checkBalance(currency = 'NGN') {
    const response = await this.client.post(
      this.getUrl('check_balance'),
      { currency },
      {
        headers: { 'Request-Id': this.getRequestId() }
      }
    );
    return response.data;
  }
 
  async getDataPlans(operator) {
    const response = await this.client.post(
      this.getUrl('fetch_data_plans'),
      { operator },
      {
        headers: { 'Request-Id': this.getRequestId() }
      }
    );
    return response.data;
  }

  async checkOperator(phone) {
    const response = await this.client.post(
      this.getUrl('number_operator'),
      { phone },
      {
        headers: { 'Request-Id': this.getRequestId() }
      }
    );
    return response.data;
  }

  async topup(request) {
    const response = await this.client.post(
      this.getUrl('topup'),
      request,
      {
        headers: { 'Request-Id': this.getRequestId() }
      }
    );
    return response.data;
  }

  // Adjusted bulkTopup method
  async bulkTopup(requests) {
    const results = [];
    for (const request of requests) {
      try {
        const result = await this.topup(request);
        results.push(result);
      } catch (error) {
        // Handle error for individual top-up requests if needed
        results.push({ error: error.message, request });
      }
    }
    return results;
  }

  async getTransactionStatus(transactionId) {
    const response = await this.client.post(
      this.getUrl('transaction_status'),
      { transaction_id: transactionId },
      {
        headers: { 'Request-Id': this.getRequestId() }
      }
    );
    return response.data;
  }

  async listTransactions() {
    const response = await this.client.post(
      this.getUrl('list_transactions'),
      {},
      {
        headers: { 'Request-Id': this.getRequestId() }
      }
    );
    return response.data;
  }

  // New method to list supported operators
  listSupportedOperators() {
    return [
      { name: 'MTN', code: 'mtn' },
      { name: 'Airtel', code: 'airtel' },
      { name: 'Glo', code: 'glo' },
      { name: '9mobile', code: '9mobile' },
      // Add more operators as needed
    ];
  }

  // New method to list all available methods and their descriptions
  listMethods() {
    const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(this))
      .filter(prop => typeof this[prop] === 'function' && prop !== 'constructor')
      .map(method => ({
        name: method,
        description: this.getMethodDescription(method)
      }));

    return methods;
  }

  // Helper method to provide a description for each method
  getMethodDescription(methodName) {
    switch (methodName) {
      case 'checkBalance':
        return 'Checks the balance of the specified currency.';
      case 'getDataPlans':
        return 'Fetches data plans for a specific operator.';
      case 'checkOperator':
        return 'Checks the network operator for a given phone number.';
      case 'topup':
        return 'Tops up a specified account.';
      case 'bulkTopup':
        return 'Processes multiple top-up requests sequentially.';
      case 'getTransactionStatus':
        return 'Retrieves the status of a specific transaction.';
      case 'listTransactions':
        return 'Lists all transactions made.';
      case 'listSupportedOperators':
        return 'Lists all supported operators.';
      default:
        return 'No description available.';
    }
  }
}
