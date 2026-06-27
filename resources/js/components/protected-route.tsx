import { usePage } from '@inertiajs/react';
import type { User } from '@/types';

export function ProtectedRoute({
    roles,
    children,
}: {
    roles: string[];
    children: React.ReactNode;
}) {
    const { auth } = usePage<{ auth: { user: User } }>().props;

    if (!auth.user || !roles.includes(auth.user.role as string)) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Unauthorized</h1>
                    <p className="mt-2 text-muted-foreground">
                        You do not have permission to access this page.
                    </p>
                </div>
            </div>
        );
    }

    return children;
}
