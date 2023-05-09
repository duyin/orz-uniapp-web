<!--
 * @Author: 杜印 m18612326243@163.com
 * @Date: 2022-10-14 13:22:49
 * @LastEditors: 杜印 m18612326243@163.com
 * @LastEditTime: 2022-11-10 18:58:57
 * @FilePath: /vue-admin-template-master/src/components/LangSelect/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <!-- <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <div style="font-size: 12px;">
     
      {{ defLanguage }}  <i class="el-icon-arrow-down el-icon--right" />
    </div>
    <el-dropdown-menu slot="dropdown">
       <el-dropdown-item :disabled="language==='zh'" command="zh">
        中文
      </el-dropdown-item> 
      <el-dropdown-item :disabled="language==='en'" command="en">
        English
      </el-dropdown-item>
    
      <el-dropdown-item :disabled="language==='tc'" command="tc">
        中文繁体
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown> -->
  <uni-data-select
					class="client-phoneAreaList1"
					v-model="lang"
          @change="handleSetLanguage"
					:localdata="chinaList"
					:clear="false"
				/>
</template>

<script>
import en from '@/lang/en'
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      lang: 'en',
      chinaList:[
        {  
				   text:' English',
				    value:'en'
				},
				{  
				   text:'中文繁体',
				    value:'zh'
				}
      ]
    }
  },
  computed: {
    defLanguage() {
      console.log(this.$store, this.$store.state.app)
      this.$store.dispatch('app/setLanguage', this.lang)
      this.$i18n.locale = this.lang
      Cookies.set('language', this.lang)
      return this.$store.state.app.language === 'tc' ? '中文繁体' : 'English'
    },
    language() {
      return this.$store.getters.language
    }
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      this.lang = lang
      this.$store.dispatch('app/setLanguage', lang)
      // this.$message({
      //   message: 'Switch Language Success',
      //   type: 'success'
      // })
    }
  }
}
</script>
