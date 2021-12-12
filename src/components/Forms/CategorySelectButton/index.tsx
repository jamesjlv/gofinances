import React from "react";
import { Container, Category, Icon, Button } from "./styles";

interface CategorySelectProps {
  title: string;
  onPress: () => void;
}

export function CategorySelectButton({
  title,
  onPress,
  ...rest
}: CategorySelectProps) {
  return (
    <Container testID="button-category" onPress={onPress} {...rest}>
      <Button>
        <Category>{title}</Category>
        <Icon name="chevron-down" />
      </Button>
    </Container>
  );
}
