import React, { useState } from 'react';

export const useContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
                setName('');
                setEmail('');
                setMessage('');
            } else {
                setError(data.error || 'Something went wrong');
            }
        } catch (error) {
            setError('Failed to send email');
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
        success,
        error,
        handleSubmit,
    };
};
