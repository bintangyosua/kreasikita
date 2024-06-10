"use client";

import React, { useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  Avatar,
  Badge,
  Chip,
} from "@nextui-org/react";

type TPayout = {
  id: number;
  timecreated: Date;
  amount: number;
  status: "pending" | "approved" | "rejected";
  bank: string;
  description: string;
};

export default function PayoutsTable({ payouts }: { payouts: TPayout[] }) {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(payouts.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return payouts.slice(start, end);
  }, [page, payouts]);

  if (!payouts) {
    return <p>No Data</p>;
  }

  return (
    <Table
      // removeWrapper
      aria-label="Example table with client side pagination"
      className="overflow-hidden"
      bottomContent={
        <div
          className={`flex w-full justify-center ${
            pages <= 1 ? "hidden" : ""
          }`}>
          <Pagination
            color="secondary"
            // isCompact
            // showControls
            // showShadow
            // color=""
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper:
          "min-h-[222px] overflow-auto overflow-y-hidden p-0 rounded-none",
      }}>
      <TableHeader>
        <TableColumn
          key="timecreated"
          className="text-md py-4 bg-white border-b-2 border-b-zinc-200">
          Waktu
        </TableColumn>
        <TableColumn
          key="bank"
          className="text-md bg-white border-b-2 border-b-zinc-200">
          Bank
        </TableColumn>
        <TableColumn
          key="amount"
          className="text-md bg-white border-b-2 border-b-zinc-200">
          Amount
        </TableColumn>
        <TableColumn
          key="status"
          className="text-md bg-white border-b-2 border-b-zinc-200">
          Status
        </TableColumn>
        <TableColumn
          key="description"
          className="text-md bg-white border-b-2 border-b-zinc-200">
          Description
        </TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={`${item.id}`}>
            {(columnKey) => (
              <TableCell className="py-3 border-b-1 border-b-gray-200">
                {columnKey === "status" ? (
                  <div className="flex items-center gap-2">
                    {getKeyValue(item, columnKey) === "pending" && (
                      <Chip size="sm" color="warning">
                        Pending
                      </Chip>
                    )}
                    {getKeyValue(item, columnKey) === "approved" && (
                      <Chip
                        size="sm"
                        color="success"
                        className="bg-green-600 text-white text-center align-middle">
                        Approved
                      </Chip>
                    )}
                    {getKeyValue(item, columnKey) === "rejected" && (
                      <Chip size="sm" color="danger" className="text-white">
                        Rejected
                      </Chip>
                    )}
                  </div>
                ) : (
                  <>{getKeyValue(item, columnKey)}</>
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
