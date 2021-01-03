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

           table: 'categories as c',
           on: 'c.id = p.cat_id'

       }])
       .withFields(['c.title as category',
       'p.title as name',
        'p.price',
        'p.quantity',
        'p.image',
        'p.id',
       ])
       .slice(startValue, endValue)
       .sort({id: .1})
       .getAll()
       .then(prods => {

           if (prods.length > 0) {

               res.status(200).json({
                   count: prods.length,
                   products: prods
               });
           }else {

               res.json({message: 'No products founds'})
           }

       }).catch(err => console.log(err));

});

/*fetching single product*/
/*CHECKING ROUTE ON POSTMAN: http://localhost:3000/api/products/category/shoes*/
router.get('/:prodId', (req,res) => {

///Fetching productID FROM THIS Parameter (prodID). The (params) object stores any
    //parameter that is sent to the url

    let productId =req.params.prodId;

    console.log(productId);


    database.table('products as p')

        .join([{

            table: 'categories as c',
            on: 'c.id = p.cat_id'

        }])
        .withFields(['c.title as category',
            'p.title as name',
            'p.price',
            'p.quantity',
            'p.image',
            'p.images',//we get the image with extra images when you click on single images
            'p.id',
        ])
       /* .sort({id: .1})*///we dont use sorting for fetching one product, we need filter to filter the result for just for that product
        .filter({'p.id' : productId})
        .get()
        .then(prod  => {

            if (prod) {

                res.status(200).json(prod);
            }else {

                res.json({message: `No products found with product id ${productId}`})
            }

        }).catch(err => console.log(err));
})

/*GET ALL PRODUCTS FROM ONE PARTICULAR CATEGORY*/
router.get('/category/:catName', (req, res) =>{
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



    //Fetch the category name from the url
      const cat_title = req.params.catName;
    database.table('products as p')

        .join([{

            table: 'categories as c',
            on: `c.id = p.cat_id WHERE c.title LIKE '%${cat_title}%'`

        }])
        .withFields(['c.title as category',
            'p.title as name',
            'p.price',
            'p.quantity',
            'p.image',
            'p.id',
        ])
        .slice(startValue, endValue)
        .sort({id: .1})
        .getAll()
        .then(prods => {

            if (prods.length > 0) {

                res.status(200).json({
                    count: prods.length,
                    products: prods
                });
            }else {

                res.json({message: `No products found from  ${cat_title} category`})
            }

        }).catch(err => console.log(err));


})

module.exports = router;
