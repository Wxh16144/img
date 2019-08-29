;(function(win){
  Vue.use(VueLazyload,{
    loading:'./loading.gif',
    error:'./error.png'
  });

  Vue.component('img-item', {
    template: `
      <li class="img-item">
        <div class="img-box">
          <img ref="wxhimg" class="img" v-lazy="img.url" :alt="img.msg" :title="img.title"/>
        </div>
        <div class="btn-box">
          <button class="btn" data-clipboard-action="copy" :data-text="img.url" @mouseover="link_click">复制链接</button>
          <button class="btn" data-clipboard-action="copy" :data-text="img_element_html" @mouseover="label_click">复制标签</button>
        </div>
      </li>
    `,
    props:{
      img:{
        type:Object,
        default(){
          return {
            name:'wxh',
            url:'https://avatars0.githubusercontent.com/u/32004925',
            msg:`Sorry, picture wxh is not found .`,
            title:'Wuxiaohong'
          }
        }
      }
    },
    data(){
      return {

      }
    },
    methods: {
      link_click({target}){
        layer.tips(this.img.url, target, {
          tips: [1, this.randomColor()] //还可配置颜色
        });
        // target.setAttribute('data-text',this.img.url);
      },
      label_click({target}){
        let content = this.HTMLEncode(this.img_element_html)
        layer.tips(content, target, {
          tips: [1, this.randomColor()] //还可配置颜色
        });
        // target.setAttribute('data-text',this.img_element_html);
     },
     HTMLEncode(html) {
      var temp = document.createElement("div");
      (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
      var output = temp.innerHTML;
      temp = null;
      return output;
    },
    randomColor(n =3){
      var v = Math.floor(Math.random()*6)
      return ['#7cb305','#722ed1','#ad8b00','#13c2c2','#eb2f96','#1890ff'][v] || 'red'
      // return "#" + Math.random().toString(16).slice(-n)
    }
    },
    computed:{
      img_element_html(){
        var img = document.createElement('img');
        img.src = this.img.url;
        img.title = this.img.title;
        img.alt = this.img.msg;
        return img.outerHTML;
      }
    }
  });

  var vm = new Vue({
    el:'#root',
    data:{
      // url:'http://wxhboy.cn/img/'
      url:''
    },
    methods:{
     
    },
    computed: {
      imgList (){
        var  header = Array.from( Array(23),(_,i)=>String.fromCharCode(97+i)+'.jpg');
        var  footer = Array.from( Array(3),(_,i)=>String.fromCharCode(120+i)+'.gif');
        return Array.prototype.concat.call(header,footer).map(v=>{
          let name =  v.split('.')[0];
          return  {
            name,
            url:this.url + v,
            title:`Picture ${name}`,
            msg:`Sorry, picture ${name} is not found.`
          }
        })
      }
    },
    mounted() {
      this.$nextTick(()=>{
        var clipboard  = new ClipboardJS('.btn',{
          text: function(trigger) {
            return trigger.getAttribute('data-text');
        }
        });
        clipboard.on('success', (e) =>{
          layer.msg('复制成功')
        });
      
        clipboard.on('error', (e)=> {
          layer.msg('复制失败')
        });
      })
    },
  })
}(window));