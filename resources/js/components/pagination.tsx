import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginatorLink {
    url: string | null;
    label: string;
    active: boolean;
}

export default function Pagination({
    links,
    lastPage,
    from,
    to,
    total,
    onPageChange,
}: {
    links: PaginatorLink[];
    lastPage: number;
    from: number | null;
    to: number | null;
    total: number;
    onPageChange: (page: number) => void;
}) {
    if (lastPage <= 1) return null;

    const getPageFromLink = (link: PaginatorLink) => {
        if (!link.url) return null;
        const params = new URLSearchParams(new URL(link.url).search);
        return params.get('page') ? Number(params.get('page')) : 1;
    };

    return (
        <div className="flex flex-col items-center gap-4 pt-8 pb-8">
            <p className="text-sm text-[#666]">
                Showing {from ?? 0}–{to ?? 0} of {total} products
            </p>
            <div className="flex items-center gap-1.5">
                {links.map((link, i) => {
                    const isPrev = i === 0;
                    const isNext = i === links.length - 1;

                    if (isPrev || isNext) {
                        return (
                            <button
                                key={i}
                                disabled={!link.url}
                                onClick={() => {
                                    const page = getPageFromLink(link);
                                    if (page) onPageChange(page);
                                }}
                                className={cn(
                                    'flex h-9 w-9 items-center justify-center rounded-md border text-sm transition-colors',
                                    link.url
                                        ? 'border-white/10 text-[#B5B5B5] hover:border-[#FF4D00]/30 hover:text-white'
                                        : 'border-white/5 text-[#333] cursor-not-allowed'
                                )}
                            >
                                {isPrev ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                            </button>
                        );
                    }

                    const page = getPageFromLink(link);
                    if (!page) return null;

                    return (
                        <button
                            key={i}
                            onClick={() => onPageChange(page)}
                            className={cn(
                                'flex h-9 min-w-[36px] items-center justify-center rounded-md px-2 text-sm font-medium transition-colors',
                                link.active
                                    ? 'bg-[#FF4D00] text-white'
                                    : 'border border-white/10 text-[#B5B5B5] hover:border-[#FF4D00]/30 hover:text-white'
                            )}
                        >
                            {link.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
