/**
 * !VCropper
 *
 * @author yiwei
 * @data 2017-06-14
 */
import VCopper from './components/vcopper.vue';

/**
 * 插件公共方法
 *
 * @param Vue
 * @param options
 */
const install = (Vue, options) => {
    Vue.component('VCopper', VCopper);
};

if (!!window && window.Vue) {
    install(window.Vue);
}

// Vue.use(VCopper) => VCopper.install(Vue);
export default Object.assign(VCopper, {install});
