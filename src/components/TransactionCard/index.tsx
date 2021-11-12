import React from "react";
import { categories } from "../../utils/categories";
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

export type TransactionCardData = {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
};

interface TransactionCardProps {
  data: TransactionCardData;
}

export function TransactionCard({ data }: TransactionCardProps) {
  const { amount, name, date, type } = data;

  const [category] = categories.filter((item) => item.key === data.category);
  return (
    <Container>
      <Title>{name}</Title>
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
