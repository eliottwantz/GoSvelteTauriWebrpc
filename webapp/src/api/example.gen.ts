/* eslint-disable */
// your-app v0.1.0 1c9e7de7e8cb420c9dfcc8c9acd8e6844c8831df
// --
// Code generated by webrpc-gen@v0.11.1 with typescript generator. DO NOT EDIT.
//
// webrpc-gen -schema=example.ridl -target=typescript -client -out=./webapp/src/api/example.gen.ts

// WebRPC description and code-gen version
export const WebRPCVersion = "v1"

// Schema version of your RIDL schema
export const WebRPCSchemaVersion = "v0.1.0"

// Schema hash generated from your RIDL schema
export const WebRPCSchemaHash = "1c9e7de7e8cb420c9dfcc8c9acd8e6844c8831df"

//
// Types
//


export interface User {
  id: number
  username: string
  createdAt: string
}

export interface UsersQueryFilter {
  page?: number
  name?: string
  location?: string
}

export interface ExampleService {
  ping(headers?: object): Promise<PingReturn>
  status(headers?: object): Promise<StatusReturn>
  getUserByID(args: GetUserByIDArgs, headers?: object): Promise<GetUserByIDReturn>
  isOnline(args: IsOnlineArgs, headers?: object): Promise<IsOnlineReturn>
  listUsers(args: ListUsersArgs, headers?: object): Promise<ListUsersReturn>
}

export interface PingArgs {
}

export interface PingReturn {  
}
export interface StatusArgs {
}

export interface StatusReturn {
  status: boolean  
}
export interface GetUserByIDArgs {
  userID: number
}

export interface GetUserByIDReturn {
  user: User  
}
export interface IsOnlineArgs {
  userID: number
}

export interface IsOnlineReturn {
  online: boolean  
}
export interface ListUsersArgs {
  q?: UsersQueryFilter
}

export interface ListUsersReturn {
  page: number
  users: Array<User>  
}


  
//
// Client
//
export class ExampleService implements ExampleService {
  protected hostname: string
  protected fetch: Fetch
  protected path = '/rpc/ExampleService/'

  constructor(hostname: string, fetch: Fetch) {
    this.hostname = hostname
    this.fetch = (input: RequestInfo, init?: RequestInit) => fetch(input, init)
  }

  private url(name: string): string {
    return this.hostname + this.path + name
  }
  
  ping = (headers?: object): Promise<PingReturn> => {
    return this.fetch(
      this.url('Ping'),
      createHTTPRequest({}, headers)
    ).then((res) => {
      return buildResponse(res).then(_data => {
        return {}
      })
    }, (error) => {
      throw WebrpcRequestFailedError.new({ cause: `fetch(): ${error.message || ''}` })
    })
  }
  
  status = (headers?: object): Promise<StatusReturn> => {
    return this.fetch(
      this.url('Status'),
      createHTTPRequest({}, headers)
    ).then((res) => {
      return buildResponse(res).then(_data => {
        return {
          status: <boolean>(_data.status),
        }
      })
    }, (error) => {
      throw WebrpcRequestFailedError.new({ cause: `fetch(): ${error.message || ''}` })
    })
  }
  
  getUserByID = (args: GetUserByIDArgs, headers?: object): Promise<GetUserByIDReturn> => {
    return this.fetch(
      this.url('GetUserByID'),
      createHTTPRequest(args, headers)
    ).then((res) => {
      return buildResponse(res).then(_data => {
        return {
          user: <User>(_data.user),
        }
      })
    }, (error) => {
      throw WebrpcRequestFailedError.new({ cause: `fetch(): ${error.message || ''}` })
    })
  }
  
  isOnline = (args: IsOnlineArgs, headers?: object): Promise<IsOnlineReturn> => {
    return this.fetch(
      this.url('IsOnline'),
      createHTTPRequest(args, headers)
    ).then((res) => {
      return buildResponse(res).then(_data => {
        return {
          online: <boolean>(_data.online),
        }
      })
    }, (error) => {
      throw WebrpcRequestFailedError.new({ cause: `fetch(): ${error.message || ''}` })
    })
  }
  
  listUsers = (args: ListUsersArgs, headers?: object): Promise<ListUsersReturn> => {
    return this.fetch(
      this.url('ListUsers'),
      createHTTPRequest(args, headers)
    ).then((res) => {
      return buildResponse(res).then(_data => {
        return {
          page: <number>(_data.page),
          users: <Array<User>>(_data.users),
        }
      })
    }, (error) => {
      throw WebrpcRequestFailedError.new({ cause: `fetch(): ${error.message || ''}` })
    })
  }
  
}

  const createHTTPRequest = (body: object = {}, headers: object = {}): object => {
  return {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify(body || {})
  }
}

const buildResponse = (res: Response): Promise<any> => {
  return res.text().then(text => {
    let data
    try {
      data = JSON.parse(text)
    } catch(error) {
      throw WebrpcBadResponseError.new({
        status: res.status,
        cause: `JSON.parse(): ${error.message || ''}: response text: ${text}`},
      )
    }
    if (!res.ok) {
      const code: number = (typeof data.code === 'number') ? data.code : 0
      throw (webrpcErrorByCode[code] || WebrpcError).new(data)
    }
    return data
  })
}

