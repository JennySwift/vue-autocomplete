var Vue = require('vue');
var VueResource = require('vue-resource');
Vue.use(VueResource);

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
        // store.showLoading();
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

            // store.hideLoading();
        }, function (response) {
            helpers.handleResponseError(response.data, response.status);
        });
    },

    /**
     * Return false if key is not:
     * enter (13)
     * up (38)
     * down (40)
     * right arrow (39)
     * left arrow (37)
     * escape (27)
     * shift (16)
     * option (18)
     * control (17)
     * caps lock (20)
     */
    keyIsCharacter: function (keycode) {
        return keycode !== 13
            && keycode !== 38
            && keycode !== 40
            && keycode !== 39
            && keycode !== 37
            && keycode !== 27
            && keycode !== 16
            && keycode !== 18
            && keycode !== 17
            && keycode !== 20;
    },
};