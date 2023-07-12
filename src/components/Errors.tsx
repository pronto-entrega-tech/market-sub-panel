import React from 'react';
import { View, StyleSheet } from 'react-native';
import { myColors } from '~/constants/myColors';
import { globalStyles } from '~/constants/globalStyles';
import MyButton from './MyButton';
import MyText from './MyText';

const Connection = () => (
  <View style={globalStyles.centralizer}>
    <MyText style={styles.title}>Sem internet</MyText>
    <MyText style={styles.subtitle}>Verifique sua conexão de internet</MyText>
  </View>
);
const Server = (onPress?: () => void) => (
  <View style={globalStyles.centralizer}>
    <MyText style={styles.title}>Erro ao se conectar com o servidor</MyText>
    <MyText style={styles.subtitle}>Tente novamente mais tarde</MyText>
    {onPress && (
      <MyButton title='Tentar novamente' onPress={onPress} type='clear' />
    )}
  </View>
);
const Saving = (onPress?: () => void) => (
  <View style={globalStyles.centralizer}>
    <MyText style={styles.title}>Erro tentar ao salvar</MyText>
    {onPress && (
      <MyButton title='Tentar novamente' onPress={onPress} type='clear' />
    )}
  </View>
);
const MissingAddress = () => (
  <View style={[globalStyles.centralizer, { minHeight: 100 }]}>
    <MyText style={styles.title}>Primeiro escolha um endereço</MyText>
    <MyText style={styles.subtitle}>
      Para ver as ofertas próximas de voce
    </MyText>
  </View>
);
const NothingOrder = () => (
  <View style={globalStyles.centralizer}>
    <MyText style={styles.title}>Nenhum pedido encontrado</MyText>
  </View>
);

export type MyErrors =
  | 'server'
  | 'connection'
  | 'saving'
  | 'missing_address'
  | 'nothing_order'
  | null;

const Errors = ({
  error,
  onPress,
}: {
  error: MyErrors;
  onPress?: () => void;
}) =>
  ({
    server: () => Server(onPress),
    connection: () => Connection(),
    saving: () => Saving(onPress),
    missing_address: () => MissingAddress(),
    nothing_order: () => NothingOrder(),
  }[error ?? 'server']());

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    color: myColors.text3,
    fontSize: 19,
  },
  subtitle: {
    textAlign: 'center',
    marginHorizontal: 8,
    marginTop: 4,
    marginBottom: 6,
    color: myColors.text2,
  },
});

export default Errors;
