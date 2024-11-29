import { createClient, RedisClientType } from "redis";

export class Redis {
  private static client: RedisClientType | null = null;
  private static NOT_CONNECTED = "Redis client is not connected."

  static async connect() {
    if (!this.client) {
      this.client = createClient({
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD,
        socket: {
          host: 'localhost',
          port: 6379,
          tls: true
        },
      });
      await this.client.connect();
      console.log("Connected to Redis");
    }
  }

  static async set(key: string, value: string, expiresAt?: number) {
    if (!this.client) throw new Error(this.NOT_CONNECTED);

    const options: any = expiresAt ? { 
        EX: expiresAt 
    } : undefined;
    await this.client.set(key, value, options);
  }

  static async get(key: string) {
    if (!this.client) throw new Error(this.NOT_CONNECTED);
    
    return await this.client.get(key);
  }

  static async delKey(key: string){
    if (!this.client) throw new Error(this.NOT_CONNECTED)
    
    return await this.client.del(key)
  }


  static async disconnect() {
    if (this.client) {
      await this.client.disconnect();
      this.client = null;
    }
  }
}
