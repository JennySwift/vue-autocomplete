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
    module.exports = {
        data: function () {
            return {
                selected: {
                    object: {name: 'two'},
                    string: 'two'
                },
                options: {
                    objects: [
                        {name: 'one'},
                        {name: 'two'},
                        {name: 'three'}
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