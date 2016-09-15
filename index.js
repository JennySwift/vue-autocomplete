var Vue = require('vue');
var VueResource = require('vue-resource');
Vue.use(VueResource);



//Components
Vue.component('home-page', require('./HomePageComponent.vue'));
Vue.component('autocomplete', require('./AutocompleteComponent.vue'));

//Transitions
Vue.transition('fade', require('./transitions/FadeTransition.vue'));

new Vue({
    el: 'body'
});


