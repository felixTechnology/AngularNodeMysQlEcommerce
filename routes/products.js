const express = require('express');
const router = express.Router();
const {database} = require('../config/helpers');



/*GET ALL PRODUCTS */
/* GET home page. */
router.get('/', function(req, res) {

  //passing page attribute from get request,if it meet the consition assign page, else assign 1
  let page = (req.query.page !== undefined && req.query.page !== 0 ) ? req.query.page : 1 //set the current page number
  const  limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 10; //set the limit of items per page

   let startValue;
   let endValue;


   if( page > 0){

     startValue = (page * limit ) - limit; //if page is 1st page, you have 1 x 10 - 10 giving you 0 & if it's 2nd

       endValue = page * limit;
   }
   else{
       startValue = 0;
        endValue = 10;
   }



   database.table('products as p')

       .join([{



       }])

});

module.exports = router;
