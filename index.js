var Vue = require('vue');
var VueResource = require('vue-resource');
Vue.use(VueResource);



//Components
Vue.component('home-page', require('./HomePageComponent.vue'));
Vue.component('autocomplete', require('./AutocompleteComponent.vue'));


new Vue({
    el: 'body'
});


