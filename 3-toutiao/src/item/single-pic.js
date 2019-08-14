/**
 * 单图组件
 * @author liyingiying
 */

import Componet from './component'

export default class SinglePic extends Componet {
    constructor(props) {
        super(props)
    }

    render() {
        const {data} = this.props;

		return `<div class="item single-pic">
                <div class="content">
                    <span y-on:click="clicking">
                        ${data.title}
                    </span>
                </div>
                <img src="${data.imageList[0]}" />
            </div>`;
    }
}