<template>
    <h1>Autocomplete</h1>

    <autocomplete
        input-id="my-autocomplete"
        prop="name"
        :unfiltered-options="options"
        :function-on-enter=""
        :selected.sync="selected"
    >
    </autocomplete>

    <pre>Selected: {{$data.selected | json}}</pre>

</template>

<script>
    module.exports = {
        data: function () {
            return {
                //To test with objects (add prop="name" to component instance)
                selected: {name: 'two'},
                options: [
                    {name: 'one'},
                    {name: 'two'},
                    {name: 'three'}
                ]

                //To test with strings (remove the 'prop' attribute)
//                selected: 'two',
//                options: ['one', 'two', 'three']
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