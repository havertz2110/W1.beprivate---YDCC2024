
import type { NextApiRequest, NextApiResponse } from 'next'

export function handler(req:NextApiRequest, res:NextApiResponse) {
    console.log(req)
    if (req.method === 'POST') {
        // Assuming the request body contains the selected rows
        const selectedRows = req.body;
        console.log(selectedRows); // This will print the content received from the client
    
        // Send a response back to the client
        res.status(200).json({ message: 'Received' });
    } else {
        // Handle any other HTTP method
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}