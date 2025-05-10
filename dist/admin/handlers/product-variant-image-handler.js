import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { models } from '../../db/models/association.js';
const { ProductVariant, Media, MediaProductVariant } = models;
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'variants');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, uniqueSuffix + ext);
    }
});
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error('Invalid file type. Only JPEG, JPG, PNG, and WEBP are allowed.'));
    }
};
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
});
export const uploadProductVariantImages = async (req, res) => {
    try {
        const variantId = parseInt(req.params.id, 10);
        const variant = await ProductVariant.findByPk(variantId);
        if (!variant) {
            return res.status(404).json({ error: 'Product variant not found' });
        }
        upload.array('images', 10)(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            const multerReq = req;
            const files = multerReq.files;
            if (!files || files.length === 0) {
                return res.status(400).json({ error: 'No files were uploaded' });
            }
            const savedMedia = [];
            for (const file of files) {
                const uuid = uuidv4();
                const filePath = `/uploads/variants/${file.filename}`;
                const media = await Media.create({
                    model_type: 'ProductVariant',
                    model_id: variantId,
                    uuid,
                    collection_name: 'variant-images',
                    name: path.basename(file.originalname, path.extname(file.originalname)),
                    file_name: file.filename,
                    mime_type: file.mimetype,
                    disk: 'public',
                    conversions_disk: 'public',
                    size: file.size,
                    manipulations: {},
                    custom_properties: { url: filePath },
                    generated_conversions: {},
                    responsive_images: {},
                    order_column: 1
                });
                await MediaProductVariant.create({
                    product_variant_id: variantId,
                    media_id: media.id
                });
                savedMedia.push({
                    id: media.id,
                    name: media.name,
                    url: filePath,
                    mime_type: media.mime_type,
                    size: media.size
                });
            }
            return res.status(200).json({
                message: 'Images uploaded successfully',
                media: savedMedia
            });
        });
    }
    catch (error) {
        console.error('Error uploading product variant images:', error);
        return res.status(500).json({ error: 'Failed to upload images' });
    }
};
export const getProductVariantImages = async (req, res) => {
    try {
        const variantId = parseInt(req.params.id, 10);
        const mediaRelations = await MediaProductVariant.findAll({
            where: { product_variant_id: variantId }
        });
        const mediaIds = mediaRelations.map(relation => relation.media_id);
        const media = await Media.findAll({
            where: { id: mediaIds }
        });
        const formattedMedia = media.map(item => {
            const customProps = item.custom_properties;
            return {
                id: item.id,
                name: item.name,
                url: customProps?.url || `/uploads/variants/${item.file_name}`,
                mime_type: item.mime_type,
                size: item.size
            };
        });
        return res.status(200).json(formattedMedia);
    }
    catch (error) {
        console.error('Error fetching product variant images:', error);
        return res.status(500).json({ error: 'Failed to fetch images' });
    }
};
export const deleteProductVariantImage = async (req, res) => {
    try {
        const mediaId = parseInt(req.params.id, 10);
        const media = await Media.findByPk(mediaId);
        if (!media) {
            return res.status(404).json({ error: 'Media not found' });
        }
        const customProps = media.custom_properties;
        const filePath = path.join(process.cwd(), 'public', customProps?.url || `/uploads/variants/${media.file_name}`);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        await MediaProductVariant.destroy({
            where: { media_id: mediaId }
        });
        await media.destroy();
        return res.status(200).json({ message: 'Image deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting product variant image:', error);
        return res.status(500).json({ error: 'Failed to delete image' });
    }
};
