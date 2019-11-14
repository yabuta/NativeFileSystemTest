import { open } from '../libs/rosbag/web/index';

export default class BagDataProvider {
  initialize = async file => {
    const bag = await open(file);
    console.log(bag);
    return bag;
  };
}
