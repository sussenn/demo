// token处理
import { useCookies } from '@vueuse/integrations/useCookies'

const TokenKey = "token";
const cook = useCookies();

export function getToken() {
    return cook.get(TokenKey);
}

export function setToken(token) {
    return cook.set(TokenKey, token);
}

export function removeToken() {
    return cook.remove(TokenKey);
}