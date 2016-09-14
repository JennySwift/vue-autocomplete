
module.exports = {
    /**
     *
     * @param object
     */
    clone: function (object) {
        return JSON.parse(JSON.stringify(object));
    },

    /**
     * storeProperty is the store property to set once the items are loaded.
     * loadedProperty is the store property to set once the items are loaded, to indicate that the items are loaded.
     * todo: allow for sending data: add {params:data} as second argument
     */
    get: function (options) {
        store.showLoading();
        Vue.http.get(options.url).then(function (response) {
            if (options.callback) {
                options.callback(response.data);
            }

            if (options.storeProperty) {
                if (options.updatingArray) {
                    //Update the array the item is in
                    store.update(response.data, options.storeProperty);
                }
                else {
                    store.set(response.data, options.storeProperty);
                }
            }

            if (options.loadedProperty) {
                store.set(true, options.loadedProperty);
            }

            store.hideLoading();
        }, function (response) {
            helpers.handleResponseError(response.data, response.status);
        });
    },
};