export default class BagCopy {
  // you can optionally create a bag manually passing in a bagReader instance
  constructor(bag) {
    this.bag = bag;
    this.fileSize = bag.getFileSize();
  }

  async writeBagToNewFile(buffer, startPos) {
    await this.writer.write(startPos, buffer);
  }

  async bagCopy(fileHandler) {
    const writer = await fileHandler.createWriter({
      keepExistingData: false
    });
    console.log(this.fileSize);
    const length = 256 * 1024;
    for (let startPos = 0; startPos < this.fileSize; startPos += length) {
      /* eslint-disable no-await-in-loop */
      const buffer = await this.bag.readRosbagBit(startPos, length);
      await writer.write(startPos, buffer);
      if ((startPos / length) % 100 === 0) {
        console.log(startPos);
        /*
        await writer.close();
        writer = await fileHandler.createWriter({
          keepExistingData: true
        });
         */
      }
      /* eslint-enable no-await-in-loop */
    }
    await writer.close();
  }
}
