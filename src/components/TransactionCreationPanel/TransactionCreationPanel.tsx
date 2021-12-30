import React, { FC, useEffect, useState } from "react"
import {
  Header,
  HeaderWithRate,
  Rate,
  RateCoreContent,
  TransactionCreationPanelStyled,
} from "./TransactionCreationPanel.styled"
import { InputNumber } from "antd"
import CreationForm from "./CreationForm"

interface Props {
  addTransaction: (transaction: { title: string; amount: number }) => void
  rate: number
  setRate: (num: number) => void
}

const TransactionCreationPanel: FC<Props> = ({
  addTransaction,
  rate,
  setRate,
}) => {
  const [valueEditMode, setValueEditMode] = useState(false)
  const [tempRate, setTempRate] = useState(rate)
  useEffect(() => {
    setTempRate(rate)
  }, [rate])

  const updateRate = () => {
    setRate(tempRate)
    setValueEditMode(false)
  }

  const parsedRate = rate.toString().replace(".", ",")

  return (
    <TransactionCreationPanelStyled>
      <HeaderWithRate>
        <Header>List of expenses</Header>
        <Rate>
          <RateCoreContent>{`1EUR = `}</RateCoreContent>
          {valueEditMode ? (
            <InputNumber
              step={0.05}
              size={"small"}
              value={tempRate}
              onChange={setTempRate}
              addonAfter={<span onClick={updateRate}>accept</span>}
            />
          ) : (
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setValueEditMode(true)}
            >
              {parsedRate}
            </span>
          )}
          <RateCoreContent>{` PLN`}</RateCoreContent>
        </Rate>
      </HeaderWithRate>
      <CreationForm addTransaction={addTransaction} />
    </TransactionCreationPanelStyled>
  )
}

export default TransactionCreationPanel
