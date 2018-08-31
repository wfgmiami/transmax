const conn = require('./conn');

const Candidate = require( './Candidate' );


const Product = require( './Product' );
const Review = require( './Review' );
const Order = require('./Order' );
const Category = require( './Category');
const LineItem = require('./LineItem');
const Attribute = require('./Attribute');
const Attributevalue = require('./Attributevalue')
const CategoryAttributeValue = require('./CategoryAttributeValue')
const ProductAttributeValue = require('./ProductAttributeValue')

const seed = require('./Seed')

User.hasMany(Order);       //joe - order1, order2, etc
Category.hasMany(Product); //sunglasses - glass1, glass2, etc
Attribute.hasMany(Attributevalue) //color = black, red


// 1st join relation
Order.hasMany(LineItem);   //order1 = order1 product1, order1 product2
Product.hasMany(LineItem);  //product1 = product1 order1, product1 order2
LineItem.belongsTo(Product); //product1 order1 = product1
LineItem.belongsTo(Order);  // order1 product2 = order1


// 2nd join relation
Category.hasMany(CategoryAttributeValue); //cat1 = cat1 black, cat1 red
Attributevalue.hasMany(CategoryAttributeValue); //black = black cat1, black cat2

CategoryAttributeValue.belongsTo(Category) //cat1 black = cat1
CategoryAttributeValue.belongsTo(Attributevalue) //cat1 square = square


// 3rd join relation
Product.hasMany(ProductAttributeValue); //glass1 = glass1 black, glass1 red
Attributevalue.hasMany(ProductAttributeValue); //black = black glass1, black glass2

ProductAttributeValue.belongsTo(Product) //glass1 black = glass1
ProductAttributeValue.belongsTo(Attributevalue) //glass1 black = black


module.exports = {
  seed,
  models:{
    User,
    Product,
    Review,
    Order,
    Category,
    Attribute,
    Attributevalue,
    CategoryAttributeValue,
    ProductAttributeValue
  }
}