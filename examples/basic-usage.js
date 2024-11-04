// examples/basic-usage.ts
import { MobileVtuClient } from 'mobilevtu-sdk';

async function example() {
  const client = new MobileVtuClient({
    apiKey: 'JeuyEGO57TUHPYByJY5knFVj4vIN',
    apiToken: 'rSdEmUm2Nx2iQXKxg1Y5nzyGMNRh'
  });

  // Check balance
  const balance = await client.checkBalance();
  console.log('Balance:', balance);


  const checkOperator = await client.getDataPlans("9mobile");
  console.log('Balance:', checkOperator);

}

example().catch(console.error);