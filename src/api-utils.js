import request from "superagent";

const URL = 'http://localhost:3001';

export async function signUpUser(email, password) {
    const response = await request.post(`${URL}/auth/signup`).send({ email, password })

    return response.body
}
export async function loginUser(email, password) {
    const response = await request.post(`${URL}/auth/signin`).send({ email, password })

    return response.body
}

export async function searchRestaurants(location, token) {
    const response = await request.get(`${URL}/api/search?location=${location}`).set('Authorization', token)

    return response.body
}

export async function getFavorites(token) {
    const response = await request.get(`${URL}/api/favorites`).set('Authorization', token)

    return response.body
}
export async function addFavorite(restaurant, token) {
    const response = await request.post(`${URL}/api/favorites`).set('Authorization', token).send(restaurant)

    return response.body
}
export async function deleteFavorite(restaurantId, token) {
    const response = await request.delete(`${URL}/api/favorites/${restaurantId}`).set('Authorization', token)

    return response.body
}

