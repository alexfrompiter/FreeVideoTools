import React, {useEffect, useMemo, useState} from 'react';
import {HStack, Select, Text} from 'native-base';
import {BaseInfoSettings} from '../../types/MediaSettings';
import {getLabel, selectedFirstList} from '../../utils/CommonUtils';

export type Props = {
  baseSettings: BaseInfoSettings;
};

const SettingsBaseParams: React.FC<Props> = ({baseSettings}) => {
  const [extension, setExtension] = useState<string>(
    baseSettings.changedParams.extension,
  );

  useEffect(() => {
    baseSettings.changedParams.extension = extension;
  }, [extension, baseSettings.changedParams]);

  const extensionList = useMemo(() => {
    return selectedFirstList(
      baseSettings.params.extension,
      Object.keys(BaseInfoSettings.extensions),
    );
  }, [baseSettings.params.extension]);

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
              label={getLabel(key, BaseInfoSettings.extensions)}
              value={key}
            />
          );
        })}
      </Select>
    </HStack>
  );
};

export default SettingsBaseParams;
