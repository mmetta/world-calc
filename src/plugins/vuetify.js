import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                success: '#163837',
                primary: '#009688',
                secondary: '#E0F2F1',
                accent: '#EF6C00'
            },
        },
    },
});
