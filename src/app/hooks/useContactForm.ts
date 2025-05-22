import { useState, useEffect } from 'react';

interface Perfume {
    id: number;
    marca: string;
    perfume: string;
    tamanho: number;
    tipo: string;
    sexo: string;
    preco_pix: number;
    preco_cartao: number;
}

export const useS3Data = () => {
    const [data, setData] = useState<Perfume[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    console.log('hook useS3Data', data);
    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/s3');
            console.log('response', response);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const jsonData = await response.json();
            setData(jsonData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch data');
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return {
        data,
        loading,
        error,
        refetch: fetchData,
    };
};
