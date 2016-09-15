var assert = require('chai').assert;
var Vue = require('vue');
var helpers = require('../helpers');


describe('autocomplete component', function () {
    var vm;

    var options = [
        {name: 'one'},
        {name: 'two'},
        {name: 'three'}
    ];

    beforeEach(function () {
        vm = new Vue(require('../AutocompleteComponent.vue'));

        vm.unfilteredOptions = [
            {name: 'one'},
            {name: 'two'},
            {name: 'three'}
        ];

        vm.autocompleteOptions = [];

        vm.prop = 'name';
        vm.chosenOption = {name: 't'};
    });

    describe('dropdown visibility', function () {
        it('can show the dropdown', function () {
            assert.isFalse(vm.dropdown);
            vm.showDropdown();
            assert.isTrue(vm.dropdown);
            assert.equal(0, vm.currentIndex);
        });

        it('can hide the dropdown', function () {
            vm.dropdown = true;
            assert.isTrue(vm.dropdown);
            vm.hideDropdown();
            assert.isFalse(vm.dropdown);
        });
    });
    
    describe('currentIndex', function () {
        vm = new Vue(require('../AutocompleteComponent.vue'));

        beforeEach(function () {
            vm.autocompleteOptions = options;
        });

        it('can increase the currentIndex', function () {
            assert.equal(0, vm.currentIndex);
            vm.downArrow();
            assert.equal(1, vm.currentIndex);
        });

        it('cannot increase the currentIndex if the currentIndex is the last item', function () {
            vm.currentIndex = 2;
            assert.equal(2, vm.currentIndex);
            vm.downArrow();
            assert.equal(2, vm.currentIndex);
        });

        it('can decrease the currentIndex', function () {
            vm.currentIndex = 2;
            assert.equal(2, vm.currentIndex);
            vm.upArrow();
            assert.equal(1, vm.currentIndex);
        });

        it('cannot increase the currentIndex if the currentIndex is the last item', function () {
            vm.currentIndex = 0;
            assert.equal(0, vm.currentIndex);
            vm.upArrow();
            assert.equal(0, vm.currentIndex);
        });

        it('can set the currentIndex by hovering over the option', function () {
            vm.currentIndex = 0;
            assert.equal(0, vm.currentIndex);
            vm.hoverItem(2);
            assert.equal(2, vm.currentIndex);
        });
    });

    describe('choosing an option', function () {
        beforeEach(function () {
            vm.autocompleteOptions = options;
        });

        it('can choose an option by clicking on it', function () {
            vm.currentIndex = 0;
            assert.equal(0, vm.currentIndex);
            vm.selectOption(2);
            assert.equal(2, vm.currentIndex);
        });

        it('can choose the selected option', function () {
            vm.currentIndex = 1;
            assert.equal(1, vm.currentIndex);
            vm.selectOption();
            assert.deepEqual({name: 'two'}, vm.chosenOption);
            assert.isFalse(vm.dropdown);
            //Todo: test next field is focused and event is dispatched
        });
    });

    describe('chosen option', function () {
        it('can reset the chosen option', function () {
            assert.deepEqual({name: 't'}, vm.chosenOption);
            vm.chosenOption = vm.resetChosenOption();
            assert.deepEqual({
                title: '',
                name: ''
            }, vm.chosenOption);
        })
    });

    describe('populating the options', function () {
        it('can set the options', function () {
            assert.deepEqual([], vm.autocompleteOptions);
            vm.setOptions(options);
            assert.deepEqual(options, vm.autocompleteOptions);
        });

        it('can populate the options from local data', function () {
            vm.populateOptions();
            assert.deepEqual([
                {name: 'two'},
                {name: 'three'}
            ], vm.autocompleteOptions);
            assert.isTrue(vm.dropdown);
            assert.equal(0, vm.currentIndex);
        });
    });

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
    })


});