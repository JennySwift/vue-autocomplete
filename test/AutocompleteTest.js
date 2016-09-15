var expect = require('chai').expect;
var assert = require('chai').assert;
var Vue = require('vue');


describe('autocomplete component', function () {
    var vm;

    //Todo: test respondToEnter method

    beforeEach(function () {
        vm =  = new Vue(require('../AutocompleteComponent.vue'));

        vm.unfilteredAutocompleteOptions = [
            {name: 'one'},
            {name: 'two'},
            {name: 'three'}
        ];

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
            assert.isTrue(vm.dropdown);
            vm.hideDropdown();
            assert.isFalse(vm.dropdown);
        });
    });
    
    describe('currentIndex', function () {
        vm = new Vue(require('../AutocompleteComponent.vue'));

        vm.autocompleteOptions = [
            {name: 'one'},
            {name: 'two'},
            {name: 'three'}
        ];

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
            assert.equal(0, vm.currentIndex);
            vm.hoverItem(2);
            assert.equal(2, vm.currentIndex);
        });
    });

    describe('choosing an option', function () {
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
            console.log(vm.autocompleteOptions);
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


});