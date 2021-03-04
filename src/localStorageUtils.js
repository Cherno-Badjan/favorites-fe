export const USER = 'USER'

export function getUserFromLs(user) {
    localStorage.getItem(USER);

    if (user && user.token) return JSON.parse(user);

    return {
        email: '',
        id: '',
        token: ''
    }
}
export function putUserInLs(USER, user) {
    localStorage.setItem(USER, JSON.stringify(user));

}