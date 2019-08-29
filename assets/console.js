; (function () {
  try {
    console.log('\r\n%c今天的我你爱理不理，明天的我还来找你。\r\n', 'font-size:22px;color:red;text-shadow: 0 2px 2px black;font-family:"Microsoft Yahei";font-weight: bold;');
    var obj = {
      Author: "Wuxiaohong",
      WeChat: "Wxh16144",
      Twitter: "Wxh16144",
      Weibo: "Wxh16144",
      GitHub: "Wxh16144",
      QQEmail: "Wxh16144@qq.com",
      "163Email": "Wxh16144@163.com",
      GoogleEmail: "Wxh1220@gmail.com",
      QQ: "960016144",
    }
    Object.keys(obj).forEach(key => {
      console.log(`%c${key}: %c${obj[key]}`, "color:red;font-size:18px;font-weight:600", "color:green;font-size:16px");
    })
  } catch (error) {
    console.log('http://wxhboy.cn');
  }
}());