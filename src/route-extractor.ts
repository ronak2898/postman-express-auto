import { Express } from 'express';
import { RouteInfo } from './types';

export class RouteExtractor {
  constructor(private app: Express) {}

  extractRoutes(): RouteInfo[] {
    const routes: RouteInfo[] = [];
    const stack = (this.app._router as any).stack;

    for (const layer of stack) {
      if (layer.route) {
        // Regular route
        const route = this.parseRoute(layer.route);
        if (route) routes.push(route);
      } else if (layer.name === 'router' && layer.handle.stack) {
        // Nested router
        const basePath = this.extractBasePath(layer.regexp);
        
        for (const subLayer of layer.handle.stack) {
          if (subLayer.route) {
            const route = this.parseRoute(subLayer.route, basePath);
            if (route) routes.push(route);
          }
        }
      }
    }

    return routes;
  }

  private extractBasePath(regexp: RegExp): string {
    return regexp.source
      .replace('\\/?', '')
      .replace('(?=\\/|$)', '')
      .replace(/\\\//g, '/')
      .replace(/\^/g, '')
      .replace(/\$/g, '');
  }

  private parseRoute(route: any, basePath = ''): RouteInfo | null {
    const path = basePath + route.path;
    const methods = Object.keys(route.methods).filter(m => m !== '_all');

    if (methods.length === 0) return null;

    const method = methods[0].toUpperCase();
    const params = this.extractParams(path);

    return {
      method,
      path,
      params,
      query: [],
      headers: []
    };
  }

  private extractParams(path: string): any[] {
    const paramRegex = /:([^/]+)/g;
    const params = [];
    let match;

    while ((match = paramRegex.exec(path)) !== null) {
      params.push({
        name: match[1],
        type: 'string',
        example: this.generateParamExample(match[1])
      });
    }

    return params;
  }

  private generateParamExample(paramName: string): string {
    const lower = paramName.toLowerCase();
    if (lower.includes('id')) return '123';
    if (lower.includes('email')) return 'user@example.com';
    if (lower.includes('slug')) return 'my-slug';
    if (lower.includes('uuid')) return 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';
    return 'example';
  }
}
