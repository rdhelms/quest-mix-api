Parse.Cloud.define('fetchUsers', async () => {
    const usersQuery = new Parse.Query(Parse.User)
    const users = await usersQuery.findAll({ useMasterKey: true })
    return users
})
