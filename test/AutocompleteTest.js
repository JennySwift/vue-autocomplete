var expect = require('chai').expect;
var assert = require('chai').assert;
var Vue = require('vue');


describe('autocomplete component', function () {
    var vm = new Vue(require('../AutocompleteComponent.vue'));

    // beforeEach(function () {
    //     vm = new Vue(require('../AutocompleteComponent.vue'));
    // });

    vm.unfilteredAutocompleteOptions = [
        {name: 'one'},
        {name: 'two'},
        {name: 'three'}
    ];

    describe('dropdown visibility', function () {
        it('can show the dropdown', function () {
            assert.isFalse(vm.dropdown);
            vm.showDropdown();
            assert.isTrue(vm.dropdown);
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


});