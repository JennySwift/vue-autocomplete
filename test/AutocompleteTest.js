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

        vm.options = [];

        vm.prop = 'name';
        // vm.chosenOption = {name: 't'};
        vm.inputValue = 't';
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
            vm.options = options;
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
            vm.options = options;
        });

        it('can choose an option by clicking on it', function () {
            assert.isUndefined(vm.selected);
            vm.currentIndex = 0;
            assert.equal(0, vm.currentIndex);
            vm.selectOption(2);
            assert.equal(2, vm.currentIndex);
            assert.deepEqual({name: 'three'}, vm.selected);
            assert.equal('three', vm.inputValue);
        });

        it('can choose the selected option', function () {
            vm.currentIndex = 1;
            assert.equal(1, vm.currentIndex);
            vm.selectOption();
            assert.deepEqual({name: 'two'}, vm.selected);
            assert.isFalse(vm.dropdown);
            //Todo: test next field is focused and event is dispatched
        });

        it('can choose an option when the options are strings not objects', function () {
            vm.prop = undefined;
            assert.isUndefined(vm.selected);
            assert.isUndefined(vm.prop);
            vm.options = ['one', 'two', 'three'];
            vm.currentIndex = 0;
            assert.equal(0, vm.currentIndex);

            vm.selectOption(2);
            assert.equal(2, vm.currentIndex);
            assert.equal('three', vm.selected);
            assert.equal('three', vm.inputValue);
        });
    });

    // describe('chosen option', function () {
    //     it('can reset the chosen option', function () {
    //         assert.deepEqual({name: 't'}, vm.chosenOption);
    //         vm.chosenOption = vm.resetChosenOption();
    //         assert.deepEqual({
    //             title: '',
    //             name: ''
    //         }, vm.chosenOption);
    //     })
    // });

    describe('populating the options', function () {
        it('can filter the options from local data', function () {
            assert.deepEqual([], vm.options);
            var result = vm.filterLocalOptions();
            assert.deepEqual([
                {name: 'two'},
                {name: 'three'}
            ], result);
        });

        it('can filter the options when the options are strings and not objects', function () {
            vm.prop = undefined;
            assert.isUndefined(vm.prop);
            assert.deepEqual([], vm.options);
            vm.unfilteredOptions = ['one', 'two', 'three'];
            var result = vm.filterLocalOptions();
            assert.deepEqual(['two', 'three'], result);
        });

        it('can set the options', function () {
            assert.deepEqual([], vm.options);
            vm.setOptions(options);
            assert.deepEqual(options, vm.options);
        });

        it('can show the options when the input is focused in the options are local', function () {
            vm.clearInputValue();

            assert.deepEqual([], vm.options);

            vm.respondToFocus();
            
            assert.deepEqual(options, vm.options);
        });
    });

    describe('strings', function () {
        it('can get the option property if the option is an object', function () {
            var result = vm.getString({name: 'three'});
            assert.equal('three', result);
        });

        it('can get the string if the option is a string', function () {
            vm.prop = undefined;
            var result = vm.getString('four');
            assert.equal('four', result);
        });
    });

    describe('input field', function () {
        it('can clear the input field', function () {
            vm.inputValue = 'hi';
            assert.equal('hi', vm.inputValue);
            vm.clearInputValue();
            assert.equal('', vm.inputValue);
        });

        it('can set the input value according to the property of the selected option', function () {
            vm.selected = {name: 'two'};
            vm.clearInputValue();
            assert.equal('', vm.inputValue);
            vm.setInputValue();
            assert.equal('two', vm.inputValue);
        });

        it('can set the input value as the selected option if the option is a string', function () {
            vm.prop = undefined;
            vm.selected = 'two';
            vm.clearInputValue();
            assert.equal('', vm.inputValue);
            vm.setInputValue();
            assert.equal('two', vm.inputValue);
        });

        it('can respond to the input blur', function () {
            vm.selected = {name: 'two'};
            vm.dropdown = true;
            assert.isTrue(vm.dropdown);
            vm.respondToBlur();
            assert.isFalse(vm.dropdown);
            assert.equal('two', vm.inputValue);
        });

        it('returns false if there is nothing selected', function () {
            vm.selected = undefined;
            var result = vm.setInputValue();
            assert.isFalse(result);
        });
    });
});