import { models } from '../../src/db/models/association.js';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const createSampleProductVariants = async () => {
  try {
    console.log('Creating sample product variants...');

    // Get all products to associate variants with
    const products = await models.Product.findAll();

    if (products.length === 0) {
      console.log('No products found to create variants for. Please create products first.');
      return;
    }
    
    // Get tax class
    const taxClass = await models.TaxClass.findOne();
    
    if (!taxClass) {
      console.log('No tax class found. Please create tax classes first.');
      return;
    }

    // Check if variants already exist
    const existingVariants = await models.ProductVariant.count();
    if (existingVariants > 0) {
      console.log(`Found ${existingVariants} existing product variants. Skipping variant creation.`);
      return;
    }

    // Sample variant data mapped to products by type
    const clothingProduct = products.find(p => p.attribute_data?.name?.includes('T-Shirt'));
    const smartphoneProduct = products.find(p => p.attribute_data?.name?.includes('Smartphone'));
    const coffeeProduct = products.find(p => p.attribute_data?.name?.includes('Coffee'));
    const jeansProduct = products.find(p => p.attribute_data?.name?.includes('Jeans'));
    const headphonesProduct = products.find(p => p.attribute_data?.name?.includes('Headphones'));

    // Sample variants for each product
    let sampleVariants = [];

    // T-shirt variants
    if (clothingProduct) {
      sampleVariants = sampleVariants.concat([
        {
          product_id: clothingProduct.id,
          tax_class_id: taxClass.id,
          sku: 'TSHIRT-S-WHITE',
          stock: 50,
          unit_quantity: 1,
          backorder: 10,
          purchasable: 'always',
          attribute_data: { 
            size: 'S', 
            color: 'White',
            material: '100% Cotton',
            price: 19.99
          }
        },
        {
          product_id: clothingProduct.id,
          tax_class_id: taxClass.id,
          sku: 'TSHIRT-M-WHITE',
          stock: 40,
          unit_quantity: 1,
          backorder: 10,
          purchasable: 'always',
          attribute_data: { 
            size: 'M', 
            color: 'White',
            material: '100% Cotton',
            price: 19.99
          }
        },
        {
          product_id: clothingProduct.id,
          tax_class_id: taxClass.id,
          sku: 'TSHIRT-L-WHITE',
          stock: 30,
          unit_quantity: 1,
          backorder: 10,
          purchasable: 'always',
          attribute_data: { 
            size: 'L', 
            color: 'White',
            material: '100% Cotton',
            price: 19.99
          }
        },
        {
          product_id: clothingProduct.id,
          tax_class_id: taxClass.id,
          sku: 'TSHIRT-S-BLACK',
          stock: 45,
          unit_quantity: 1,
          backorder: 10,
          purchasable: 'always',
          attribute_data: { 
            size: 'S', 
            color: 'Black',
            material: '100% Cotton',
            price: 19.99
          }
        },
        {
          product_id: clothingProduct.id,
          tax_class_id: taxClass.id,
          sku: 'TSHIRT-M-BLACK',
          stock: 35,
          unit_quantity: 1,
          backorder: 10,
          purchasable: 'always',
          attribute_data: { 
            size: 'M', 
            color: 'Black',
            material: '100% Cotton',
            price: 19.99
          }
        }
      ]);
    }
      
    // Smartphone variants
    if (smartphoneProduct) {
      sampleVariants = sampleVariants.concat([
        {
          product_id: smartphoneProduct.id,
          tax_class_id: taxClass.id,
          sku: 'PHONE-128GB-BLACK',
          stock: 20,
          unit_quantity: 1,
          backorder: 5,
          purchasable: 'always',
          attribute_data: { 
            storage: '128GB', 
            color: 'Black',
            warranty: '12 months',
            price: 999.99
          }
        },
        {
          product_id: smartphoneProduct.id,
          tax_class_id: taxClass.id,
          sku: 'PHONE-256GB-BLACK',
          stock: 15,
          unit_quantity: 1,
          backorder: 5,
          purchasable: 'always',
          attribute_data: { 
            storage: '256GB', 
            color: 'Black',
            warranty: '12 months',
            price: 1099.99
          }
        },
        {
          product_id: smartphoneProduct.id,
          tax_class_id: taxClass.id,
          sku: 'PHONE-128GB-BLUE',
          stock: 18,
          unit_quantity: 1,
          backorder: 5,
          purchasable: 'always',
          attribute_data: { 
            storage: '128GB', 
            color: 'Blue',
            warranty: '12 months',
            price: 999.99
          }
        }
      ]);
    }
      
    // Coffee variants
    if (coffeeProduct) {
      sampleVariants = sampleVariants.concat([
        {
          product_id: coffeeProduct.id,
          tax_class_id: taxClass.id,
          sku: 'COFFEE-250G-ARABICA',
          stock: 100,
          unit_quantity: 1,
          backorder: 20,
          purchasable: 'always',
          attribute_data: { 
            weight: '250g', 
            bean_type: 'Arabica',
            roast: 'Medium',
            price: 14.99
          }
        },
        {
          product_id: coffeeProduct.id,
          tax_class_id: taxClass.id,
          sku: 'COFFEE-500G-ARABICA',
          stock: 80,
          unit_quantity: 1,
          backorder: 20,
          purchasable: 'always',
          attribute_data: { 
            weight: '500g', 
            bean_type: 'Arabica',
            roast: 'Medium',
            price: 24.99
          }
        },
        {
          product_id: coffeeProduct.id,
          tax_class_id: taxClass.id,
          sku: 'COFFEE-1KG-ARABICA',
          stock: 60,
          unit_quantity: 1,
          backorder: 20,
          purchasable: 'always',
          attribute_data: { 
            weight: '1kg', 
            bean_type: 'Arabica',
            roast: 'Medium',
            price: 39.99
          }
        }
      ]);
    }

    // Jeans variants
    if (jeansProduct) {
      sampleVariants = sampleVariants.concat([
        {
          product_id: jeansProduct.id,
          tax_class_id: taxClass.id,
          sku: 'JEANS-30-BLUE',
          stock: 40,
          unit_quantity: 1,
          backorder: 10,
          purchasable: 'always',
          attribute_data: { 
            size: '30', 
            color: 'Blue',
            material: 'Denim',
            price: 49.99
          }
        },
        {
          product_id: jeansProduct.id,
          tax_class_id: taxClass.id,
          sku: 'JEANS-32-BLUE',
          stock: 35,
          unit_quantity: 1,
          backorder: 10,
          purchasable: 'always',
          attribute_data: { 
            size: '32', 
            color: 'Blue',
            material: 'Denim',
            price: 49.99
          }
        },
        {
          product_id: jeansProduct.id,
          tax_class_id: taxClass.id,
          sku: 'JEANS-34-BLUE',
          stock: 30,
          unit_quantity: 1,
          backorder: 10,
          purchasable: 'always',
          attribute_data: { 
            size: '34', 
            color: 'Blue',
            material: 'Denim',
            price: 49.99
          }
        }
      ]);
    }

    // Headphones variants
    if (headphonesProduct) {
      sampleVariants = sampleVariants.concat([
        {
          product_id: headphonesProduct.id,
          tax_class_id: taxClass.id,
          sku: 'HEADPHONES-BLACK',
          stock: 25,
          unit_quantity: 1,
          backorder: 5,
          purchasable: 'always',
          attribute_data: { 
            color: 'Black',
            warranty: '12 months',
            price: 149.99
          }
        },
        {
          product_id: headphonesProduct.id,
          tax_class_id: taxClass.id,
          sku: 'HEADPHONES-WHITE',
          stock: 20,
          unit_quantity: 1,
          backorder: 5,
          purchasable: 'always',
          attribute_data: { 
            color: 'White',
            warranty: '12 months',
            price: 149.99
          }
        }
      ]);
    }

    // If no specific products were found, use the first product for all variants
    if (sampleVariants.length === 0 && products.length > 0) {
      sampleVariants = [
        {
          product_id: products[0].id,
          tax_class_id: taxClass.id,
          sku: 'VARIANT-01',
          stock: 50,
          unit_quantity: 1,
          backorder: 10,
          purchasable: 'always',
          attribute_data: { 
            size: 'Standard', 
            color: 'Default',
            price: 29.99
          }
        },
        {
          product_id: products[0].id,
          tax_class_id: taxClass.id,
          sku: 'VARIANT-02',
          stock: 40,
          unit_quantity: 1,
          backorder: 10,
          purchasable: 'always',
          attribute_data: { 
            size: 'Premium', 
            color: 'Deluxe',
            price: 39.99
          }
        }
      ];
    }

    // Create each product variant
    const createdVariants = [];
    for (const variantData of sampleVariants) {
      const variant = await models.ProductVariant.create(variantData);
      createdVariants.push(variant);
      console.log(`Created product variant: ${variant.sku}`);
      
      // Create sample media for each variant (if images directory exists)
      const sampleImagesDir = path.join(process.cwd(), 'public', 'sample-images');
      if (fs.existsSync(sampleImagesDir)) {
        // Get a random image from the sample images directory
        const imageFiles = fs.readdirSync(sampleImagesDir)
          .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file));
          
        if (imageFiles.length > 0) {
          const randomImageFile = imageFiles[Math.floor(Math.random() * imageFiles.length)];
          const sourceImagePath = path.join(sampleImagesDir, randomImageFile);
          
          // Create uploads directory if it doesn't exist
          const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'variants');
          if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
          }
          
          // Copy the image to the uploads directory with a unique name
          const imageName = `${Date.now()}-${randomImageFile}`;
          const targetImagePath = path.join(uploadsDir, imageName);
          fs.copyFileSync(sourceImagePath, targetImagePath);
          
          // Calculate file size
          const stats = fs.statSync(targetImagePath);
          const fileSize = stats.size;
          
          // Create media record
          const media = await models.Media.create({
            model_type: 'ProductVariant',
            model_id: variant.id,
            uuid: uuidv4(),
            collection_name: 'variant-images',
            name: path.basename(randomImageFile, path.extname(randomImageFile)),
            file_name: imageName,
            mime_type: `image/${path.extname(randomImageFile).substring(1)}`,
            disk: 'public',
            conversions_disk: 'public',
            size: fileSize,
            manipulations: {},
            custom_properties: { url: `/uploads/variants/${imageName}` },
            generated_conversions: {},
            responsive_images: {},
            order_column: 1
          });
          
          // Create relationship between variant and media
          await models.MediaProductVariant.create({
            product_variant_id: variant.id,
            media_id: media.id
          });
          
          console.log(`  - Added image for variant: ${variant.sku}`);
        }
      } else {
        console.log('  - Sample images directory not found. Skipping image creation.');
      }
    }
    
    console.log(`Sample product variants created successfully: ${createdVariants.length} variants`);
  } catch (error) {
    console.error('Error creating sample product variants:', error);
    throw error;
  }
};

export default createSampleProductVariants; 