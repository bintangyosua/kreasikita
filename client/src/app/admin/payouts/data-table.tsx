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
  Chip,
  Button,
} from "@nextui-org/react";
import { format } from "date-fns";
import { setStatusApproved, setStatusRejected } from "@/lib/api/payout";
import { SessionType } from "@/lib/session";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type TPayout = {
  id: number;
  amount: number;
  timecreated: Date;
  bank_code: string;
  description: string;
  status: "pending" | "approved" | "rejected";
  user: any;
};

export default function PayoutsTable({
  payouts,
  session,
}: {
  payouts: TPayout[];
  session: SessionType;
}) {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const router = useRouter();

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
          key="username"
          className="text-md py-4 bg-white border-b-2 border-b-zinc-200">
          Username
        </TableColumn>
        <TableColumn
          key="timecreated"
          className="text-md bg-white border-b-2 border-b-zinc-200">
          Time Created
        </TableColumn>
        <TableColumn
          key="bank_code"
          className="text-md bg-white border-b-2 border-b-zinc-200">
          Bank Code
        </TableColumn>
        <TableColumn
          key="description"
          className="text-md bg-white border-b-2 border-b-zinc-200">
          Description
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
          key="actions"
          className="text-md bg-white border-b-2 border-b-zinc-200">
          Actions
        </TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => {
              if (columnKey === "timecreated") {
                return (
                  <TableCell className="py-3 border-b-1 border-b-gray-200">
                    {format(item[columnKey], "dd MMM yyyy")}
                  </TableCell>
                );
              }

              if (columnKey === "username") {
                return (
                  <TableCell className="py-3 border-b-1 border-b-gray-200 flex items-center gap-2">
                    {item.user.pfp ? (
                      <Avatar src={item.user.pfp} size="sm" />
                    ) : (
                      <Avatar size="sm" />
                    )}
                    {getKeyValue(item, columnKey)}
                  </TableCell>
                );
              }

              if (columnKey === "actions") {
                return (
                  <TableCell className="py-3 border-b-1 border-b-gray-200">
                    <div className="flex items-center gap-2">
                      <Button
                        color="success"
                        isDisabled={
                          getKeyValue(item, "status") === "pending"
                            ? false
                            : true
                        }
                        onClick={async (e) => {
                          try {
                            await setStatusApproved(
                              session.access_token,
                              item.id
                            );
                            toast.success("Berhasil approve payout");
                            router.refresh();
                          } catch (error) {
                            toast.error("Something went wrong");
                          }
                        }}
                        size="sm"
                        className="min-w-16 p-1 rounded-md text-center h-6">
                        Approve
                      </Button>
                      <Button
                        color="danger"
                        isDisabled={
                          getKeyValue(item, "status") === "pending"
                            ? false
                            : true
                        }
                        onClick={async (e) => {
                          try {
                            await setStatusRejected(
                              session.access_token,
                              item.id
                            );
                            toast.warning("Berhasil reject payout");
                            router.refresh();
                          } catch (error) {
                            toast.error("Something went wrong");
                          }
                        }}
                        size="sm"
                        className="min-w-16 p-1 rounded-md text-center h-6">
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                );
              }

              if (columnKey === "status") {
                return (
                  <TableCell className="py-3 border-b-1 border-b-gray-200">
                    <div className="flex items-center gap-2">
                      {item[columnKey] === "pending" && (
                        <Chip size="sm" color="warning">
                          Pending
                        </Chip>
                      )}
                      {item[columnKey] === "approved" && (
                        <Chip
                          size="sm"
                          color="success"
                          className="text-center align-middle">
                          Approved
                        </Chip>
                      )}
                      {item[columnKey] === "rejected" && (
                        <Chip size="sm" color="danger" className="text-white">
                          Rejected
                        </Chip>
                      )}
                    </div>
                  </TableCell>
                );
              }

              return (
                <TableCell className="py-3 border-b-1 border-b-gray-200">
                  {getKeyValue(item, columnKey)}
                </TableCell>
              );
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
