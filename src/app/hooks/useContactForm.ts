import React, { useState } from 'react';

export const useContactForm = (onSuccess: () => void, onError: () => void) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error);
            }
            setName('');
            setEmail('');
            setMessage('');
            onSuccess();
        } catch (error) {
            onError();
        } finally {
            setLoading(false);
        }
    };

    return {
        name,
        setName,
        email,
        setEmail,
        message,
        setMessage,
        loading,
        handleSubmit,
    };
};
