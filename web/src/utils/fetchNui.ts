/**
 * Simple wrapper around fetch API tailored for CEF/NUI use. This abstraction
 * can be extended to include AbortController if needed or if the response isn't
 * JSON. Tailor it to your needs.
 *
 * @param eventName - The endpoint eventname to target
 * @param data - Data you wish to send in the NUI Callback
 *
 * @return returnData - A promise for the data sent back by the NuiCallbacks CB argument
 */

export async function fetchNui<T = any>(eventName: string, data?: any): Promise<T> {
  console.log('from fetchNui 1');
  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  };
  
  console.log('from fetchNui 2');
  const resourceName = (window as any).GetParentResourceName ? (window as any).GetParentResourceName() : 'nui-frame-app';
  console.log('from fetchNui 3');
  
  const resp = await fetch(`https://${resourceName}/${eventName}?random=` + Math.floor(Math.random() * 999), options);
  
  console.log('from fetchNui 4');
  const respFormatted = await resp.json()
  console.log('from fetchNui 5');

  return respFormatted
}
