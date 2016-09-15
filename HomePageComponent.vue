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

    <h2>Options with labels</h2>
    <autocomplete
        input-id="my-autocomplete"
        prop="name"
        :unfiltered-options="options.withLabels"
        label-for-option="Assigned"
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
        option-partial="partial-three"
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
    Vue.partial('my-partial', '<p>This is a partial! {{msg}}</p>');
    Vue.partial('partial-two', '<p>Partial two</p>');
    Vue.partial('partial-three', '<span v-if="option.assignedAlready" class="label label-default">Assigned</span><span v-if="!option.assignedAlready" class="label label-danger">Unassigned</span>');

    module.exports = {
        data: function () {
            return {
                selected: {
                    object: {name: 'two'},
                    withLabel: {name: 'two', label: 'Assigned', assignedAlready: false},
                    string: 'two'
                },
                options: {
                    objects: [
                        {name: 'one'},
                        {name: 'two'},
                        {name: 'three'}
                    ],
                    withLabels: [
                        {name: 'one', assignedAlready: true},
                        {name: 'two', assignedAlready: false},
                        {name: 'three', assignedAlready: true}
                    ],
                    strings: ['one', 'two', 'three']
                }
            }
        }
    };
</script>

<style lang="sass" rel="stylesheet/scss">
    .main {
        width: 50%;
        margin: auto;
    }
</style>