module.exports = () => ({
  password: Buffer.from(process.env.API_PASSWORD, 'base64').toString(),
  bypass: Buffer.from(process.env.API_BYPASS, 'base64').toString(),
  cypher: Buffer.from(process.env.API_CYPHER, 'base64').toString(),
  code: Buffer.from(process.env.API_CODE, 'base64').toString()
})
