const mockToken = "testabc.xyz.ahk";

export function isAuthorized(): Boolean {
  const getToken = localStorage.getItem("token");
  const valueToken = getToken?.length && getToken === mockToken;
  if (!valueToken) return false;
  return true;
}
