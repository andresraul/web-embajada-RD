//=======================================
//  Entorno
//=======================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//=======================================
// Server port
//=======================================
process.env.PORT = process.env.PORT || 3000;

//=======================================
// URL DB
//=======================================
process.env.URLDB = process.env.URLDB || 'mongodb://localhost:27017/embajada-rd';

//=======================================
// Token expiration
//=======================================
process.env.EXPIRATION_TOKEN = '1h';

//======================================
//  Authentication SEED
//======================================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

//======================================
//  Home URL
//======================================

if (process.env.NODE_ENV === 'dev') {

    process.env.HOME_URL = 'http://localhost:3000/';

} else {

    process.env.HOME_URL = 'https://xxxxxxxxxx.com/';

}