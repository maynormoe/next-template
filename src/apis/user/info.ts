import request from '@/utils/request';

/**
 * 获取当前登录用户信息
 * @return {Promise<API.CurrentUser>} 用户信息
 */
export async function getUserInfo() {
  return request.get<API.CurrentUser>('/user');
}
