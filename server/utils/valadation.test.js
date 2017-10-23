const expect = require("expect");
const { isRealString } = require('./valadation');


describe('isRealString',() => {
    it('Should allow string with non-space characters',() => {
        var text = '  testtext ';
        var ret = isRealString(text); 
        expect(ret).toBe(true);
    });
    it('Should reject spaces only string',() => {
        var text = '         ';
        var ret = isRealString(text); 
        expect(ret).toBe(false);
    });
    it('Should reject empty string',() => {
        var text = '';
        var ret = isRealString(text); 
        expect(ret).toBe(false);
    });
    it('Should reject non-string values',() => {
        var text = undefined;
        var ret = isRealString(text); 
        expect(ret).toBe(false);
    });
   
});