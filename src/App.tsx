import React, { useState } from "react"
import { SingleTransaction } from "./types/types"
import { AppContainer } from "./App.styled"
import TransactionCreationPanel from "./components/TransactionCreationPanel/TransactionCreationPanel"
import TransactionTable from "./components/TransactionTable/TransactionTable"

const App = () => {
  const [nextId, setNextId] = useState(1)
  const [transactionList, setTransactionList] = useState<SingleTransaction[]>(
    [],
  )
  const [rate, setRate] = useState(4.382)

  const addTransaction = (transaction: { title: string; amount: number }) => {
    setTransactionList((prev) => [...prev, { ...transaction, id: nextId }])
    setNextId((prev) => prev + 1)
  }

  const deleteTransaction = (id: number) => {
    const index = transactionList.findIndex(({ id: _id }) => id === _id)
    const newArray = [...transactionList]
    newArray.splice(index, 1)
    setTransactionList(newArray)
  }

  return (
    <AppContainer>
      <TransactionCreationPanel
        addTransaction={addTransaction}
        rate={rate}
        setRate={setRate}
      />
      <TransactionTable
        rate={rate}
        transactionList={transactionList}
        deleteTransaction={deleteTransaction}
      />
    </AppContainer>
  )
}

export default App
