export default class Users {
    constructor() {
        this.users = []
    }

    add(user) {
        this.users.push(user)
    }
    remove(id) {

        const user = this.getUser(id);

        if (user) {
            this.users = this.users.filter(user => user.id !== id)
        }

        return user
    }

    getUser(id) {
        return this.users.find(user => user.id === id);
    }

    getAllUser() {
        return this.users
    }

    updateUserList(data) {
        return this.users.filter(item => item.room === data.room)
    }
}