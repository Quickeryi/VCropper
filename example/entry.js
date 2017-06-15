/**
 * !VCropper
 *
 * 入口js
 *
 * @author yiwei
 * @data 2017-06-15
 */
import Vue from 'vue';
import VCropper from 'vcropper';
import app from './app.vue';

Vue.use(VCropper);

new Vue({
    el: '#vcropper-app',
    render: h => h(app)
});