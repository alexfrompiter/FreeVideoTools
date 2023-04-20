import {IInputProps, Input} from 'native-base';
import React, {useState} from 'react';
import BaseDialog from './BaseDialog';

export type Props = IInputProps & {
  openingTuple: [boolean, (isOpen: boolean) => void];
  setField: (newString: string) => void;
  title?: string;
  okButton?: string;
  cancelButton?: string;
};

const InputDialog: React.FC<Props> = ({
  value,
  openingTuple,
  setField,
  title,
  okButton,
  cancelButton,
}) => {
  const initialRef = React.useRef(null);
  const [text, setText] = useState<string>(
    typeof value === 'string' ? value : '',
  );
  return (
    <BaseDialog
      openingTuple={openingTuple}
      title={title}
      initialFocusRef={initialRef}
      buttons={[
        {
          title: cancelButton ?? 'Cancel',
          variant: 'ghost',
          colorScheme: 'blueGray',
        },
        {
          title: okButton ?? 'Save',
          action: () => setField(text)
        },
      ]}>
      <Input ref={initialRef} value={text} onChangeText={setText} />
    </BaseDialog>
  );
};

export default InputDialog;
