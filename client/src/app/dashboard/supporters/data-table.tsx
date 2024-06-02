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
  total: number;
  email: string;
  name: string;
  username: string;
};

const supporters: TSupporters[] = [
  {
    id: 1,
    username: "danjin",
    name: "Danjin",
    email: "danjin@gg.com",
    total: 10000,
  },
  {
    id: 2,
    username: "josephine",
    name: "Josephine",
    email: "josephind@outlook.com",
    total: 24000,
  },
];

export default function SupportersTable({
  supporters_example,
}: {
  supporters_example: TSupporters[];
}) {
  if (!supporters) {
    return <p>No Data</p>;
  }

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  console.log({ supporters });
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
          key="username"
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
          key="total"
          className="text-md bg-white border-b-2 border-b-zinc-200">
          Jumlah
        </TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell className="py-3 border-b-1 border-b-gray-200">
                {getKeyValue(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
