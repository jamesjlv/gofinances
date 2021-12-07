import React, { useEffect, useState } from "react";
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import uuid from "react-native-uuid";

import { Button } from "../../components/Forms/Button";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { InputForm } from "../../components/Forms/InputForm";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { CategorySelect } from "../CategorySelect";
import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsType,
} from "./styles";
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from "@react-navigation/native";
import { useAuth } from "../../hooks/auth";

interface FormData {
  name: string;
  amount: string;
}

export const FormSchema = Yup.object({
  name: Yup.string().required("Nome é obrigatório"),
  amount: Yup.number()
    .typeError("Informe apenas numeros")
    .required("O preço é obrigatório")
    .positive("O valor não pode ser negativo"),
});

export function Register() {
  const { user } = useAuth();
  const dataKey = `@gofinances:transaction_user:${user.id}`;
  const { control, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(FormSchema),
  });
  const { navigate }: NavigationProp<ParamListBase> = useNavigation();
  const { errors } = formState;

  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  function handleTransactionTypeSelect(type: "positive" | "negative") {
    if (transactionType !== type) {
      setTransactionType(type);
    }
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  async function handleRegister({ name, amount }: FormData) {
    if (!transactionType) {
      if (category.key === "category") {
        return Alert.alert(
          "Campos obrigatórios",
          "Selecione o tipo da transação e categoria"
        );
      }
      return Alert.alert(
        "Campos obrigatórios",
        "Selecione o tipo da transação"
      );
    } else if (category.key === "category") {
      return Alert.alert("Campos obrigatórios", "Selecione uma categoria");
    }

    const data = {
      id: String(uuid.v4()),
      name,
      amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    };

    try {
      const oldData = await AsyncStorage.getItem(dataKey);
      const currentData = oldData ? JSON.parse(oldData!) : [];
      const dataFormatted = [...currentData, data];
      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possivel salvar");
    }

    reset();
    setCategory({
      key: "category",
      name: "Categoria",
    });
    setTransactionType("");

    navigate("Listagem");
  }

  useEffect(() => {
    async function loadData() {
      const data = await AsyncStorage.getItem(dataKey);
    }
    loadData();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              control={control}
              name="name"
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              control={control}
              name="amount"
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />
            <TransactionsType>
              <TransactionTypeButton
                title="Income"
                type="up"
                onPress={() => handleTransactionTypeSelect("positive")}
                isActive={transactionType === "positive"}
              />
              <TransactionTypeButton
                title="Outcome"
                type="down"
                onPress={() => handleTransactionTypeSelect("negative")}
                isActive={transactionType === "negative"}
              />
            </TransactionsType>
            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </Fields>
          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>
        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