//
// Errors
//

export class WebrpcError extends Error {
  name: string
  code: number
  message: string
  status: number
  cause?: string

  /** @deprecated Use message instead of msg. Deprecated in webrpc v0.11.0. */
  msg: string

  constructor(name: string, code: number, message: string, status: number, cause?: string) {
    super(message)
    this.name = name || 'WebrpcError'
    this.code = typeof code === 'number' ? code : 0
    this.message = message || `endpoint error ${this.code}`
    this.msg = this.message
    this.status = typeof status === 'number' ? status : 0
    this.cause = cause
    Object.setPrototypeOf(this, WebrpcError.prototype)
  }

  static new(payload: any): WebrpcError {
    return new this(payload.error, payload.code, payload.message || payload.msg, payload.status, payload.cause)
  }
}

// Webrpc errors

export class WebrpcEndpointError extends WebrpcError {
  constructor(
    name: string = 'WebrpcEndpoint',
    code: number = 0,
    message: string = 'endpoint error',
    status: number = 0,
    cause?: string
  ) {
    super(name, code, message, status, cause)
    Object.setPrototypeOf(this, WebrpcEndpointError.prototype)
  }
}

export class WebrpcRequestFailedError extends WebrpcError {
  constructor(
    name: string = 'WebrpcRequestFailed',
    code: number = -1,
    message: string = 'request failed',
    status: number = 0,
    cause?: string
  ) {
    super(name, code, message, status, cause)
    Object.setPrototypeOf(this, WebrpcRequestFailedError.prototype)
  }
}

export class WebrpcBadRouteError extends WebrpcError {
  constructor(
    name: string = 'WebrpcBadRoute',
    code: number = -2,
    message: string = 'bad route',
    status: number = 0,
    cause?: string
  ) {
    super(name, code, message, status, cause)
    Object.setPrototypeOf(this, WebrpcBadRouteError.prototype)
  }
}

export class WebrpcBadMethodError extends WebrpcError {
  constructor(
    name: string = 'WebrpcBadMethod',
    code: number = -3,
    message: string = 'bad method',
    status: number = 0,
    cause?: string
  ) {
    super(name, code, message, status, cause)
    Object.setPrototypeOf(this, WebrpcBadMethodError.prototype)
  }
}

export class WebrpcBadRequestError extends WebrpcError {
  constructor(
    name: string = 'WebrpcBadRequest',
    code: number = -4,
    message: string = 'bad request',
    status: number = 0,
    cause?: string
  ) {
    super(name, code, message, status, cause)
    Object.setPrototypeOf(this, WebrpcBadRequestError.prototype)
  }
}

export class WebrpcBadResponseError extends WebrpcError {
  constructor(
    name: string = 'WebrpcBadResponse',
    code: number = -5,
    message: string = 'bad response',
    status: number = 0,
    cause?: string
  ) {
    super(name, code, message, status, cause)
    Object.setPrototypeOf(this, WebrpcBadResponseError.prototype)
  }
}

export class WebrpcServerPanicError extends WebrpcError {
  constructor(
    name: string = 'WebrpcServerPanic',
    code: number = -6,
    message: string = 'server panic',
    status: number = 0,
    cause?: string
  ) {
    super(name, code, message, status, cause)
    Object.setPrototypeOf(this, WebrpcServerPanicError.prototype)
  }
}


// Schema errors

export class RateLimitedError extends WebrpcError {
  constructor(
    name: string = 'RateLimited',
    code: number = 100,
    message: string = 'too many requests',
    status: number = 0,
    cause?: string
  ) {
    super(name, code, message, status, cause)
    Object.setPrototypeOf(this, RateLimitedError.prototype)
  }
}

export class DatabaseDownError extends WebrpcError {
  constructor(
    name: string = 'DatabaseDown',
    code: number = 101,
    message: string = 'service outage',
    status: number = 0,
    cause?: string
  ) {
    super(name, code, message, status, cause)
    Object.setPrototypeOf(this, DatabaseDownError.prototype)
  }
}


export enum errors {
  WebrpcEndpoint = 'WebrpcEndpoint',
  WebrpcRequestFailed = 'WebrpcRequestFailed',
  WebrpcBadRoute = 'WebrpcBadRoute',
  WebrpcBadMethod = 'WebrpcBadMethod',
  WebrpcBadRequest = 'WebrpcBadRequest',
  WebrpcBadResponse = 'WebrpcBadResponse',
  WebrpcServerPanic = 'WebrpcServerPanic',
  RateLimited = 'RateLimited',
  DatabaseDown = 'DatabaseDown',
}

const webrpcErrorByCode: { [code: number]: any } = {
  [0]: WebrpcEndpointError,
  [-1]: WebrpcRequestFailedError,
  [-2]: WebrpcBadRouteError,
  [-3]: WebrpcBadMethodError,
  [-4]: WebrpcBadRequestError,
  [-5]: WebrpcBadResponseError,
  [-6]: WebrpcServerPanicError,
  [100]: RateLimitedError,
  [101]: DatabaseDownError,
}

export type Fetch = (input: RequestInfo, init?: RequestInit) => Promise<Response>
