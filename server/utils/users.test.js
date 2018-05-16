const expect = require('expect');
const { Users } = require('./users');

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: '1',
        name: 'Mike',
        room: 'node'
      },
      {
        id: '2',
        name: 'Julie',
        room: 'react'
      },
      {
        id: '3',
        name: 'Steve',
        room: 'node'
      }
    ];
  });
  it('should add a new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Bill',
      room: 'The best room!'
    };

    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should return names for the node chat room', () => {
    var array = users.getUserList('node');
    expect(array.length).toBe(2);
    expect(array).toInclude('Mike');
    expect(array).toNotInclude('Julie');
    expect(array).toEqual(['Mike', 'Steve']);
  });

  it('should return a user given a valid id', () => {
    var user = users.getUser('1');
    expect(user).toInclude({ name: 'Mike' });
    expect(user).toBeA('object');
    expect(user).toNotInclude({ name: 'Arlo' });
  });

  it('should not return a user with an invalid id', () => {
    expect(users.getUser('25')).toNotExist();
  });

  it('should remove a user given a valid id', () => {
    var user = users.getUser('1');
    var array = users.removeUser(user.id);

    expect(user.id).toEqual('1');
    expect(users.users).toNotInclude(user);
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user with an invalid id', () => {
    var userId = '305';
    var user = users.removeUser(userId);
    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });
});
