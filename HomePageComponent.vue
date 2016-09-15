<template>
    <h1>Autocomplete</h1>

    <autocomplete
        autocomplete-field-id="my-autocomplete"
        :unfiltered-options="options"
        prop="name"
        :function-on-enter=""
        input-placeholder="some placeholder"
    >
    </autocomplete>

</template>

<script>
    module.exports = {
        data: function () {
            return {
                options: [
                    {name: 'one'},
                    {name: 'two'},
                    {name: 'three'}
                ]
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