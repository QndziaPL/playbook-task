import React, { FC, useState } from "react"
import { Button, Col, Input, InputNumber, Row } from "antd"
import { ButtonContainer } from "./CreationForm.styled"

interface Props {
  addTransaction: (transaction: { title: string; amount: number }) => void
}

const CreationForm: FC<Props> = ({ addTransaction }) => {
  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState<number>(0)

  const handleAddTransaction = () => {
    addTransaction({ title, amount })
    setTitle("")
    setAmount(0)
  }

  return (
    <Row gutter={[16, 16]} align={"bottom"} style={{ marginBottom: 20 }}>
      <Col xs={24} sm={16}>
        <Row align={"middle"} style={{ marginTop: 20 }}>
          <Col xs={24} sm={12}>
            Title of transaction
          </Col>
          <Col xs={24} sm={12}>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </Col>
        </Row>
        <Row align={"middle"} style={{ marginTop: 20 }}>
          <Col xs={24} sm={12}>
            Amount (in PLN)
          </Col>
          <Col xs={24} sm={12}>
            <InputNumber
              style={{ width: "100%" }}
              min={0}
              precision={2}
              value={amount}
              onChange={setAmount}
              step={0.5}
            />
          </Col>
        </Row>
      </Col>
      <Col xs={24} sm={8}>
        <ButtonContainer>
          <Button
            block
            onClick={handleAddTransaction}
            disabled={title.length < 5}
          >
            Add
          </Button>
        </ButtonContainer>
      </Col>
    </Row>
  )
}

export default CreationForm
