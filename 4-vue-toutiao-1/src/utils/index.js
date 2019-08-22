/**
 * 工具函数
 */
import echarts from 'echarts'

const createDebounce = (fn, delay = 1000) => {
    
    let timmer = null;

    return args => {
        clearTimeout(timmer);
        timmer = setTimeout(() => {
            fn && fn(args);
        }, delay);
    };
};

export const functionalTool = {
    install(Vue, options) {
        Vue.mixin({
            methods: {
                createDebounce
            }
        })

        Vue.component('echarts',{
            props: {
                width: {
                    type: Number,
                    default: -1
                },
                height: {
                    type: Number,
                    default: -1
                },
                options: {
                    type: Object,
                    default: {}
                }
            },
            render(createElement) {
                return createElement(
                    'div',
                    {
                        attrs: {
                            id: this.randomId
                        },
                        style: this.canvasStyle,
                        directives: [
                            {
                                name: 'echarts'
                            }
                        ]
                    }
                )
            },
            mounted() {
                
                this.draw();
                this.$watch('options', options => {
                    this.draw();
                });
            },
            computed: {
                randomId() {
                    return 'echarts-' + Math.floor(Math.random()*10);
                },
                canvasStyle() {
                    return {
                        width: this.width==-1 ? '100%' : this.width+'px',
                        height: this.height==-1 ? '100%' : this.height+'px'
                    }
                }
            },
            methods: {
                recieveEchartsContext(context) {
                    this.echartsContext = context;
                },
                draw() {
                    const options = this.options;
                    this.echartsContext.setOption(options);
                }
            }
        })

        Vue.directive('echarts', {
            inserted: (el, binding, vnode) => {
                const charts = echarts.init(el);
                vnode.context.recieveEchartsContext && vnode.context.recieveEchartsContext(charts);
            }
        });
    }
}