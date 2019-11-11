import React from 'react';
import Button from '@material-ui/core/Button';

const NativeFileSystemTest = () => {
  let fileHandle;
  const handleButton = async () => {
    try {
      fileHandle = await window.chooseFileSystemEntries();
      const text = await fileHandle.getFile().then(file => file.text());
      console.log(text);
      const value = 'test1';
      const writer = await fileHandle.createWriter({
        keepExistingData: true
      });
      await writer.write(2, value);
      await writer.close();

      const value2 = 'test2';
      const writer2 = await fileHandle.createWriter({ keepExistingData: true });
      await writer2.write(2 + value.length, value2);
      await writer2.close();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div style={{ height: '50vh', width: '50vw' }}>
      <Button onClick={handleButton}>test</Button>
    </div>
  );
};

export default NativeFileSystemTest;
