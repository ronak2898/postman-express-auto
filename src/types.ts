export interface RouteInfo {
  method: string;
  path: string;
  params: ParamInfo[];
  body?: BodySchema;
  query?: QueryParam[];
  headers?: HeaderInfo[];
}

export interface ParamInfo {
  name: string;
  type: string;
  example: string;
}

export interface BodySchema {
  type: 'object' | 'array' | 'string';
  properties?: Record<string, SchemaProperty>;
  example?: any;
}

export interface SchemaProperty {
  type: string;
  format?: string;
  example?: any;
  required?: boolean;
}

export interface QueryParam {
  name: string;
  type: string;
  required: boolean;
  example: string;
}

export interface HeaderInfo {
  key: string;
  value: string;
}
