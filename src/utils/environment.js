
export const baseUrl = process.env.NODE_ENV === 'production'
    ? 'https://to-do-app-api-fawn.vercel.app'
    : 'http://localhost:5000'