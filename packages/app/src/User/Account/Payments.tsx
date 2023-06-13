import React from "react";
import { Billing } from "~/Billing";
import { Theme } from "~/Theme";
import { DateTime } from "~/Utilities";

import { Panel } from "./Panel";

export namespace Payments {
  export function Table() {
    const { data: payments, isLoading } = Billing.Payments.use();

    const rows = payments
      ?.filter((payment) => payment.paid)
      ?.map((payment, index, filteredPayments) => (
        <PaymentRow
          key={payment.id}
          payment={payment}
          isLastRow={index === filteredPayments?.length - 1}
        />
      ));

    return (
      <Panel className="h-fit overflow-x-auto">
        <table className="w-full text-left text-sm text-neutral-500 dark:text-neutral-400">
          <caption className="mb-4 text-left text-lg font-semibold text-neutral-900 dark:text-white">
            Payments
          </caption>

          <thead className="border-b border-black/10 text-xs uppercase text-neutral-700 dark:border-white/5 dark:text-neutral-400">
            <tr>
              <th scope="col" className=" py-2">
                Date
              </th>
              <th scope="col" className="w-2/6 py-2">
                Credits
              </th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <LoadingRows count={2} />
            ) : rows?.length === 0 ? (
              <NoDataRow />
            ) : (
              rows
            )}
          </tbody>
        </table>
      </Panel>
    );
  }
}

function PaymentRow({
  payment,
  isLastRow,
}: {
  payment: Billing.Payment;
  isLastRow: boolean;
}) {
  return (
    <Row isLastRow={isLastRow}>
      <Cell className="whitespace-nowrap">
        {DateTime.formatted(payment.created)}
      </Cell>
      <Cell>
        <Billing.Credits {...payment} />
      </Cell>
    </Row>
  );
}

function LoadingRows({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <Row key={i} isLastRow={i === count - 1}>
          <Cell>
            <Theme.Skeleton className="mb-4 h-2.5 w-36" />
          </Cell>
          <Cell>
            <Theme.Skeleton className="mb-4 h-2.5 w-10" />
          </Cell>
        </Row>
      ))}
    </>
  );
}

function NoDataRow() {
  return (
    <Row isLastRow>
      <Cell colSpan={2} className={"py-3 text-center"}>
        No payments have been made yet.
      </Cell>
    </Row>
  );
}

function Row({
  children,
}: React.PropsWithChildren<{
  isLastRow?: boolean;
}>) {
  return <tr>{children}</tr>;
}

function Cell({
  children,
  className,
  colSpan,
}: StyleableWithChildren & {
  colSpan?: number;
}) {
  return (
    <td colSpan={colSpan} className={classes("pt-3", className)}>
      {children}
    </td>
  );
}
