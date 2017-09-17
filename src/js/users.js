/**
 * Created by 91608 on 2017/9/17.
 */

import '../sass/users.scss';

import * as utils from './libs/utils';
let getIndex = ()=>{
	console.log("this is user",location.pathname)
}
getIndex()
console.log("用户:,",utils.util.getPathname())