async function _allHash(hash: Object, fnName: string) {
  const keys = Object.keys(hash);
  const promises = Object.values(hash);
  const res = await Promise[fnName](promises);

  const out = {};
  for (let i = 0; i < keys.length; i++) {
    out[keys[i]] = res[i];
  }
  return out;
}

export function allHash(hash: Object) {
  return _allHash(hash, 'all');
}
