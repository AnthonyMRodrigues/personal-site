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

interface CachedData {
    data: Perfume[];
    timestamp: number;
}

const CACHE_KEY = 'perfumes_data';
const CACHE_DURATION = 1 * 60 * 60 * 1000; // 1 hour in milliseconds

export const useS3Data = () => {
    const [data, setData] = useState<Perfume[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getCachedData = (): CachedData | null => {
        if (typeof window === 'undefined') return null;
        
        const cached = localStorage.getItem(CACHE_KEY);
        if (!cached) return null;

        try {
            const parsedCache: CachedData = JSON.parse(cached);
            const now = Date.now();
            
            // Check if cache is expired
            if (now - parsedCache.timestamp > CACHE_DURATION) {
                localStorage.removeItem(CACHE_KEY);
                return null;
            }
            
            return parsedCache;
        } catch (e) {
            console.error('Error parsing cached data:', e);
            localStorage.removeItem(CACHE_KEY);
            return null;
        }
    };

    const setCachedData = (newData: Perfume[]) => {
        if (typeof window === 'undefined') return;
        
        const cacheData: CachedData = {
            data: newData,
            timestamp: Date.now()
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    };

    const fetchData = async (forceRefresh = false) => {
        setLoading(true);
        setError(null);

        try {
            // Check cache first if not forcing refresh
            if (!forceRefresh) {
                const cached = getCachedData();
                if (cached) {
                    setData(cached.data);
                    setLoading(false);
                    return;
                }
            }

            const response = await fetch('/api/s3', {
                cache: 'no-store',
                headers: {
                    'Cache-Control': 'no-cache'
                }
            });
            console.log('response:', response);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const jsonData = await response.json();
            setData(jsonData);
            setCachedData(jsonData);
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
        refetch: () => fetchData(true), // Force refresh when manually refetching
    };
};
