<template>
    <h1>Autocomplete</h1>

    <autocomplete
        autocomplete-field-id="my-autocomplete"
        :unfiltered-autocomplete-options="options"
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