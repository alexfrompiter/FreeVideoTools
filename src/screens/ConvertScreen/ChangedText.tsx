import React from 'react';
import {Text} from 'native-base';

type ChangedTextProps = {
  changedValue: string;
  value: string;
};
const ChangedText: React.FC<ChangedTextProps> = ({changedValue, value}) => {
  return (
    <Text
      _light={value !== changedValue ? {color: 'red.500'} : {}}
      _dark={value !== changedValue ? {color: 'red.300'} : {}}>
      {' '}
      {changedValue}
    </Text>
  );
};

export default ChangedText;
