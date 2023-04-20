import {HStack, Text, Input, IconButton} from 'native-base';
import React, {useMemo, useState} from 'react';
import DocumentPicker from 'react-native-document-picker';
import InputDialog from '../../components/InputDialog';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Platform} from 'react-native';
import { DocumentPickerOptions } from 'react-native-document-picker';

export type Props = {
  uri: string;
  setUri: (uri: string) => void;
};

const ChooseFile: React.FC<Props> = ({uri, setUri}) => {
  const [openUrlDialog, setOpenUrlDialog] = useState<boolean>(false);

  const fileName = useMemo(() => {
    if (!uri) {
      return '';
    }
    const file = uri.split('/').pop();
    return file ? decodeURI(file) : '';
  }, [uri]);

  const handleChooseLocalFile = async () => {
    let options: any = {};
    if (Platform.OS === 'android') {
      options.copyTo = 'cachesDirectory';
    }

    try {
      const pickerResult = await DocumentPicker.pickSingle(options);
      console.log('pickerResult:', pickerResult);
      if (Platform.OS === 'android' && pickerResult.fileCopyUri) {
        setUri(pickerResult.fileCopyUri);
      } else {
        setUri(pickerResult.uri);
      }
    } catch (e) {
      if (!DocumentPicker.isCancel(e)) {
        console.log('DocumentPicker error:', e);
      }
    }
  };

  return (
    <HStack alignItems="center" my={2}>
      <Text>File:</Text>
      <Input mx={2} isReadOnly={true} flex={1} placeholder="Choose file">
        {fileName}
      </Input>

      <IconButton
        _icon={{
          as: Ionicons,
          name: 'folder-outline',
        }}
        onPress={handleChooseLocalFile}
      />
      <IconButton
        _icon={{
          as: Ionicons,
          name: 'globe-outline',
        }}
        onPress={() => setOpenUrlDialog(true)}
      />
      <InputDialog
        openingTuple={[openUrlDialog, setOpenUrlDialog]}
        setField={setUri}
        title="Enter file url"
      />
    </HStack>
  );
};

export default ChooseFile;
