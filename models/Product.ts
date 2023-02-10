import mongoose, { Schema, model, Model } from 'mongoose';
import { IProduct } from '../interfaces/products';

const ProductSchema = new Schema({
    description: { type: String, require: true },
    images: [{ type: String, require: true }],
    inStock: { type: Number, require: true, default: 0 },
    price: { type: Number, require: true, default: 0 },
    sizes: [{
        type: String,
        enum: {
            values: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            message: ['{VALUE} no es un tamaño permitido'],
        }
    }],
    slug: { type: String, require: true, unique: true },
    tags: [{ type: String }],
    title: { type: String, require: true },
    type: {
        type: String,
        enum: {
            values: ['shirts','pants','hoodies','hats'],
            message: ['{VALUE} no es un tipo permitido'],
        }
    },
    gender:{
        type: String,
        enum: {
            values: ['men','women','kid','unisex'],
            message: ['{VALUE} no es un genero permitido'],
        }
    },
},{
    timestamps: true
});

ProductSchema.index({ title: 'text', tags: 'text' });

const Product:Model<IProduct> = mongoose.models.Product || model( 'Product', ProductSchema );
export default Product;