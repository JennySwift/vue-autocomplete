<template>
    <h1>Autocomplete</h1>

    <h2>Options are objects</h2>
    <autocomplete
        input-id="my-autocomplete"
        prop="name"
        :unfiltered-options="options.objects"
        :function-on-enter=""
        :selected.sync="selected.object"
    >
    </autocomplete>

    <pre>Selected: {{$data.selected.object | json}}</pre>

    <h2>Options are not loaded initially</h2>
    <autocomplete
        input-id="my-autocomplete"
        prop="name"
        :unfiltered-options="options.notLoaded"
        :function-on-enter=""
        :selected.sync="selected.notLoaded"
    >
    </autocomplete>

    <h2>Options are from URL</h2>
    <autocomplete
        input-id="my-autocomplete"
        prop="name"
        url="http://localhost:63342/vue-autocomplete/url.json"
        :function-on-enter=""
    >
    </autocomplete>

    <pre>Selected: {{$data.selected.object | json}}</pre>

    <h2>Options with labels</h2>
    <autocomplete
        input-id="my-autocomplete"
        prop="name"
        :unfiltered-options="options.withLabels"
        option-partial="partial"
        :function-on-enter=""
        :selected.sync="selected.withLabel"
    >
    </autocomplete>

    <pre>Selected: {{$data.selected.withLabel | json}}</pre>

    <h2>Options with partial</h2>
    <autocomplete
        input-id="my-autocomplete"
        prop="name"
        :unfiltered-options="options.withLabels"
        option-partial="partial"
        :function-on-enter=""
        :selected.sync="selected.withLabel"
    >
    </autocomplete>

    <pre>Selected: {{$data.selected.withLabel | json}}</pre>

    <h2>Options are strings</h2>
    <autocomplete
        input-id="my-autocomplete"
        :unfiltered-options="options.strings"
        :function-on-enter=""
        :selected.sync="selected.string"
    >
    </autocomplete>

    <pre>Selected: {{$data.selected.string | json}}</pre>

</template>

<script>
    var Vue = require('vue');
    Vue.partial('partial', '<span v-if="option.assignedAlready" class="label label-default">Assigned</span><span v-if="!option.assignedAlready" class="label label-danger">Unassigned</span>');

    module.exports = {
        data: function () {
            return {
                selected: {
                    object: {name: 'two'},
                    notLoaded: {},
                    withLabel: {name: 'two', label: 'Assigned', assignedAlready: false},
                    string: 'two'
                },
                options: {
                    objects: [
                        {name: 'one'},
                        {name: 'two'},
                        {name: 'three'}
                    ],
                    notLoaded: [],
                    withLabels: [
                        {name: 'one', assignedAlready: true},
                        {name: 'two', assignedAlready: false},
                        {name: 'three', assignedAlready: true}
                    ],
                    strings: ['one', 'two', 'three']
                }
            }
        },
        ready: function () {
            var that = this;
            setTimeout(function () {
                that.options.notLoaded = [
                    {name: 'one'},
                    {name: 'two'},
                    {name: 'three'}
                ];
                that.selected.notLoaded = {name: 'two'};
            }, 2000);

        }
    };
</script>

<style lang="sass" rel="stylesheet/scss">
    .main {
        width: 50%;
        margin: auto;
    }
</style>