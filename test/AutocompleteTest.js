var expect = require('chai').expect;
var assert = require('chai').assert;
var Vue = require('vue');


describe('autocomplete component', function () {
    var vm = new Vue(require('../AutocompleteComponent.vue'));

    // beforeEach(function () {
    //     vm = new Vue(require('../AutocompleteComponent.vue'));
    // });

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

    it('can increase the currentIndex', function () {
        assert.equal(0, vm.currentIndex);
    })
});