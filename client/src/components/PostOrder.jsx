import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_ORDER } from '../utils/mutations.js';
import '../styles/postOrder.css';
import svg from '../assets/svg.svg'


function PostOrder() {
    const [items, setItems] = useState([]);
    const [submitOrder, { loading, error }] = useMutation(ADD_ORDER);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Perform validation if needed
            if (!userId || !items || !Array.isArray(items) || items.length === 0) {
                throw new Error('Invalid.');
            }
            // Submit the order
            const { data } = await submitOrder({ variables: { items } });
            console.log('Order submitted:', data);

            // Reset the form
            setItems([]);
        } catch (error) {
            console.error('Failed to submit order:', error);
        }
    };

    return (
        <div className="post-order-container">
            <h2>Place Your Order</h2>
            <form onSubmit={handleSubmit} className="post-order-form">
                <label htmlFor="order">
                    Order
                    {data.items}
                    <input type="text" name="order" id="order" required />
                </label>
                <button type="submit" disabled={loading}> Place Order
                    {loading ? 'Placing Order...' : 'Place Order'}
                </button>
                {error && <p>Error: {error.message}</p>}
            </form>
            <img src={svg} alt="SVG Image" />

        </div>
    );
}

export default PostOrder;
