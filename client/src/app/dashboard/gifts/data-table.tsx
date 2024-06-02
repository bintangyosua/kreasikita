"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
} from "@nextui-org/react";

type TDonation = {
  order_id: number;
  transaction_time: string;
  gross_amount: number;
  senderUsername?: string;
  senderEmail?: string;
  senderName?: string;
  message?: string;
  receiverUsername: string;
  transaction_status: string;
};

export default function GiftsTable({ donations }: { donations: TDonation[] }) {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(donations.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return donations.slice(start, end);
  }, [page, donations]);

  return (
    <Table
      // removeWrapper
      aria-label="Example table with client side pagination"
      className="overflow-hidden"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
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
        wrapper: "min-h-[222px] overflow-auto p-0",
      }}>
      <TableHeader>
        <TableColumn key="transaction_time" className="text-md py-4">
          Waktu
        </TableColumn>
        <TableColumn key="senderUsername" className="text-md">
          Username
        </TableColumn>
        <TableColumn key="senderName" className="text-md">
          Nama
        </TableColumn>
        <TableColumn key="senderEmail" className="text-md">
          Email
        </TableColumn>
        <TableColumn key="gross_amount" className="text-md">
          Jumlah
        </TableColumn>
        <TableColumn key="message" className="text-md">
          Pesan
        </TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.order_id}>
            {(columnKey) => (
              <TableCell className="py-4">
                {getKeyValue(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
