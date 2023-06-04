import $api from "."

export default class TeamService {
    static async getAll() {
        const res = await $api.get('/team')
        return res.data
    }

    static async createTeam(
        name,
        displayName,
        description
        ) {
        const body = {
            name,
            displayName,
            description
        }
        const res = await $api.post('/team', body)
        return res.data
    }

    static async deleteTeam(oid) {
        const res = await $api.delete('/team/' + oid)
        return res.data
    }
}