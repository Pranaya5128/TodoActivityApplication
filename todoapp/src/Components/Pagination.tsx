import { Table } from "@tanstack/react-table"
import { FC } from "react";
import { Button } from "react-bootstrap"

type PaginationProps = {
    table: Table<any>;
}

const Pagination: FC<PaginationProps> = ({ table }) => {
    return (
        <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
                Page {table.getState().pagination.pageIndex + 1} of{' '}
                {table.getPageCount()}
            </div>
            <div>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>{' '}
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    )
};


export default Pagination;