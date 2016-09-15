<template>
    <div class="autocomplete">
        <div class="form-group autocomplete-field">
            <label v-if="inputLabel" :for="autocompleteFieldId">{{ inputLabel | capitalize }}</label>
            <input
                v-model="chosenOption[prop]"
                v-on:keyup.down="downArrow()"
                v-on:keyup.up="upArrow()"
                v-on:keyup.enter="respondToEnter()"
                v-on:keyup="respondToKeyup($event.keyCode)"
                v-on:focus="respondToFocus()"
                v-on:blur="hideDropdown()"
                type="text"
                :id="autocompleteFieldId"
                :name="autocompleteFieldId"
                :placeholder="inputPlaceholder"
                class="form-control autocomplete-input"
            >
        </div>

        <div
            v-show="dropdown"
            transition="fade"
            class="autocomplete-dropdown scrollbar-container"
        >
            <div
                v-for="option in autocompleteOptions"
                v-show="autocompleteOptions.length > 0"
                v-bind:class="{'selected': currentIndex === $index}"
                v-on:mouseover="hoverItem($index)"
                v-on:mousedown="selectOption($index)"
                class="autocomplete-option"
            >
                <div>{{ option[prop] }}</div>

                <!--Labels for option-->
                <span v-if="option.assignedAlready && labelForOption" class="label label-default">
                        Assigned
                </span>
                <span v-if="!option.assignedAlready && labelForOption" class="label label-danger">Unassigned</span>

            </div>
            <div v-if="autocompleteOptions.length === 0" class="no-results">No results</div>
        </div>
    </div>
</template>

<script>
//    var $ = require('jquery');
    var helpers = require('./helpers');

    module.exports = {
        template: '#autocomplete-template',
        data: function () {
            return {
                autocompleteOptions: [],
                chosenOption: this.resetChosenOption(),
                dropdown: false,
                currentIndex: 0,
                timeSinceKeyPress: 0,
                interval: '',
                startedCounting: false
            };
        },
        components: {},
        methods: {

            /**
             *
             */
            hideDropdown: function () {
                this.dropdown = false;
            },

            /**
             *
             */
            showDropdown: function () {
                this.dropdown = true;
                this.currentIndex = 0;
            },

            /**
             *
             */
            upArrow: function () {
                if (this.currentIndex !== 0) {
                    this.currentIndex--;
                }
            },

            /**
             *
             */
            downArrow: function () {
                if (this.autocompleteOptions.length - 1 !== this.currentIndex) {
                    this.currentIndex++;
                }
            },

            /**
             *
             * @param index
             */
            hoverItem: function(index) {
                this.currentIndex = index;
            },

            /**
             *
             * @param index
             */
            selectOption: function (index) {
                if (index) {
                    //Item was chosen by clicking
                    this.currentIndex = index;
                }
                this.chosenOption = helpers.clone(this.autocompleteOptions[this.currentIndex]);
                this.hideDropdown();
                this.focusNextField();
                this.$dispatch('option-chosen', this.chosenOption);
            },

            /**
             *
             * @returns {{title: string, name: string}}
             */
            resetChosenOption: function () {
                return {
                    title: '',
                    name: ''
                }
            },

            /**
             *
             */
            respondToEnter: function () {
                if (this.dropdown) {
                    //enter is for the autocomplete
                    this.selectOption();
                }
                else {
                    //enter is to add the entry
                    this.functionOnEnter();
                }
            },





            /**
             *
             */
            populateOptions: function () {
                if (!this.unfilteredAutocompleteOptions) {
                    this.populateOptionsFromDatabase();
                }
                else {
                    this.populateOptionsFromLocal();
                }
            },

            /**
             *
             */
            populateOptionsFromLocal: function () {
                var that = this;
                var options = this.unfilteredAutocompleteOptions.filter(function (option) {
                    return option[that.prop].toLowerCase().indexOf(that.chosenOption[that.prop].toLowerCase()) !== -1;
                });

                this.setOptions(options);
            },

            /**
             *
             */
            setOptions: function (data) {
                this.autocompleteOptions = data;
                this.showDropdown();
            },

            /**
             *
             */
            populateOptionsFromDatabase: function () {
                helpers.get({
                    url: this.url + '?filter=' + this.chosenOption[this.prop],
                    callback: function (response) {
                        this.setOptions(response);
                    }.bind(this)
                });
            },














            /**
             *
             * @param keycode
             */
            respondToKeyup: function (keycode) {
                if (keycode !== 13 && keycode !== 38 && keycode !== 40 && keycode !== 39 && keycode !== 37) {
                    //not enter, up, down, right or left arrows
                    if (!this.unfilteredAutocompleteOptions) {
                        //We'll be searching the database, so create a delay before searching
                        this.startCounting();
                    }
                    else {
                        this.populateOptions();
                    }
                }
            },

            /**
             * Called each time a key is pressed that would fire the request to get the results (not enter, arrows, etc)
             * So a request isn't fired each time a key is pressed if the user types quickly
             */
            startCounting: function () {
                var that = this;
                clearInterval(this.interval);
                this.timeSinceKeyPress = 0;

                this.interval = setInterval(function () {
                    that.timeSinceKeyPress++;
                    if (that.timeSinceKeyPress > 1) {
                        that.populateOptions();
                        clearInterval(that.interval);
                    }
                }, 500);
            },

            /**
             * Show all the options if the options are local
             */
            respondToFocus: function () {
                if (this.unfilteredAutocompleteOptions) {
                    this.populateOptionsFromLocal();
                }
            },

            /**
             *
             */
//            updateScrollbar: function () {
//                var dropdown = $(this.$el).find('.scrollbar-container');
//                // dropdown.scrollTop(0).perfectScrollbar('update');
//                dropdown.mCustomScrollbar("scrollTo","top");
//            },

            /**
             *
             */
            focusNextField: function () {
                if (this.idToFocusAfterAutocomplete) {
                    var that = this;
                    setTimeout(function () {
//                        $("#" + that.idToFocusAfterAutocomplete).focus();
                    }, 100);
                }
            }
        },
        props: [
            'url',
            'inputLabel',
            'autocompleteFieldId',
            'functionOnEnter',
            'idToFocusAfterAutocomplete',
            //For if items are local
            'unfilteredAutocompleteOptions',
            //Property of the chosen option to display in input field once option is chosen
            'prop',
            'labelForOption',
            'inputPlaceholder'
        ],
        events: {
            'clear-autocomplete-field': function () {
                this.chosenOption = this.resetChosenOption();
            }
        },
        ready: function () {

        }
    };

</script>

<style lang="sass" rel="stylesheet/scss">
    $zIndex1: 9;
    $selected: #5cb85c;

    .autocomplete {
        margin-bottom: 20px;
        position: relative;
        .autocomplete-field {
            margin-bottom: 0px;
        }
        .autocomplete-dropdown {
            margin-top: 2px;
            max-height: 217px;
            border: 1px solid #777;
            border-radius: 3px;
            margin-bottom: 20px;
            position: absolute;
            top: 35px;
            background: white;
            width: 100%;
            z-index: $zIndex1;
            .autocomplete-option {
                display: flex;
                justify-content: space-between;
                align-items: center;
                cursor: pointer;
                padding: 5px 5px;
                .label {
                    margin-top: 1px;
                    margin-right: 4px;
                }
                &.selected {
                    background: $selected;
                }
            }
            .no-results {
                padding: 3px 8px;
            }
        }
        .scrollbar-container {
            .mCSB_draggerContainer {
                right: -7px;
            }
        }
    }
</style>