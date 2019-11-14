import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import BagDataProvider from './BagProvider/BagDataProvider';
import BagCopy from './BagCopy';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: 'none'
  }
}));

const NativeFileSystemTest = () => {
  const classes = useStyles();
  const [bagFile, setBagFile] = React.useState(null);
  const bagDataProvider = new BagDataProvider();

  const handleReadButton = event => {
    console.log(event.target.files[0]);
    bagDataProvider.initialize(event.target.files[0]).then(bagData => {
      console.log(bagData);
      setBagFile(bagData);
    });
  };

  const handleWriteButton = async () => {
    try {
      if (bagFile) {
        const fileHandle = await window.chooseFileSystemEntries();
        const bagCopy = new BagCopy(bagFile);
        bagCopy
          .bagCopy(fileHandle)
          .then(() => {
            console.log('complete');
          })
          .catch(e => {
            console.log(e);
          });
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  /* eslint-disable jsx-a11y/label-has-associated-control */
  return (
    <div style={{ height: '50vh', width: '50vw' }}>
      <input
        accept="*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={handleReadButton}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span" className={classes.button}>
          Upload
        </Button>
      </label>
      <Button onClick={handleWriteButton}>write</Button>
    </div>
  );
  /* eslint-disable jsx-a11y/label-has-associated-control */
};

export default NativeFileSystemTest;
