import React, { FC } from "react"
import { SingleTransaction } from "../../types/types"
import { Popconfirm, Table } from "antd"

interface Props {
  transactionList: SingleTransaction[]
  deleteTransaction: (id: number) => void
  rate: number
}

const calculateEuroValue = (amount: number, rate: number) =>
  (amount / rate).toFixed(2)

const TransactionTable: FC<Props> = ({
  transactionList,
  deleteTransaction,
  rate,
}) => {
  const sum = +transactionList
    .map(({ amount }) => amount)
    .reduce((prev, cur) => prev + cur, 0)
    .toFixed(2)

  const columns = [
    {
      key: "title",
      title: "Title",
      dataIndex: "title",
      sorter: (a: SingleTransaction, b: SingleTransaction) => {
        if (a.title < b.title) return -1
        if (a.title > b.title) return +1
        return 0
      },
    },
    {
      key: "pln",
      title: "Amount (PLN)",
      dataIndex: "amount",
      sorter: (a: SingleTransaction, b: SingleTransaction) =>
        a.amount - b.amount,
    },
    {
      key: "eur",
      title: "Amount (EUR)",
      render: (row: SingleTransaction) => (
        <span>{calculateEuroValue(row.amount, rate)}</span>
      ),
    },
    {
      key: "options",
      title: "Options",
      render: (row: SingleTransaction) => (
        <Popconfirm
          title={"Are you sure?"}
          onConfirm={() => deleteTransaction(row.id)}
        >
          <span style={{ cursor: "pointer" }}>Delete</span>
        </Popconfirm>
      ),
    },
  ]
  return (
    <>
      <Table
        dataSource={transactionList.map((transaction) => ({
          ...transaction,
          key: transaction.id,
        }))}
        columns={columns}
      />
      <div>{`Sum: ${sum} PLN (${calculateEuroValue(sum, rate)} EUR)`}</div>
    </>
  )
}

export default TransactionTable
