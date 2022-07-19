// import Cookies from 'js-cookie'

// const TokenKey = 'Admin-Token';

export function getToken() {
  // return Cookies.get(TokenKey)
  return 'token';
}

// export function setToken(token) {
//   return Cookies.set(TokenKey, token)
// }

// export function removeToken() {
//   return Cookies.remove(TokenKey)
// }

/**
 * 验证是否为blob格式
 * @param data
 * @returns
 */
export async function blobValidate(data) {
  try {
    const text = await data.text();
    JSON.parse(text);
    return false;
  } catch (error) {
    return true;
  }
}

export const errorCode = {
  '401': '认证失败，无法访问系统资源',
  '403': '当前操作没有权限',
  '404': '访问资源不存在',
  default: '系统未知错误，请反馈给管理员'
};
