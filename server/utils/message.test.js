const expect = require("expect");
var {generateMessage,generateLocationMessage} = require('./message');


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
describe('generateLocationMessage',() => {
    it('Should generate correct location object',() => {
        var from = 'testuser';
        var lat = 50.786878678;
        var lon = -0.225878970;
        var message = generateLocationMessage(from,lat,lon); 
        expect(message.from).toBe(from);
        expect(message.url).toBe(`https://www.google.com/maps?q=${lat},${lon}`);
        expect(message.createdAt).toBeA('number');
         
    });



    
});