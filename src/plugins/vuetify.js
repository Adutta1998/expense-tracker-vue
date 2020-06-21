import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light:{
                primary: '#2196f3',
                secondary: '#ff5722',
                accent: '#009688',
                error: '#f44336',
                warning: '#ff9800',
                info: '#03a9f4',
                success: '#8bc34a'
            }
        }
    }
});
