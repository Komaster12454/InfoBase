// api/compile.js
import fetch from 'node-fetch';
import { NodeVM } from 'vm2';

export default async (req, res) => {
    if (req.method === 'POST') {
        const { code } = req.body;

        // Create a VM instance for running code securely
        const vm = new NodeVM({
            console: 'inherit', // Allow console logging
            sandbox: {},
            require: {
                external: true, // Allow loading external modules (if needed)
            },
        });

        let result;
        let errorMessage;

        try {
            // Run the code in the VM
            result = vm.run(code);
        } catch (error) {
            errorMessage = error.message; // Capture any runtime errors
        }

        // Return the result or error message
        res.status(200).json({
            output: errorMessage ? `Error: ${errorMessage}` : `Output: ${result}`,
        });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
};
