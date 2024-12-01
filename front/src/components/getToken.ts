import {jwtDecode} from 'jwt-decode';

// Функция для получения токена из куки
export function getTokenFromCookie(cookieName: string): string | null {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === cookieName) {
            return decodeURIComponent(value);
        }
    }
    return null;
}

// Функция для извлечения id из токена
export function getIdFromToken(token: string): number | null {
    try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.id;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}
