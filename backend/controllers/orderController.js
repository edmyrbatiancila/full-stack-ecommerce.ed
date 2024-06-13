import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


// placing user order for frontend
const placeOrder = async (req, res) => {

    const frontend_url = "http://localhost:5174";

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, {cartData: {}}); // clearing the cart items

        // logic to create payment link using stripe:
        const line_items = req.body.items.map((items) => ({
            price_data: {
            currency: "php",
            product_data: {
                name: items.name,
            },
            unit_amount: items.price * 100 * 58.42
            },
            quantity: items.quantity,
        }));

        // push the delivery items
        line_items.push({
            price_data: {
            currency: "php",
            product_data: {
                name: "Delivery Charges",
            },
            unit_amount: 2 * 100 * 58.42
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        });

        res.json({success: true, session_url: session.url});

    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

const verifyOrder = async (req, res) => {
    const {orderId, success} = req.body;
    try {
        if (success == "true") {
            await orderModel.findByIdAndUpdate(orderId, {payment: true});
            res.json({success: true, message: "Paid"});
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({success: false, message: "Not Paid"});
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}


// user orders for frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({userId: req.body.userId});
        res.json({success: true, data: orders});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

// check all the orders of the user by admin
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success: true, data: orders});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

// api for updating order status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status});
        res.json({success: true, message: "Status Updated"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
