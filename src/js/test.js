/**
 * Created by 91608 on 2017/9/17.
 */
import '../sass/index.scss';
//
import * as utils from './libs/utils';

console.log("utils:",utils)
let getIndex = ()=>{
	console.log("this is index!!!")
}
getIndex()
console.log("首页42",$());
var  Hello = React.createClass({
	render(){
		return <p>Hello React244455!!!!</p>
	}
})
ReactDOM.render(<Hello/>,document.querySelector('.app'));
$(function () {
	$('.main').html('<p>更新首页内容33222!!</p>')
	$.cookie('phone','13688889999');
	let phone = $.cookie('phone');
	console.log("phone:",phone)
})