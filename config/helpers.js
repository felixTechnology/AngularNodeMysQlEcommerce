const MySqli = require('mysqli');

let conn = new MySqli({
   host: 'localhost',
    post: 3300,
    user: 'root',
    pass: '',
    db: 'amalitech_shop'
});

/*First attribute for the emit is set to false because it may have several multiple databases chained in here. We put our master database   */
let db = conn.emit(false,'');

module.exports = {
    database: db
}