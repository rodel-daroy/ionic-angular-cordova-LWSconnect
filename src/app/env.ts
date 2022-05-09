const HTTP_TIMEOUT: number = 60000;

export interface Enviroment {
  mainApi: string,
  timeout: number
}

export const Test: Enviroment = {
  mainApi: 'http://localhost:5000',
  timeout: HTTP_TIMEOUT
}

export const Live: Enviroment = {
  mainApi: 'http://10.0.0.67:3555',
  timeout: HTTP_TIMEOUT
}

export const LiveLocal: Enviroment = {
  mainApi: 'http://182.156.204.228:3555',
  timeout: HTTP_TIMEOUT
}

export const Livefinal: Enviroment = {
  //  mainApi:'http://ec2-13-58-246-109.us-east-2.compute.amazonaws.com:3555',
  mainApi: 'https://loginworks.com/api',
  timeout: HTTP_TIMEOUT
}

export const ENV: Enviroment = Livefinal;
