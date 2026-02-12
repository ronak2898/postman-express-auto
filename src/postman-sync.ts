import axios from 'axios';

export class PostmanSync {
  private baseUrl = 'https://api.postman.com';

  constructor(private apiKey: string) {}

  async updateCollection(collectionId: string, collection: any): Promise<void> {
    try {
      await axios.put(
        `${this.baseUrl}/collections/${collectionId}`,
        { collection },
        {
          headers: {
            'X-Api-Key': this.apiKey,
            'Content-Type': 'application/json'
          }
        }
      );
    } catch (error: any) {
      throw new Error(`Failed to sync to Postman: ${error.message}`);
    }
  }

  async getCollection(collectionId: string): Promise<any> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/collections/${collectionId}`,
        {
          headers: {
            'X-Api-Key': this.apiKey,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data.collection;
    } catch (error: any) {
      throw new Error(`Failed to fetch Postman collection: ${error.message}`);
    }
  }

  async createCollection(collection: any): Promise<string> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/collections`,
        { collection },
        {
          headers: {
            'X-Api-Key': this.apiKey,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data.collection.uid;
    } catch (error: any) {
      throw new Error(`Failed to create Postman collection: ${error.message}`);
    }
  }
}
