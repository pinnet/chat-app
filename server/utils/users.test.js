const expect = require("expect");
const {Users} = require('./users');


describe('Users class',() => {
var users;

    beforeEach(() => {
      users = new Users();
      users.users = [
    {
        id: '1',
        name: 'Mike',
        room: 'Home'
    },
    {
        id: '2',
        name: 'Simon',
        room: 'Home'
    },
    {
        id: '3',
        name: 'James',
        room: 'Lobby'
    },   
    ] 
    });


    it('Should create user in array',() => {
        var users = new Users();
        var user = { id:123,name:'danny ',room:'Home' }
        var resUser = users.addUser(user.id,user.name,user.room);
        expect(users.users).toEqual([user]);
     });

     it('Should return names in Home room',() => {
        var list = users.getUsersList('Home');
        expect(list).toEqual(['Mike','Simon']);
     });
     it('Should return names in Lobby room',() => {
        var list = users.getUsersList('Lobby');
        expect(list).toEqual(['James']);
     });
     it('Should remove user',() => {
        var id = '1';
        var user = users.removeUser(id);
        expect(user.id).toBe(id);
        expect(users.users.length).toBe(2);
     });
     it('Should not remove user',() => {
        var id = '100';
        var user = users.removeUser(id);
        expect(user).toNotExist(undefined);
        expect(users.users.length).toBe(3);
     });
     it('Should find user',() => {
        var id = '2';
        var result = users.getUser(id);
        expect(result.id).toBe(id);
     });
     it('Should not find user',() => {
        var id = '100';
        var result = users.getUser(id);
        expect(result).toNotExist(undefined);
     });


});