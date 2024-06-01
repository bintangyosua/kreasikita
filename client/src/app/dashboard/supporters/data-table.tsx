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
  id: number;
  amount: number;
  email: string;
  name: string;
};

const donations: TSupporters[] = [
  {
    id: 1,
    name: "Danjin",
    email: "danjin@gg.com",
    amount: 10000,
  },
  {
    id: 2,
    name: "Josephine",
    email: "josephind@outlook.com",
    amount: 24000,
  },
];

export default function SupportersTable() {
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
        wrapper: "min-h-[222px] overflow-hidden",
      }}>
      <TableHeader>
        <TableColumn key="name" className="text-md py-4">
          Nama
        </TableColumn>
        <TableColumn key="email" className="text-md py-4">
          Email
        </TableColumn>
        <TableColumn key="amount" className="text-md py-4">
          Total
        </TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.name}>
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
