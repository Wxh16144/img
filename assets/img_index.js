;(function(win){
  
  const { origin, pathname } = new URL(win.location.href);
  
  Vue.use(VueLazyload,{
    loading:'assets/loading.gif',
    error:'assets/error.png'
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
            title:'WuXiaohong'
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
          tips: [1, this.randomColor()] 
        });
        // target.setAttribute('data-text',this.img_element_html);
     },
     HTMLEncode(html) {
      let temp = document.createElement("div");
      (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
      let output = temp.innerHTML;
      temp = null;
      return output;
    },
    randomColor(n =3){
      let v = Math.floor(Math.random()*6)
      return ['#7cb305','#722ed1','#ad8b00','#13c2c2','#eb2f96','#1890ff'][v] || 'red';
      // return "#" + Math.random().toString(16).slice(-n)
    }
    },
    computed:{
      img_element_html(){
        let img = document.createElement('img');
        img.src = this.img.url;
        img.title = this.img.title;
        img.alt = this.img.msg;
        return img.outerHTML;
      }
    }
  });

  /*win.vm =*/ new Vue({
    el:'#root',
    data:{
      first_pic: false,
      urlType: 'Auto'
    },
    methods:{
      easterEgg(){
        this.first_pic = ! this.first_pic;
      }
    },
    computed: {
      url(){
        switch(this.urlType){
          case 'Auto':
            return `${origin}${pathname.replace(/\w+\.html/, '')}`;
          case 'GitHub':
            return '//raw.githubusercontent.com/Wxh16144/img/main/'
          case 'jsDelivr':
            return '//cdn.jsdelivr.net/gh/Wxh16144/img/'
        }
      },
      imgList (){
        let number = this.first_pic ? 23 : 22;
        let start =this.first_pic ? 97 : 98;
        let  header = Array.from( Array(number),(_,i)=>String.fromCharCode(start+i)+'.jpg');
        let  footer = Array.from( Array(3),(_,i)=>String.fromCharCode(120+i)+'.gif');
        return Array.prototype.concat.call(header,footer).map(v=>{
          let name =  v.split('.')[0];
          return  {
            name,
            url:this.url + v,
            title:`Picture ${name}`,
            msg:`Sorry, picture ${name} is not found.`
          }
        })
      },
      title(){
        return this.first_pic ?'light' :  'dark' ;
      }
    },
    mounted() {
      this.$nextTick(()=>{
        let clipboard  = new ClipboardJS('.btn',{
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
    watch:{
      first_pic(val){
        let rootElement = document.documentElement;
        let color = ['white','black'];
        rootElement.style.setProperty('--bg',color[~~val] );
        rootElement.style.setProperty('--color',color[~~!val] );
        document.body.classList = (val).toString();
      }
    }
  })
}(window));
