const expect = require("expect");
var {generateMessage} = require('./message');


describe('generateMessage',() => {
    it('Should generate correct message object',() => {
        var from = 'testuser';
        var text = 'testtext';
        var message = generateMessage(from,text); 
        expect(message.from).toBe(from);
        expect(message.text).toBe(text);
        expect(message.createdAt).toBeA('number');
         
    });
});