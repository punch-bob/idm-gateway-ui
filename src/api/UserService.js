import $api from "."

export default class UserService {
    static async getAll() {
        const res = await $api.get('/user')
        return res.data
    }

    static async createUser(
        name,
        givenName,
        familyName,
        additionalName,
        emailAddress,
        fullName,
        description,
        password
        ) {
        const body = {
            name,
            givenName,
            familyName,
            additionalName,
            emailAddress,
            fullName,
            description,
            credentials: {
                password: {
                    name: 'default',
                    value: password
                }
            }
        }
        const res = await $api.post('/user', body)
        return res.data
    }

    static async deleteUser(oid) {
        const res = await $api.delete('/user/' + oid)
        return res.data
    }
}