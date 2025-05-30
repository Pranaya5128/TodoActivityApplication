import React, { useMemo } from 'react';
import { useReactTable, getCoreRowModel, flexRender, ColumnDef, getPaginationRowModel } from '@tanstack/react-table';
import { Button, Table } from 'react-bootstrap';
import { TodoDto } from '../Dtos/TodoDto';
import Pagination from './Pagination';

type GridProps = {
    data: TodoDto[];
    //columns: ColumnDef<any>[];
    //showSearch?: boolean;
    // hasButton?: boolean;
    // buttonText?: string;
    onDeleteButtonClick: (id: number) => void;
    onMarkCompleteButtonClick: (id: number) => void;
}
const Grid: React.FC<GridProps> = ({ data, onDeleteButtonClick, onMarkCompleteButtonClick }) => {
    const columns = useMemo<ColumnDef<TodoDto>[]>(
        () => [
            {
                accessorKey: 'todoActivity',
                header: 'Todo Activity',
            },
            {
                accessorKey: 'deadline',
                header: 'Deadline',
                cell: x => {
                    if (x.getValue()) {
                        const value = x.getValue() as string;
                        const date = new Date(value);
                        return date.toLocaleDateString(undefined, dateFormat);
                    }
                    else {
                        return "-";
                    }
                }
            },
            {
                accessorKey: 'isCompleted',
                header: 'Status',
                cell: x => x.getValue() ? "Completed" : "Active"
            },
            {
                header: 'Actions',
                cell: ({ row }) => {
                    const rowData = row.original;
                    return (<div>
                        <Button disabled={rowData.isCompleted ? true : false} onClick={() => onMarkCompleteButtonClick(rowData.id!)}>Edit</Button> {' '}
                        <Button onClick={() => onDeleteButtonClick(rowData.id!)}>Delete</Button>
                    </div>
                    );
                }
            }

        ],
        []
    );

    const dateFormat: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    };

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 5
            },
        }
    });

    const isOverdue = (todo: TodoDto) => {
        const now = new Date();
        return todo.deadline && !todo.isCompleted && new Date(todo.deadline) <= now;
    };

    return (<div>
        <Table striped bordered hover>
            <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id}>
                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id} className={isOverdue(row.original) ? 'table-danger' : ''}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </Table>
        {data && data.length > 5 && <Pagination table={table} />}
    </div>
    );
};

export default Grid;