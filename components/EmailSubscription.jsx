import React, { useState } from 'react';

function EmailSubscriptionForm() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            email,
            api_key: 'lJMo0y3KmuENRfecsjBROg'
        };

        try {
            const response = await fetch(`https://api.convertkit.com/v3/forms/6256114/subscribe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setError(''); // Clear any error messages
                console.log("Subscription successful");
                setSuccessMessage("Thank you for subscribing!"); // Display success message
                setEmail(''); // Clear the email input after successful submission
            } else {
                console.error("Subscription failed");
                setError("Subscription failed. Please try again later."); // Display error message for subscription failure
            }
        } catch (error) {
            console.error("Error submitting form", error);
            setError("An error occurred while submitting the form. Please try again later."); // Display error message for submission error
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                id="email"
                type="email"
                placeholder={'Email address'}
                className={'font-mono text-sm text-light-color-base-100 dark:text-light-color-base-00 bg-light-color-base-30 dark:bg-dark-color-base-30 px-2 py-1 rounded ml-2'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <button type="submit" className="font-mono uppercase text-sm text-light-color-base-00 bg-light-color-blue dark:bg-dark-color-blue px-2 py-1 rounded-sm ml-2">Subscribe</button>
            {successMessage && <div className="mt-2 center sm:mt-0 sm:inline font-mono ml-4 text-sm text-light-color-green">{successMessage}</div>}
            {error && <div className="mt-2 center sm:mt-0 sm:inline font-mono ml-4 text-sm text-light-color-red">{error}</div>}
        </form>
    );
}

export default EmailSubscriptionForm;
