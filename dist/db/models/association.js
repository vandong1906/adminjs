import Address from './addresses.entity.js';
import Asset from './assets.entity.js';
import Attributable from './attributables.entity.js';
import Attribute from './attributes.entity.js';
import AttributeGroup from './attributeGroups.entity.js';
import Brand from './brands.entity.js';
import BrandCollection from './brandCollections.entity.js';
import BrandDiscount from './brandDiscounts.entity.js';
import Cart from './carts.entity.js';
import CartAddress from './cartAddresses.entity.js';
import CartLine from './cartLines.entity.js';
import CartLineDiscount from './cartLineDiscounts.entity.js';
import Channel from './channels.entity.js';
import Channelable from './channelables.entity.js';
import Collection from './collections.entity.js';
import CollectionCustomerGroup from './collectionCustomerGroups.entity.js';
import CollectionDiscount from './collectionDiscounts.entity.js';
import CollectionGroup from './collectionGroups.entity.js';
import CollectionProduct from './collectionProducts.entity.js';
import Country from './countries.entity.js';
import Currency from './currencies.entity.js';
import Customer from './customers.entity.js';
import CustomerCustomerGroup from './customerCustomerGroups.entity.js';
import CustomerDiscount from './customerDiscounts.entity.js';
import CustomerGroup from './customerGroups.entity.js';
import CustomerGroupDiscount from './customerGroupDiscounts.entity.js';
import CustomerGroupProduct from './customerGroupProducts.entity.js';
import Discount from './discounts.entity.js';
import DiscountPurchasable from './discountPurchasables.entity.js';
import Language from './languages.entity.js';
import Media from './media.entity.js';
import MediaProductVariant from './mediaProductVariants.entity.js';
import Order from './orders.entity.js';
import OrderAddress from './orderAddresses.entity.js';
import OrderLine from './orderLines.entity.js';
import Price from './prices.entity.js';
import Product from './products.entity.js';
import ProductAssociation from './productAssociations.entity.js';
import ProductOption from './productOptions.entity.js';
import ProductOptionValue from './productOptionValues.entity.js';
import ProductOptionValueProductVariant from './productOptionValueProductVariants.entity.js';
import ProductProductOption from './productProductOptions.entity.js';
import ProductType from './productTypes.entity.js';
import ProductVariant from './productVariants.entity.js';
import Staff from './staff.entity.js';
import State from './states.entity.js';
import Taggable from './taggables.entity.js';
import Tag from './tags.entity.js';
import TaxClass from './taxClasses.entity.js';
import TaxRate from './taxRates.entity.js';
import TaxRateAmount from './taxRateAmounts.entity.js';
import TaxZone from './taxZones.entity.js';
import TaxZoneCountry from './taxZoneCountries.entity.js';
import TaxZoneCustomerGroup from './taxZoneCustomerGroups.entity.js';
import TaxZonePostcode from './taxZonePostcodes.entity.js';
import TaxZoneState from './taxZoneStates.entity.js';
import Transaction from './transactions.entity.js';
import Url from './urls.entity.js';
import User from './user.enity.js';
import sequelize from '../config.js';
const models = {
    Address,
    Asset,
    Attributable,
    Attribute,
    AttributeGroup,
    Brand,
    BrandCollection,
    BrandDiscount,
    Cart,
    CartAddress,
    CartLine,
    CartLineDiscount,
    Channel,
    Channelable,
    Collection,
    CollectionCustomerGroup,
    CollectionDiscount,
    CollectionGroup,
    CollectionProduct,
    Country,
    Currency,
    Customer,
    CustomerCustomerGroup,
    CustomerDiscount,
    CustomerGroup,
    CustomerGroupDiscount,
    CustomerGroupProduct,
    Discount,
    DiscountPurchasable,
    Language,
    Media,
    MediaProductVariant,
    Order,
    OrderAddress,
    OrderLine,
    Price,
    Product,
    ProductAssociation,
    ProductOption,
    ProductOptionValue,
    ProductOptionValueProductVariant,
    ProductProductOption,
    ProductType,
    ProductVariant,
    Staff,
    State,
    Taggable,
    Tag,
    TaxClass,
    TaxRate,
    TaxRateAmount,
    TaxZone,
    TaxZoneCountry,
    TaxZoneCustomerGroup,
    TaxZonePostcode,
    TaxZoneState,
    Transaction,
    Url,
    User,
};
Address.belongsTo(models.Customer, { foreignKey: 'customer_id', onDelete: 'CASCADE' });
Address.belongsTo(models.Country, { foreignKey: 'country_id', onDelete: 'SET NULL' });
Attributable.belongsTo(models.Attribute, { foreignKey: 'attribute_id', onDelete: 'CASCADE' });
Attribute.belongsTo(models.AttributeGroup, { foreignKey: 'attribute_group_id', onDelete: 'CASCADE' });
Attribute.hasMany(models.Attributable, { foreignKey: 'attribute_id', onDelete: 'CASCADE' });
AttributeGroup.hasMany(models.Attribute, { foreignKey: 'attribute_group_id', onDelete: 'CASCADE' });
Brand.hasMany(models.Product, { foreignKey: 'brand_id', onDelete: 'SET NULL' });
Brand.belongsToMany(models.Collection, { through: models.BrandCollection, foreignKey: 'brand_id' });
Brand.hasMany(models.BrandDiscount, { foreignKey: 'brand_id', onDelete: 'CASCADE' });
BrandCollection.belongsTo(models.Brand, { foreignKey: 'brand_id', onDelete: 'CASCADE' });
BrandCollection.belongsTo(models.Collection, { foreignKey: 'collection_id', onDelete: 'CASCADE' });
BrandDiscount.belongsTo(models.Brand, { foreignKey: 'brand_id', onDelete: 'CASCADE' });
BrandDiscount.belongsTo(models.Discount, { foreignKey: 'discount_id', onDelete: 'CASCADE' });
Cart.belongsTo(models.Customer, { foreignKey: 'customer_id', onDelete: 'SET NULL' });
Cart.belongsTo(models.Currency, { foreignKey: 'currency_id', onDelete: 'SET NULL' });
Cart.belongsTo(models.Channel, { foreignKey: 'channel_id', onDelete: 'SET NULL' });
Cart.belongsTo(models.Order, { foreignKey: 'order_id', onDelete: 'SET NULL' });
Cart.hasMany(models.CartAddress, { foreignKey: 'cart_id', onDelete: 'CASCADE' });
Cart.hasMany(models.CartLine, { foreignKey: 'cart_id', onDelete: 'CASCADE' });
CartAddress.belongsTo(models.Cart, { foreignKey: 'cart_id', onDelete: 'CASCADE' });
CartAddress.belongsTo(models.Country, { foreignKey: 'country_id', onDelete: 'SET NULL' });
CartLine.belongsTo(models.Cart, { foreignKey: 'cart_id', onDelete: 'CASCADE' });
CartLine.hasMany(models.CartLineDiscount, { foreignKey: 'cart_line_id', onDelete: 'CASCADE' });
CartLineDiscount.belongsTo(models.CartLine, { foreignKey: 'cart_line_id', onDelete: 'CASCADE' });
CartLineDiscount.belongsTo(models.Discount, { foreignKey: 'discount_id', onDelete: 'CASCADE' });
Channel.hasMany(models.Channelable, { foreignKey: 'channel_id', onDelete: 'CASCADE' });
Channel.hasMany(models.Cart, { foreignKey: 'channel_id', onDelete: 'SET NULL' });
Channel.hasMany(models.Order, { foreignKey: 'channel_id', onDelete: 'SET NULL' });
Channelable.belongsTo(models.Channel, { foreignKey: 'channel_id', onDelete: 'CASCADE' });
Collection.belongsTo(models.CollectionGroup, { foreignKey: 'collection_group_id', onDelete: 'SET NULL' });
Collection.belongsToMany(models.Brand, { through: models.BrandCollection, foreignKey: 'collection_id' });
Collection.hasMany(models.CollectionCustomerGroup, { foreignKey: 'collection_id', onDelete: 'CASCADE' });
Collection.hasMany(models.CollectionDiscount, { foreignKey: 'collection_id', onDelete: 'CASCADE' });
Collection.hasMany(models.CollectionProduct, { foreignKey: 'collection_id', onDelete: 'CASCADE' });
CollectionCustomerGroup.belongsTo(models.Collection, { foreignKey: 'collection_id', onDelete: 'CASCADE' });
CollectionCustomerGroup.belongsTo(models.CustomerGroup, { foreignKey: 'customer_group_id', onDelete: 'CASCADE' });
CollectionDiscount.belongsTo(models.Discount, { foreignKey: 'discount_id', onDelete: 'CASCADE' });
CollectionDiscount.belongsTo(models.Collection, { foreignKey: 'collection_id', onDelete: 'CASCADE' });
CollectionGroup.hasMany(models.Collection, { foreignKey: 'collection_group_id', onDelete: 'CASCADE' });
CollectionProduct.belongsTo(models.Collection, { foreignKey: 'collection_id', onDelete: 'CASCADE' });
CollectionProduct.belongsTo(models.Product, { foreignKey: 'product_id', onDelete: 'CASCADE' });
Country.hasMany(models.Address, { foreignKey: 'country_id', onDelete: 'SET NULL' });
Country.hasMany(models.CartAddress, { foreignKey: 'country_id', onDelete: 'SET NULL' });
Country.hasMany(models.OrderAddress, { foreignKey: 'country_id', onDelete: 'SET NULL' });
Country.hasMany(models.State, { foreignKey: 'country_id', onDelete: 'CASCADE' });
Country.hasMany(models.TaxZoneCountry, { foreignKey: 'country_id', onDelete: 'CASCADE' });
Country.hasMany(models.TaxZonePostcode, { foreignKey: 'country_id', onDelete: 'CASCADE' });
Currency.hasMany(models.Cart, { foreignKey: 'currency_id', onDelete: 'SET NULL' });
Currency.hasMany(models.Price, { foreignKey: 'currency_id', onDelete: 'CASCADE' });
Customer.hasMany(models.Address, { foreignKey: 'customer_id', onDelete: 'CASCADE' });
Customer.hasMany(models.Cart, { foreignKey: 'customer_id', onDelete: 'SET NULL' });
Customer.hasMany(models.Order, { foreignKey: 'customer_id', onDelete: 'SET NULL' });
Customer.belongsToMany(models.CustomerGroup, { through: models.CustomerCustomerGroup, foreignKey: 'customer_id' });
Customer.hasMany(models.CustomerDiscount, { foreignKey: 'customer_id', onDelete: 'CASCADE' });
CustomerCustomerGroup.belongsTo(models.Customer, { foreignKey: 'customer_id', onDelete: 'CASCADE' });
CustomerCustomerGroup.belongsTo(models.CustomerGroup, { foreignKey: 'customer_group_id', onDelete: 'CASCADE' });
CustomerDiscount.belongsTo(models.Customer, { foreignKey: 'customer_id', onDelete: 'CASCADE' });
CustomerDiscount.belongsTo(models.Discount, { foreignKey: 'discount_id', onDelete: 'CASCADE' });
CustomerGroup.belongsToMany(models.Customer, { through: models.CustomerCustomerGroup, foreignKey: 'customer_group_id' });
CustomerGroup.hasMany(models.CustomerGroupDiscount, { foreignKey: 'customer_group_id', onDelete: 'CASCADE' });
CustomerGroup.hasMany(models.CustomerGroupProduct, { foreignKey: 'customer_group_id', onDelete: 'CASCADE' });
CustomerGroup.hasMany(models.TaxZoneCustomerGroup, { foreignKey: 'customer_group_id', onDelete: 'CASCADE' });
CustomerGroupDiscount.belongsTo(models.CustomerGroup, { foreignKey: 'customer_group_id', onDelete: 'CASCADE' });
CustomerGroupDiscount.belongsTo(models.Discount, { foreignKey: 'discount_id', onDelete: 'CASCADE' });
CustomerGroupProduct.belongsTo(models.CustomerGroup, { foreignKey: 'customer_group_id', onDelete: 'CASCADE' });
CustomerGroupProduct.belongsTo(models.Product, { foreignKey: 'product_id', onDelete: 'CASCADE' });
Discount.hasMany(models.BrandDiscount, { foreignKey: 'discount_id', onDelete: 'CASCADE' });
Discount.hasMany(models.CartLineDiscount, { foreignKey: 'discount_id', onDelete: 'CASCADE' });
Discount.hasMany(models.CollectionDiscount, { foreignKey: 'discount_id', onDelete: 'CASCADE' });
Discount.hasMany(models.CustomerDiscount, { foreignKey: 'discount_id', onDelete: 'CASCADE' });
Discount.hasMany(models.CustomerGroupDiscount, { foreignKey: 'discount_id', onDelete: 'CASCADE' });
Discount.hasMany(models.DiscountPurchasable, { foreignKey: 'discount_id', onDelete: 'CASCADE' });
DiscountPurchasable.belongsTo(models.Discount, { foreignKey: 'discount_id', onDelete: 'CASCADE' });
Language.hasMany(models.Url, { foreignKey: 'language_id', onDelete: 'CASCADE' });
Media.hasMany(models.MediaProductVariant, { foreignKey: 'media_id', onDelete: 'CASCADE' });
MediaProductVariant.belongsTo(models.ProductVariant, { foreignKey: 'product_variant_id', onDelete: 'CASCADE' });
MediaProductVariant.belongsTo(models.Media, { foreignKey: 'media_id', onDelete: 'CASCADE' });
Order.belongsTo(models.Customer, { foreignKey: 'customer_id', onDelete: 'SET NULL' });
Order.belongsTo(models.Channel, { foreignKey: 'channel_id', onDelete: 'SET NULL' });
Order.hasMany(models.OrderAddress, { foreignKey: 'order_id', onDelete: 'CASCADE' });
Order.hasMany(models.OrderLine, { foreignKey: 'order_id', onDelete: 'CASCADE' });
Order.hasMany(models.Transaction, { foreignKey: 'order_id', onDelete: 'CASCADE' });
Order.hasOne(models.Cart, { foreignKey: 'order_id', onDelete: 'SET NULL' });
OrderAddress.belongsTo(models.Order, { foreignKey: 'order_id', onDelete: 'CASCADE' });
OrderAddress.belongsTo(models.Country, { foreignKey: 'country_id', onDelete: 'SET NULL' });
OrderLine.belongsTo(models.Order, { foreignKey: 'order_id', onDelete: 'CASCADE' });
Price.belongsTo(models.Currency, { foreignKey: 'currency_id', onDelete: 'CASCADE' });
Price.belongsTo(models.CustomerGroup, { foreignKey: 'customer_group_id', onDelete: 'SET NULL' });
Product.belongsTo(models.ProductType, { foreignKey: 'product_type_id', onDelete: 'SET NULL' });
Product.belongsTo(models.Brand, { foreignKey: 'brand_id', onDelete: 'SET NULL' });
Product.hasMany(models.ProductVariant, { foreignKey: 'product_id', onDelete: 'CASCADE' });
Product.hasMany(models.ProductAssociation, { foreignKey: 'product_parent_id', onDelete: 'CASCADE', as: 'ParentAssociations' });
Product.hasMany(models.ProductAssociation, { foreignKey: 'product_target_id', onDelete: 'CASCADE', as: 'TargetAssociations' });
Product.hasMany(models.CollectionProduct, { foreignKey: 'product_id', onDelete: 'CASCADE' });
Product.hasMany(models.CustomerGroupProduct, { foreignKey: 'product_id', onDelete: 'CASCADE' });
Product.hasMany(models.ProductProductOption, { foreignKey: 'product_id', onDelete: 'CASCADE' });
ProductAssociation.belongsTo(models.Product, { foreignKey: 'product_parent_id', onDelete: 'CASCADE', as: 'Parent' });
ProductAssociation.belongsTo(models.Product, { foreignKey: 'product_target_id', onDelete: 'CASCADE', as: 'Target' });
ProductOption.hasMany(models.ProductOptionValue, { foreignKey: 'product_option_id', onDelete: 'CASCADE' });
ProductOption.hasMany(models.ProductProductOption, { foreignKey: 'product_option_id', onDelete: 'CASCADE' });
ProductOptionValue.belongsTo(models.ProductOption, { foreignKey: 'product_option_id', onDelete: 'CASCADE' });
ProductOptionValue.hasMany(models.ProductOptionValueProductVariant, { foreignKey: 'value_id', onDelete: 'CASCADE' });
ProductOptionValueProductVariant.belongsTo(models.ProductOptionValue, { foreignKey: 'value_id', onDelete: 'CASCADE' });
ProductOptionValueProductVariant.belongsTo(models.ProductVariant, { foreignKey: 'variant_id', onDelete: 'CASCADE' });
ProductProductOption.belongsTo(models.Product, { foreignKey: 'product_id', onDelete: 'CASCADE' });
ProductProductOption.belongsTo(models.ProductOption, { foreignKey: 'product_option_id', onDelete: 'CASCADE' });
ProductType.hasMany(models.Product, { foreignKey: 'product_type_id', onDelete: 'SET NULL' });
ProductVariant.belongsTo(models.Product, { foreignKey: 'product_id', onDelete: 'CASCADE' });
ProductVariant.belongsTo(models.TaxClass, { foreignKey: 'tax_class_id', onDelete: 'SET NULL' });
ProductVariant.hasMany(models.MediaProductVariant, { foreignKey: 'product_variant_id', onDelete: 'CASCADE' });
ProductVariant.hasMany(models.ProductOptionValueProductVariant, { foreignKey: 'variant_id', onDelete: 'CASCADE' });
State.belongsTo(models.Country, { foreignKey: 'country_id', onDelete: 'CASCADE' });
State.hasMany(models.TaxZoneState, { foreignKey: 'state_id', onDelete: 'CASCADE' });
Taggable.belongsTo(models.Tag, { foreignKey: 'tag_id', onDelete: 'CASCADE' });
Tag.hasMany(models.Taggable, { foreignKey: 'tag_id', onDelete: 'CASCADE' });
TaxClass.hasMany(models.ProductVariant, { foreignKey: 'tax_class_id', onDelete: 'SET NULL' });
TaxClass.hasMany(models.TaxRateAmount, { foreignKey: 'tax_class_id', onDelete: 'CASCADE' });
TaxRate.belongsTo(models.TaxZone, { foreignKey: 'tax_zone_id', onDelete: 'CASCADE' });
TaxRate.hasMany(models.TaxRateAmount, { foreignKey: 'tax_rate_id', onDelete: 'CASCADE' });
TaxRateAmount.belongsTo(models.TaxClass, { foreignKey: 'tax_class_id', onDelete: 'CASCADE' });
TaxRateAmount.belongsTo(models.TaxRate, { foreignKey: 'tax_rate_id', onDelete: 'CASCADE' });
TaxZone.hasMany(models.TaxRate, { foreignKey: 'tax_zone_id', onDelete: 'CASCADE' });
TaxZone.hasMany(models.TaxZoneCountry, { foreignKey: 'tax_zone_id', onDelete: 'CASCADE' });
TaxZone.hasMany(models.TaxZoneCustomerGroup, { foreignKey: 'tax_zone_id', onDelete: 'CASCADE' });
TaxZone.hasMany(models.TaxZonePostcode, { foreignKey: 'tax_zone_id', onDelete: 'CASCADE' });
TaxZone.hasMany(models.TaxZoneState, { foreignKey: 'tax_zone_id', onDelete: 'CASCADE' });
TaxZoneCountry.belongsTo(models.TaxZone, { foreignKey: 'tax_zone_id', onDelete: 'CASCADE' });
TaxZoneCountry.belongsTo(models.Country, { foreignKey: 'country_id', onDelete: 'CASCADE' });
TaxZoneCustomerGroup.belongsTo(models.TaxZone, { foreignKey: 'tax_zone_id', onDelete: 'CASCADE' });
TaxZoneCustomerGroup.belongsTo(models.CustomerGroup, { foreignKey: 'customer_group_id', onDelete: 'CASCADE' });
TaxZonePostcode.belongsTo(models.TaxZone, { foreignKey: 'tax_zone_id', onDelete: 'CASCADE' });
TaxZonePostcode.belongsTo(models.Country, { foreignKey: 'country_id', onDelete: 'CASCADE' });
TaxZoneState.belongsTo(models.TaxZone, { foreignKey: 'tax_zone_id', onDelete: 'CASCADE' });
TaxZoneState.belongsTo(models.State, { foreignKey: 'state_id', onDelete: 'CASCADE' });
Transaction.belongsTo(models.Order, { foreignKey: 'order_id', onDelete: 'CASCADE' });
Url.belongsTo(models.Language, { foreignKey: 'language_id', onDelete: 'CASCADE' });
Order.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'SET NULL' });
User.hasMany(models.Order, { foreignKey: 'user_id' });
export { sequelize, models };
