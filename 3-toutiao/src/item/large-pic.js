/**
 * 大图图组件
 * @author liyingiying
 */

import Componet from './component'

export default class LargePic extends Componet {
    constructor(props) {
        super(props)
    }

    render() {
        const {data} = this.props;

		return `<div class="item large-image" on:click="aa">
                <h3>
                    ${data.title}
                </h3>
                <img src="${data.imageList[0]}" />
            </div>`;
    }
}