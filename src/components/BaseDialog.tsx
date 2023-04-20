import {Button, IButtonProps, IModalProps, Modal} from 'native-base';
import React, {PropsWithChildren} from 'react';

type DialogButton = IButtonProps & {
  title: string;
  action?: () => void;
};

export type Props = IModalProps & {
  openingTuple: [boolean, (isOpen: boolean) => void];
  title?: string;
  buttons: DialogButton[];
};

const BaseDialog: React.FC<PropsWithChildren<Props>> = ({
  openingTuple,
  title,
  buttons,
  children,
  ...modalProps
}) => {
  const [isOpen, setOpen] = openingTuple;
  return (
    <Modal isOpen={isOpen} onClose={() => setOpen(false)} {...modalProps}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>{title ?? ''}</Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            {buttons.map(({title: buttonTitle, action, ...rest}, index) => {
              return (
                <Button
                  key={index}
                  onPress={() => {
                    setOpen(false);
                    action && action();
                  }}
                  {...rest}>
                  {buttonTitle}
                </Button>
              );
            })}
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default BaseDialog;
