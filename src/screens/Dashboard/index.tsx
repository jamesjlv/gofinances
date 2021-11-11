import React from "react";

import {
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  UserWrapper,
  Icon,
  HighlightCarts,
  Transactions,
  Title,
  TransactionList,
  LogoutButton,
} from "./styles";
import { HighlightCart } from "../../components/HighlightCart";
import {
  TransactionCard,
  TransactionCardData,
} from "../../components/TransactionCard";

export interface DataListProps extends TransactionCardData {
  id: string;
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: "1",
      type: "positive",
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: { name: "Vendas", icon: "dollar-sign" },
      date: "13/04/2020",
    },
    {
      id: "2",
      type: "negative",
      title: "Hamburgueria Pizzy",
      amount: "R$ 59,00",
      category: { name: "Alimentação", icon: "coffee" },
      date: "13/04/2020",
    },
    {
      id: "3",
      type: "negative",
      title: "Aluguel do apartamento",
      amount: "R$ 1200,00",
      category: { name: "Moradia", icon: "shopping-bag" },
      date: "13/04/2020",
    },
  ];

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: "https://github.com/jamesjlv.png" }} />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>James</UserName>
            </User>
          </UserInfo>
          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>
      <HighlightCarts>
        <HighlightCart
          title="Entradas"
          lastTransaction="Última entrada dia 13 de abril"
          amount="R$ 17.400,00"
          type="up"
        />
        <HighlightCart
          title="Saídas"
          lastTransaction="Última saída dia 03 de abril"
          amount="R$ 1.259,00"
          type="down"
        />
        <HighlightCart
          title="Total"
          lastTransaction="01 à 16 de abril"
          amount="R$ 16.141,00"
          type="total"
        />
      </HighlightCarts>
      <Transactions>
        <Title>Listagem</Title>
        <TransactionList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
