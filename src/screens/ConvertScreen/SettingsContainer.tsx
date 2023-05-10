import React, {useEffect, useMemo, useState} from 'react';
import {HStack, Select, Text} from 'native-base';
import {getLabel, selectedFirstList} from '../../utils/CommonUtils';
import {ContainerSettings} from '../../types/ContainerSettings';

export type Props = {
  containerSettings: ContainerSettings;
};

const SettingsContainer: React.FC<Props> = ({containerSettings}) => {
  const [extension, setExtension] = useState<string>(
    containerSettings.changedParams.extension,
  );

  useEffect(() => {
    containerSettings.changedParams.extension = extension;
  }, [extension, containerSettings.changedParams]);

  const extensionList = useMemo(() => {
    return selectedFirstList(
      containerSettings.params.extension,
      Object.keys(ContainerSettings.extensions),
    );
  }, [containerSettings.params.extension]);

  return (
    <HStack alignItems="center">
      <Text mr={3}>Output format:</Text>
      <Select
        selectedValue={extension}
        flex={1}
        onValueChange={val => setExtension(val)}>
        {extensionList.map(key => {
          return (
            <Select.Item
              key={key}
              label={getLabel(key, ContainerSettings.extensions)}
              value={key}
            />
          );
        })}
      </Select>
    </HStack>
  );
};

export default SettingsContainer;
