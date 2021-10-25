require('dotenv').config({ path: 'variables.env' });
const PORT = process.env.PORT || 5000;
const TOKEN_INSEE = process.env.TOKEN_INSEE
const TOKEN_RAPIDAPI = process.env.TOKEN_RAPIDAPI
const TOKEN_PAPPERS = process.env.TOKEN_PAPPERS

module.exports = {
    PORT,
    TOKEN_INSEE,
    TOKEN_PAPPERS,
    TOKEN_RAPIDAPI
}