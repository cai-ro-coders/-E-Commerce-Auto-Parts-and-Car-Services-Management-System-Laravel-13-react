import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

function getCookie(name: string): string {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return decodeURIComponent(parts.pop()!.split(';').shift()!);
    }
    return '';
}

interface CartItem {
    product_id: number;
    name: string;
    slug: string;
    selling_price: number;
    discount_type: string | null;
    discount_value: number;
    image: string | null;
    quantity: number;
    price: number;
}

interface CartContextType {
    items: CartItem[];
    count: number;
    subtotal: number;
    loading: boolean;
    refresh: () => Promise<void>;
    removeItem: (productId: number) => Promise<void>;
    updateQuantity: (productId: number, quantity: number) => Promise<void>;
}

const CartContext = createContext<CartContextType>({
    items: [],
    count: 0,
    subtotal: 0,
    loading: false,
    refresh: async () => {},
    removeItem: async () => {},
    updateQuantity: async () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [count, setCount] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [loading, setLoading] = useState(false);

    const refresh = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch('/cart', {
                headers: { 'X-Requested-With': 'XMLHttpRequest' },
                credentials: 'include',
            });
            const data = await res.json();
            setItems(data.items ?? []);
            setCount(data.count ?? 0);
            setSubtotal(data.subtotal ?? 0);
        } catch {
            // silent fail
        } finally {
            setLoading(false);
        }
    }, []);

    const removeItem = useCallback(async (productId: number) => {
        const token = getCookie('XSRF-TOKEN');
        try {
            await fetch(`/cart/remove/${productId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    ...(token ? { 'X-XSRF-TOKEN': token } : {}),
                },
                credentials: 'include',
            });
            await refresh();
        } catch {
            // silent fail
        }
    }, [refresh]);

    const updateQuantity = useCallback(async (productId: number, quantity: number) => {
        const token = getCookie('XSRF-TOKEN');
        try {
            await fetch(`/cart/update-quantity/${productId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    ...(token ? { 'X-XSRF-TOKEN': token } : {}),
                },
                body: JSON.stringify({ quantity }),
                credentials: 'include',
            });
            await refresh();
        } catch {
            // silent fail
        }
    }, [refresh]);

    useEffect(() => {
        refresh();
    }, [refresh]);

    return (
        <CartContext.Provider value={{ items, count, subtotal, loading, refresh, removeItem, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
