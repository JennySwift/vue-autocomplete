<template>
    <div class="autocomplete">
        <div class="form-group autocomplete-field">
            <label v-if="inputLabel" :for="inputId">{{ inputLabel | capitalize }}</label>
            <input
                v-model="inputValue"
                v-on:keyup.down="downArrow()"
                v-on:keyup.up="upArrow()"
                v-on:keyup.enter="respondToEnter()"
                v-el:input
                v-on:keyup="respondToKeyup($event.keyCode)"
                v-on:focus="respondToFocus()"
                v-on:blur="respondToBlur()"
                type="text"
                :id="inputId"
                :name="inputId"
                :placeholder="inputPlaceholder"
                class="form-control autocomplete-input"
            >
            <span v-bind:class="{'dropdown-visible': dropdown}" v-on:mousedown="respondToArrowClick()" class="fa fa-caret-down"></span>
        </div>

        <div
            v-show="dropdown"
            :transition="dropdownTransition"
            class="autocomplete-dropdown scrollbar-container"
        >
            <div
                v-for="option in options"
                v-show="options.length > 0"
                v-bind:class="{'selected': currentIndex === $index}"
                v-on:mouseover="hoverItem($index)"
                v-on:mousedown="selectOption($index)"
                class="autocomplete-option"
            >
                <div v-if="prop">{{ option[prop] }}</div>
                <div v-if="!prop">{{ option }}</div>

                <partial :name="optionPartial"></partial>
            </div>
            <div v-if="options.length === 0" class="no-results">No results</div>
        </div>
    </div>
</template>

<script>
    var $ = require('jquery');
    var helpers = require('./helpers');

    module.exports = {
        template: '#autocomplete-template',
        data: function () {
            return {
                options: [],
//                chosenOption: this.resetChosenOption(),
                dropdown: false,
                currentIndex: 0,
                timeSinceKeyPress: 0,
                interval: '',
                startedCounting: false,
                inputValue: ''
            };
        },
        components: {},
        computed: {

        },
        watch: {
            'unfilteredOptions': function (val, oldVal) {
                if (this.selected) {
                    this.setInputValue();
                }
            },
            'selected': function (val, oldVal) {
                this.setInputValue();
            }
        },
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
                if (this.options.length - 1 !== this.currentIndex) {
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
                this.selected = helpers.clone(this.options[this.currentIndex]);
                this.setInputValue();
                this.hideDropdown();
                this.focusNextField();
                this.$dispatch('option-chosen', this.selected, this.inputId);
            },

            /**
             *
             * @returns {{title: string, name: string}}
             */
//            resetChosenOption: function () {
//                return {
//                    title: '',
//                    name: ''
//                }
//            },

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
            filterLocalOptions: function () {
                var that = this;
                return this.unfilteredOptions.filter(function (option) {
                    var string = that.getString(option);
                    return string.toLowerCase().indexOf(that.inputValue.toLowerCase()) !== -1;
                });
            },

            /**
             * If the option is an object, get the property.
             * If the option is a string, get the string.
             */
            getString: function (option) {
                if (this.prop) {
                    return option[this.prop];
                }
                console.log(option);
                return option;
            },

            /**
             *
             */
            setOptions: function (data) {
                this.options = data;
                this.showDropdown();
            },

            /**
             *
             */
            populateOptionsFromDatabase: function () {
                helpers.get({
                    url: this.url + '?filter=' + this.inputValue,
                    callback: function (response) {
                        this.setOptions(response);
                    }.bind(this)
                });
            },














            /**
             * Respond to keyup if the key is a character
             * @param keycode
             */
            respondToKeyup: function (keycode) {
                if (!helpers.keyIsCharacter(keycode)) return false;

                if (!this.unfilteredOptions) {
                    //We'll be searching the database, so create a delay before searching
                    this.startCounting();
                }
                else {
                    //Options are local, not in the database
                    this.setOptions(this.filterLocalOptions());
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
                        that.populateOptionsFromDatabase();
                        clearInterval(that.interval);
                    }
                }, 500);
            },

            /**
             * For when the arrow is clicked
             */
//            toggleDropdown: function () {
//                if (this.dropdown) {
//                    this.respondToBlur();
//                }
//                else {
//                    this.respondToFocus();
//                }
//            },

            /**
             *
             */
            respondToArrowClick: function () {
                if(!this.dropdown) {
                    var that = this;
                    setTimeout(function () {
                        $(that.$els.input).focus();
                    }, 100);
                }
            },

            /**
             * Show all the options if the options are local
             */
            respondToFocus: function () {
                this.clearInputValue();
                if (this.unfilteredOptions) {
                    this.setOptions(this.filterLocalOptions());
                }
            },

            /**
             *
             */
            respondToBlur: function () {
                this.hideDropdown();
                this.setInputValue();
            },

            /**
             *
             */
            clearInputValue: function () {
                this.inputValue = '';
            },

            /**
             *
             */
            setInputValue: function () {
                if (!this.selected) return false;

                if (this.prop) {
                    this.inputValue = this.selected[this.prop];
                }
                else {
                    this.inputValue = this.selected;
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
        props: {
            'url': {},
            'inputLabel': {},
            'inputId': {},
            'functionOnEnter': {},
            'idToFocusAfterAutocomplete': {},
            //For if items are local
            'unfilteredOptions': {},
            //Property of the chosen option to display in input field once option is chosen
            //Don't give this a default because then it will think the options are objects if they are strings
            'prop': {},
            'labelForOption': {},
            'selected': {},
            'optionPartial': {},
            'dropdownTransition': {
                default: 'fade'
            },
            inputPlaceholder: {
                default: 'Choose an option'
            },
        },
        ready: function () {
            var that = this;
            setTimeout(function () {
                that.setInputValue();
            }, 2000);
        },
        events: {
//            'clear-autocomplete-field': function () {
//                this.chosenOption = this.resetChosenOption();
//            }
        }
    };

</script>

<style lang="sass" rel="stylesheet/scss">
    $zIndex1: 9;
    $zIndex2: 99;
    $selected: #5cb85c;

    .autocomplete {
        margin-bottom: 20px;
        position: relative;
        .autocomplete-field {
            margin-bottom: 0px;
            position: relative;
            .fa-caret-down {
                position: absolute;
                right: 13px;
                top: 8px;
                font-size: 20px;
                cursor: pointer;
                color: #777;
                transition: transform .5s ease;
                z-index: $zIndex1;
                &.dropdown-visible {
                    transform: rotate(180deg);
                }
            }
            input {
                //To allow room for the arrow
                padding-right: 27px;
            }
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
            z-index: $zIndex2;
            overflow: scroll;
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