import { Express, Request, Response, NextFunction } from 'express';
import { RouteExtractor } from './route-extractor';
import { PostmanGenerator } from './generator';
import { PostmanSync } from './postman-sync';
import * as fs from 'fs';
import * as path from 'path';

export interface PostmanAutoOptions {
  /** Output file path for the collection */
  output?: string;
  /** Postman API key for cloud sync */
  postmanApiKey?: string;
  /** Existing Postman collection ID to update */
  collectionId?: string;
  /** Name of the Postman collection */
  collectionName?: string;
  /** Base URL for API requests */
  baseUrl?: string;
  /** Auto-sync on route changes */
  autoSync?: boolean;
  /** Enable debug logging */
  debug?: boolean;
}

/**
 * Express middleware that auto-generates Postman collections
 * @param options Configuration options
 * @returns Express middleware function
 */
export function postmanAuto(options: PostmanAutoOptions = {}) {
  const {
    output = './postman_collection.json',
    collectionName = 'API Collection',
    baseUrl = 'http://localhost:3000',
    autoSync = false,
    postmanApiKey,
    collectionId,
    debug = false
  } = options;

  let hasGenerated = false;

  return async (req: Request, res: Response, next: NextFunction) => {
    // Only generate once when server starts
    if (!hasGenerated) {
      hasGenerated = true;

      try {
        if (debug) console.log('🔍 Extracting routes from Express app...');

        // Extract all routes from the Express app
        const app = req.app as Express;
        const extractor = new RouteExtractor(app);
        const routes = extractor.extractRoutes();

        if (debug) console.log(`📋 Found ${routes.length} routes`);

        // Generate Postman collection
        const generator = new PostmanGenerator(collectionName, baseUrl);
        routes.forEach(route => generator.addRoute(route));
        const collection = generator.getCollection();

        // Save to file
        if (output) {
          const outputPath = path.resolve(output);
          fs.writeFileSync(
            outputPath,
            JSON.stringify(collection, null, 2),
            'utf-8'
          );
          console.log(`✅ Postman collection saved to: ${outputPath}`);
        }

        // Sync to Postman Cloud
        if (postmanApiKey && collectionId) {
          const sync = new PostmanSync(postmanApiKey);
          await sync.updateCollection(collectionId, collection);
          console.log('☁️  Collection synced to Postman Cloud');
        }

      } catch (error) {
        console.error('❌ Error generating Postman collection:', error);
      }
    }

    next();
  };
}

// Export types
export * from './types';
export { RouteExtractor } from './route-extractor';
export { PostmanGenerator } from './generator';
export { DummyDataGenerator } from './dummy-data';
export { PostmanSync } from './postman-sync';
