/*导入jQuery*/
import $ from 'jquery';
window.jq = $;
window.$ = $;
window.jQuery = $;
$.noConflict(); // 注销jQuery的$别名防止和其他带$的库产生冲突jQuery语法一律使用jQuery代替$

import './src/css/core.css'; // 引入核心css模块
import './src/scss/core.scss'; // 引入核心scss模块
import './src/lib/bootstrap-Grid-System/bootstrap-gridSystem.min.css'; // 引入仅带栅格系统的bootstrap版本（~13kb）

require('./src/lib/rem/rem.js'); // 引入自适应适配方案

require('./src/lib/sys/sys.js'); // 引入我的工具库

require('./src/lib/layer-v3.0.3/layer/layer.js'); // 引入弹窗插件

/*各项控制器的引入*/
require('./src/template/demo/demo.Controller.js');
require('./src/template/didiIndex/didiIndex.Controller.js');
require('./src/template/didiGiftList/didiGiftList.Controller.js');
require('./src/template/didiRanking/didiRanking.Controller');
require('./src/template/didiCollect/didiCollect.Controller.js');

