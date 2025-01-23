let env: string = ""
env = "PROD"

export const SERVER_URL = env === "LOCAL" ? "http://localhost:3000" : "https://www.test.digitalmaps.pk/"
