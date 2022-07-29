import { v4 as uuidv4 } from 'uuid';

function guid() {
  return 'xxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0;
    let v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function uuid() {
  return uuidv4();
}

export { guid, uuid };
