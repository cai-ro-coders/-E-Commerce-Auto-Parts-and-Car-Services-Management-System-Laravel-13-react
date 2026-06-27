import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

function getCookie(name: string): string {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return decodeURIComponent(parts.pop()!.split(';').shift()!);
    }
    return '';
}

function getCsrfToken(): string {
    const meta = document.querySelector('meta[name="csrf-token"]');
    if (meta) return meta.getAttribute('content') ?? '';
    return getCookie('XSRF-TOKEN');
}

interface WishlistProduct {
    id: number;
    name: string;
    slug: string;
    selling_price: number;
    discount_type: string | null;
    discount_value: number;
    image: string | null;
}

interface WishlistItem {
    id: number;
    product_id: number;
    product: WishlistProduct | null;
}

interface WishlistContextType {
    wishlistIds: number[];
    wishlistItems: WishlistItem[];
    toggleWishlist: (productId: number) => Promise<void>;
    loading: boolean;
    count: number;
}

const WishlistContext = createContext<WishlistContextType>({
    wishlistIds: [],
    wishlistItems: [],
    toggleWishlist: async () => {},
    loading: false,
    count: 0,
});

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [wishlistIds, setWishlistIds] = useState<number[]>([]);
    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
    const [loading, setLoading] = useState(false);

    const loadWishlist = useCallback(async () => {
        try {
            const res = await fetch('/wishlist', {
                headers: { 'X-Requested-With': 'XMLHttpRequest' },
                credentials: 'include',
            });
            if (!res.ok) return;
            const data = await res.json();
            if (data.wishlist_ids) setWishlistIds(data.wishlist_ids);
            if (data.items) setWishlistItems(data.items);
        } catch {
            // silent
        }
    }, []);

    useEffect(() => {
        loadWishlist();
    }, [loadWishlist]);

    const toggleWishlist = useCallback(async (productId: number) => {
        setLoading(true);
        try {
            const res = await fetch(`/wishlist/toggle/${productId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': getCsrfToken(),
                },
                credentials: 'include',
            });

            if (!res.ok) {
                console.error('Wishlist toggle failed:', res.status, res.statusText);
                return;
            }

            const data = await res.json();
            if (data.wishlist_ids) setWishlistIds(data.wishlist_ids);
            if (data.items) setWishlistItems(data.items);
        } catch (e) {
            console.error('Wishlist toggle error:', e);
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <WishlistContext.Provider value={{ wishlistIds, wishlistItems, toggleWishlist, loading, count: wishlistIds.length }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    return useContext(WishlistContext);
}
