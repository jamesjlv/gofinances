import React from "react";
import { Container, Category, Icon, Button } from "./styles";

interface CategorySelectProps {
  title: string;
  onPress: () => void;
}

export function CategorySelectButton({ title, onPress }: CategorySelectProps) {
  return (
    <Container>
      <Button onPress={onPress}>
        <Category>{title}</Category>
        <Icon name="chevron-down" />
      </Button>
    </Container>
  );
}
