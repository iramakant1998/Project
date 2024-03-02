import { Schema, model } from 'mongoose';

const GrocerySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    inventory: {
        type: Number,
        required: true,
    }
});

export default model('Grocery', GrocerySchema);
