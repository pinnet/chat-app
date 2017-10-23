class Users {
    constructor(){
        this.users = [];
    }
    addUser(id,name,room){
       var user = {id,name,room};
       this.users.push(user);
       return user;   
    }
    removeUser(id){
        var i = 0;
        return this.users.filter((user) =>{ 
                if(user.id === id){
                    this.users.splice(i,1);
                    return user; 
                } 
                 i++;
            })[0];
    }


    getUser(id){
        return this.users.filter((user) => user.id === id)[0];
    }
    getUsersList(room){
        var users = this.users.filter((user) => user.room === room);
         return users.map((user) => user.name);
    }
}

module.exports = { Users };