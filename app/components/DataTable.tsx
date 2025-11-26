'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Search,
    ArrowUpDown,
} from 'lucide-react';

interface Column<T> {
    key: string;
    label: string;
    render?: (value: any, item: T) => React.ReactNode;
    sortable?: boolean;
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    actions?: (item: T) => React.ReactNode;
    onSearch?: (query: string) => void;
    itemsPerPage?: number;
}

export default function DataTable<T extends Record<string, any>>({
    columns,
    data,
    actions,
    onSearch,
    itemsPerPage = 10,
}: DataTableProps<T>) {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

    // Filter data based on search
    const filteredData = searchQuery
        ? data.filter((item) =>
            Object.values(item).some((value) =>
                String(value).toLowerCase().includes(searchQuery.toLowerCase())
            )
        )
        : data;

    // Sort data
    const sortedData = sortConfig
        ? [...filteredData].sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];

            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        })
        : filteredData;

    // Pagination
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = sortedData.slice(startIndex, endIndex);

    const handleSort = (key: string) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
        onSearch?.(value);
    };

    return (
        <div className={"space-y-4"}>
            {/* Search Bar */}
            <div className={"flex items-center gap-2"}>
                < div className={"relative flex-1 max-w-sm"}>
                    < Search className={"absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"} />
                    < Input
                        placeholder={"Search..."}
                        value={searchQuery}
                        onChange={(e) => handleSearchChange(e.target.value)
                        }
                        className={"pl-10"}
                    />
                </div >
            </div >

            {/* Table */}
            < div className={"rounded-lg border bg-card shadow-sm overflow-hidden"}>
                < div className={"overflow-x-auto"}>
                    < table className={"w-full"}>
                        < thead className={"bg-muted/50"}>
                            <tr>
                                {
                                    columns.map((column, index) => (
                                        <th
                                            key={index}
                                            className={"px-4 py-3 text-left text-sm font-medium text-muted-foreground"}
                                        >
                                            {
                                                column.sortable ? (
                                                    <button
                                                        onClick={() => handleSort(column.key)}
                                                        className={"flex items-center gap-1 hover:text-foreground transition-colors"}
                                                    >
                                                        {column.label}
                                                        < ArrowUpDown className={"h-4 w-4"} />
                                                    </button>
                                                ) : (
                                                    column.label
                                                )
                                            }
                                        </th >
                                    ))}
                                {
                                    actions && <th className={"px-4 py-3 text-left text-sm font-medium text-muted-foreground"}>Actions</th>}
                            </tr >
                        </thead >
                        <tbody className={"divide-y"}>
                            {
                                currentData.length > 0 ? (
                                    currentData.map((item, index) => (
                                        <tr key={index} className={"hover:bg-muted/30 transition-colors"}>
                                            {
                                                columns.map((column, index) => (
                                                    <td key={index} className={"px-4 py-3 text-sm"}>
                                                        {column.render ? column.render(item[column.key], item) : item[column.key]}
                                                    </td >
                                                ))}
                                            {
                                                actions && <td className={"px-4 py-3 text-sm"}>{actions(item)}</td>}
                                        </tr >
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={columns.length + (actions ? 1 : 0)} className="px-4 py-8 text-center text-muted-foreground">
                                            No data found
                                        </td>
                                    </tr >
                                )
                            }
                        </tbody >
                    </table >
                </div >
            </div >

            {/* Pagination */}
            {
                totalPages > 1 && (
                    <div className={"flex items-center justify-between"}>
                        < p className={"text-sm text-muted-foreground"}>
                            Showing {startIndex + 1} to {Math.min(endIndex, sortedData.length)} of {sortedData.length} entries
                        </p >
                        <div className={"flex items-center gap-2"}>
                            < Button
                                variant={"outline"}
                                size={"icon"}
                                onClick={() => setCurrentPage(1)
                                }
                                disabled={currentPage === 1
                                }
                            >
                                <ChevronsLeft className={"h-4 w-4"} />
                            </Button >
                            <Button
                                variant={"outline"}
                                size={"icon"}
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className={"h-4 w-4"} />
                            </Button >
                            <span className={"text-sm"}>
                                Page {currentPage} of {totalPages}
                            </span >
                            <Button
                                variant={"outline"}
                                size={"icon"}
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                            >
                                <ChevronRight className={"h-4 w-4"} />
                            </Button >
                            <Button
                                variant={"outline"}
                                size={"icon"}
                                onClick={() => setCurrentPage(totalPages)}
                                disabled={currentPage === totalPages}
                            >
                                <ChevronsRight className={"h-4 w-4"} />
                            </Button >
                        </div >
                    </div >
                )}
        </div >
    );
}
