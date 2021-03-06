/**
 * There is a special built-in environment variable called NODE_ENV.
 *
 * When you run `yarn start`, it is always equal to 'development',
 * when you run `yarn test` it is always equal to 'test',
 * and when you run `yarn build` to make a production bundle,
 * it is always equal to 'production'.
 *
 * You cannot override NODE_ENV manually.
 */
export const isDev = process.env.NODE_ENV === 'development'
export const isTest = process.env.NODE_ENV === 'test'
export const isProd = process.env.NODE_ENV === 'production'

export const BASE_URL = isProd ? `https://aosbattleplans.com` : `http://localhost:3000`

export const SUBSCRIPTION_AUTH_KEY = 'b5bef450-e624-11e9-81b4-2a2ae2dbcce4'

export const GITHUB_URL = '//github.com/daviseford/aos-battle-plans'

export const ROUTES = {
  HOME: '/',
}
