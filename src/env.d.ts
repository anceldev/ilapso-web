/// <reference types="astro/client" />

declare module "stripe" {
  export default class Stripe {
    constructor(apiKey: string, config?: any);
    checkout: {
      sessions: {
        retrieve(id: string, options?: any): Promise<any>;
      };
    };
    webhooks: {
      constructEvent(payload: string, signature: string, secret: string): any;
    };
  }
}
