import { createClient } from "redis";

export class Redis{

    private client;

    constructor(){
        this.client = createClient()
    }

    static async connectToRedis(){
        
    }
}