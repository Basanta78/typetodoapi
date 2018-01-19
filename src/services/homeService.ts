import config from '../config/config';
import AppInfo from '../domain/AppInfo';

/**
 * Get app Info
 * 
 * @export
 * @returns {AppInfo} 
 */
export function getAppInfo(): AppInfo {
  return { name: config.app.name, version: config.app.version };
}
