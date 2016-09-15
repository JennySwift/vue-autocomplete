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
        it('can filter the options from local data', function () {
            assert.deepEqual([], vm.autocompleteOptions);
            var result = vm.filterLocalOptions();
            assert.deepEqual([
                {name: 'two'},
                {name: 'three'}
            ], result);
        });

        it('can set the options', function () {
            assert.deepEqual([], vm.autocompleteOptions);
            vm.setOptions(options);
            assert.deepEqual(options, vm.autocompleteOptions);
        });

        it('can show the options when the input is focused in the options are local', function () {
            vm.chosenOption = vm.resetChosenOption();

            assert.deepEqual({
                title: '',
                name: ''
            }, vm.chosenOption);

            assert.deepEqual([], vm.autocompleteOptions);

            vm.respondToFocus();
            
            assert.deepEqual(options, vm.autocompleteOptions);
        });
    });
});