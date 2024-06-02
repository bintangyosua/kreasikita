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

type TSupporters = {
  total_donation: number;
  email: string;
  name: string;
  senderUsername: string;
  pfp: string | undefined;
};

export default function SupportersTable({
  supporters,
}: {
  supporters: TSupporters[];
}) {
  if (!supporters) {
    return <p>No Data</p>;
  }

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(supporters.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return supporters.slice(start, end);
  }, [page, supporters]);

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
          key="senderUsername"
          className="text-md bg-white border-b-2 border-b-zinc-200">
          Username
        </TableColumn>
        <TableColumn
          key="name"
          className="text-md bg-white border-b-2 border-b-zinc-200">
          Nama
        </TableColumn>
        <TableColumn
          key="email"
          className="text-md bg-white border-b-2 border-b-zinc-200">
          Email
        </TableColumn>
        <TableColumn
          key="total_donation"
          className="text-md bg-white border-b-2 border-b-zinc-200">
          Jumlah (IDR)
        </TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.senderUsername}>
            {(columnKey) => (
              <TableCell className="py-3 border-b-1 border-b-gray-200">
                {!(columnKey === "total_donation")
                  ? getKeyValue(item, columnKey)
                  : getKeyValue(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
