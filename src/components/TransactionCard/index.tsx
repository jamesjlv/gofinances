import React from "react";
import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from "./styles";

type CategoryType = {
  name: string;
  icon: string;
};

export type TransactionCardData = {
  type: "positive" | "negative";
  title: string;
  amount: string;
  category: CategoryType;
  date: string;
};

interface TransactionCardProps {
  data: TransactionCardData;
}

export function TransactionCard({ data }: TransactionCardProps) {
  const { amount, title, category, date, type } = data;
  return (
    <Container>
      <Title>{title}</Title>
      <Amount type={data.type}>
        {type === "negative" && "- "}
        {amount}
      </Amount>
      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>
        <Date>{date}</Date>
      </Footer>
    </Container>
  );
}
