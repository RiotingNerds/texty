module.exports.route = {
  'GET /': 'sites.index',
  'GET /categories':"listing.index",
  'GET /categories/:mainCat':"listing.index",
  'GET /categories/:mainCat/:subCat':"listing.index",
  'GET /categories/:mainCat/:subCat/:type':"listing.index",
  'GET /api/affiliate':'affiliate.index',
  'GET /api/categories':"listing.index",
  'GET /api/categories/:mainCat':"listing.index",
  'GET /api/categories/:mainCat/:subCat':"listing.index",
  'GET /api/categories/:mainCat/:subCat/:type':"listing.index",
	'GET /api/brands': 'brands.index',
  'GET /api/products/:tagOne':"listing.index",
  'GET /api/products/merge':"product.merge",
  'GET /api/:brand':"listing.index",
  'GET /api/:brand/:product':"product.view",
  'GET /:brand':"listing.index",
  'GET /:brand/:product':"product.view"
}