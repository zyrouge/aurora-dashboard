const staging = process.env.NODE_ENV;

/* Main */
const baseURL =
  staging == "production"
    ? "https://auroradiscordbot.ga"
    : "http://localhost:8080";
const logo = require("./assets/aurora.png");

/* Discord */
const id = "702808552892530829";
const secret =
  staging == "production" ? process.env.SECRET : process.env.VUE_APP_SECRET;
const redirect = `${baseURL}/callback`;
const support = "https://discordapp.com/invite/8KV5zCg";
const invite =
  staging == "production"
    ? "https://discordapp.com/api/oauth2/authorize?client_id=702808552892530829&permissions=2146827775&redirect_uri=https%3A%2F%2Fauroradiscordbot.ga%2Fcallback&response_type=code&scope=guilds%20bot%20identify"
    : "https://discordapp.com/api/oauth2/authorize?client_id=702808552892530829&permissions=2146827775&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fcallback&response_type=code&scope=bot%20guilds%20identify";
const oauth =
  staging == "production"
    ? "https://discordapp.com/api/oauth2/authorize?client_id=702808552892530829&redirect_uri=https%3A%2F%2Fauroradiscordbot.ga%2Fcallback&response_type=code&scope=guilds%20identify"
    : "https://discordapp.com/api/oauth2/authorize?client_id=702808552892530829&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fcallback&response_type=code&scope=identify%20guilds";

module.exports = {
  baseURL,
  logo,
  discord: {
    id,
    secret,
    redirect,
    oauth,
    support,
    invite,
  },
};
