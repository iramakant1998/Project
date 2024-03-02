import express, { Request, Response } from 'express';
import Grocery from '../models/groceries';
import User from '../models/User';
import {IUser} from '../models/IUser'

const app = express();
app.use(express.json());

// Create Grocery (Admin only)
export const createGrocery = async (req: Request, res: Response) => {
    try {
        const { name, price, inventory } = req.body;

        // Get user ID from request
        const userId = req.authInfo;
        // console.log(req.authInfo);
        

        // Find user by ID and check role
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Check if user role is ADMIN
        if (user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Permission denied.' });
        }

        const grocery = new Grocery({ name, price, inventory });
        await grocery.save();
        res.send('Grocery item added successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding grocery item.');
    }
};

// Delete Grocery (Admin only)
export const deleteGrocery = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Get user ID from request
        const userId = req.authInfo;

        // Find user by ID and check role
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Check if user role is ADMIN
        if (user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Permission denied.' });
        }

        await Grocery.findByIdAndDelete(id);
        res.send('Grocery item removed successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error removing grocery item.');
    }
};

// Update Grocery (Admin only)
export const updateGrocery = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, price, inventory } = req.body;

        // Get user ID from request
        const userId = req.authInfo;

        // Find user by ID and check role
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Check if user role is ADMIN
        if (user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Permission denied.' });
        }

        await Grocery.findByIdAndUpdate(id, { name, price, inventory });
        res.send('Grocery item updated successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating grocery item.');
    }
};

// Manage Inventory (Admin only)
export const manageInventory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { inventory } = req.body;

        // Get user ID from request
        const userId = req.authInfo;

        // Find user by ID and check role
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Check if user role is ADMIN
        if (user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Permission denied.' });
        }

        // Find the grocery item by ID
        const grocery = await Grocery.findById(id);
        if (!grocery) {
            return res.status(404).json({ message: 'Grocery item not found.' });
        }

        // Update the inventory level
        grocery.inventory = inventory;
        await grocery.save();

        res.json({ message: 'Inventory level updated successfully.', grocery });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating inventory level.');
    }
};

// User Endpoints
export const readGrocery = async (req: Request, res: Response) => {
    try {
        const groceries = await Grocery.find();
        res.json(groceries);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching grocery items.');
    }
};


export const placeGrocery = async (req: Request, res: Response) => {
    try {
        const itemIds: string[] = req.body;
        // Here you can implement order creation logic
        res.json({ message: 'Order placed successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error placing order.');
    }
};
