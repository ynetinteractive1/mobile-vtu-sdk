# MobileVtu SDK Documentation
Overview
The mobilevtu-sdk is a JavaScript library designed to interact with the MobileVTU API, enabling users to perform various mobile top-up operations, check balances, and manage transactions easily.


### Installation

To install the SDK, run the following command:

```bash
npm install mobilevtu-sdk
```


### Example Usage

To use the Mobile VTU SDK, you can import the `MobileVtuClient` and create an instance as shown below:


```javascript
import { MobileVtuClient } from 'mobilevtu-sdk';

async function example() {
  const client = new MobileVtuClient({
    apiKey: 'YOUR_API_KEY',
    apiToken: 'YOUR_API_TOKEN'
  });

  // Check balance
  const balance = await client.checkBalance();
  console.log('Balance:', balance);

  // Fetch data plans for an operator
  const dataPlans = await client.getDataPlans("9mobile");
  console.log('Data Plans:', dataPlans);
}

example().catch(console.error);


```



## API Methods

| Method Name                             | Description                                                         |
|-----------------------------------------|---------------------------------------------------------------------|
| `checkBalance(currency)`                | Checks the balance of the specified currency (default: NGN).       |
| `getDataPlans(operator)`                | Fetches data plans for a specific operator.                        |
| `checkOperator(phone)`                  | Checks the network operator for a given phone number.              |
| `topup(request)`                        | Tops up a specified account.                                       |
| `bulkTopup(requests)`                   | (Not available directly, handled in a different manner.)           |
| `getTransactionStatus(transactionId)`   | Retrieves the status of a specific transaction.                    |
| `listTransactions()`                    | Lists all transactions made.                                       |
| `listSupportedOperators()`              | Lists all supported operators.                                      |
| `listMethods()`                         | Lists all available methods and their descriptions.                |






Method Details

checkBalance(currency)
Parameters:
 currency (optional): The currency to check balance for (default is 'NGN').

Returns: The current balance in the specified currency.



 getDataPlans(operator)

Parameters:
  operator: The operator for which to fetch data plans (e.g., 'mtn', 'airtel').

Returns: A list of available data plans for the specified operator.



   checkOperator(phone)

  Parameters:
  phone: The phone number to check the operator for.

  Returns: The network operator for the given phone number.



    topup(request)

Parameters:
request`: An object containing the phone number, amount, and operator details.

  Returns: The response from the top-up operation.



    bulkTopup(requests)

   Description: This method is not available directly in the API. Adjustments may be needed in implementation.



    getTransactionStatus(transactionId)

  Parameters:
  transactionId: The ID of the transaction to check.

  Returns: The status of the specified transaction.



    listTransactions()

   Returns: A list of all transactions made.



   listSupportedOperators()


Returns: A list of supported operators such as MTN, Airtel, Glo, and 9mobile.



    listMethods()

  Returns:  An array of all available methods with descriptions.



 Error Handling

Make sure to handle errors in your implementation. The SDK may throw errors for various reasons, such as invalid parameters or network issues. Use try-catch blocks to manage these exceptions effectively.

Example of Error Handling

```javascript
try {
  const balance = await client.checkBalance();
  console.log('Balance:', balance);
} catch (error) {
  console.error('Error fetching balance:', error.message);
}
```

Error Handling

Make sure to handle errors in your implementation. The SDK may throw errors for various reasons, such as invalid parameters or network issues. Use try-catch blocks to manage these exceptions effectively.

Example of Error Handling

```javascript
async function example() {
  const client = new MobileVtuClient({
    apiKey: 'YOUR_API_KEY',
    apiToken: 'YOUR_API_TOKEN'
  });

  try {
    const balance = await client.checkBalance();
    console.log('Balance:', balance);
  } catch (error) {
    console.error('Error checking balance:', error);
  }
}
```

Conclusion
This documentation provides a comprehensive overview of the mobilevtu-sdk. With its straightforward methods and clear structure, it allows for easy integration with the MobileVTU API for mobile top-up services.
