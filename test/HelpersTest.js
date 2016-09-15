var assert = require('chai').assert;
var helpers = require('../helpers');

describe('helpers', function () {

    describe('keycodes', function () {
        it('can tell if a key is a character', function () {
            assert.isFalse(helpers.keyIsCharacter(13));
            assert.isFalse(helpers.keyIsCharacter(38));
            assert.isFalse(helpers.keyIsCharacter(40));
            assert.isFalse(helpers.keyIsCharacter(39));
            assert.isFalse(helpers.keyIsCharacter(27));
            assert.isFalse(helpers.keyIsCharacter(16));
            assert.isFalse(helpers.keyIsCharacter(18));
            assert.isFalse(helpers.keyIsCharacter(17));
            assert.isFalse(helpers.keyIsCharacter(20));

            assert.isTrue(helpers.keyIsCharacter(69));
        });
    });

});