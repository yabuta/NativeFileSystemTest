import { open, validateHeader } from '../libs/rosbag/web/index';

export default class BagDataProvider {
  initialize = async file => {
    const bag = await open(file);
    console.log(bag);
    return bag;
  };

  validateHeader = async file => {
    const rosbagHeader = await validateHeader(file);
    return rosbagHeader;
  };
}
