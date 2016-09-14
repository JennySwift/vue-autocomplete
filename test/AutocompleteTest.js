var expect = require('chai').expect;
var assert = require('chai').assert;
var Vue = require('vue');


describe('autocomplete component', function () {
    var vm;

    beforeEach(function () {
        vm = new Vue(require('../AutocompleteComponent.vue'));
    });

    it('can show the dropdown', function () {
        assert.isFalse(vm.dropdown);
        vm.showDropdown();
        assert.isTrue(vm.dropdown);
    })
});