<template>
  <div class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">小吴外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;"
             :class="{on:showLogin}"
             @click="showLogin = true">短信登录</a>
          <a href="javascript:;"
             :class="{on:!showLogin}"
             @click="showLogin = false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{on:showLogin}">
            <div class="login_message">
              <input type="tel"
                     maxlength="11"
                     placeholder="手机号"
                     v-model="phone">
              <button :disabled="!rightPhone"
                      class="get_verification"
                      :class="{right_phone:rightPhone}"
                      @click.prevent="getCode">{{text}}</button>
            </div>
            <div class="login_verification">
              <input type="tel"
                     maxlength="8"
                     placeholder="验证码"
                     v-model="code">
            </div>
            <div class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </div>
          </div>
          <div :class="{on:!showLogin}">
            <div>
              <div class="login_message">
                <input type="text"
                       maxlength="11"
                       placeholder="手机/邮箱/用户名"
                       v-model='name'>
              </div>
              <div class="login_verification">
                <input type="text"
                       maxlength="8"
                       placeholder="密码"
                       v-model="pwd"
                       v-if="isShowPwd">
                <input type="password"
                       maxlength="8"
                       placeholder="密码"
                       v-model="pwd"
                       v-else>
                <div class="switch_button "
                     :class="isShowPwd?'on':'off'"
                     @click="isShowPwd = !isShowPwd">
                  <div class="switch_circle"
                       :class="{right:isShowPwd}"></div>
                  <span class="switch_text">{{isShowPwd?'abc':'...'}}</span>
                </div>
              </div>
              <div class="login_message">
                <input type="text"
                       maxlength="11"
                       placeholder="验证码"
                       v-model="captcha">
                <img class="get_verification"
                     src="http://localhost:4000/captcha?time"
                     @click="getCaptcha"
                     ref="captcha"
                     alt="captcha">
              </div>
            </div>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;"
           class="about_us">关于我们</a>
      </div>
      <a href="javascript:"
         @click="$router.back()"
         class="go_back">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
    <AlterTip :alertText="alertText"
              v-show="alterShow"
              @closeTip="closeTip" />
  </div>
</template>
<script>
import AlterTip from '../../components/AlterTip/altertip.vue'
import { reqSendCode, reqPwdLogin, reqSmsLogin } from '../../api'
export default {
  data () {
    return {
      showLogin: false, // true为短信登录 false为密码登录
      isShowPwd: false, // 是否显示密码 false不显示密码 true显示密码
      // 验证码部分的常量
      count: 30,
      text: '获取验证码',
      offTimer: '',
      phone: '', // 手机号的位数
      code: '', // 短信验证码
      pwd: '', // 密码
      name: '', // 账户名
      captcha: '', // 一次性验证码

      alertText: '', // 提示信息
      alterShow: false // 是否显示提示框
    }
  },
  methods: {
    // 手机登录验证码倒计时和提交验证码的方法
    async getCode () {
      // 按定时器ID的值判断是否可以点击
      if (!this.offTimer) {
        this.offTimer = setInterval(() => {
          this.text = '已发送 (' + --this.count + 's)'
          if (this.count <= 0) {
            this.text = '获取验证码'
            clearInterval(this.offTimer)
            // 为了30秒过后还可以点击，清空定时器ID
            this.offTimer = ''
          }
        }, 1000)
        // 发送ajax请求
        const result = await reqSendCode(this.phone)
        // 判断是否成功
        if (result.code === 1) { // 失败
          // 显示提示 并停止定时器
          this.showTip(result.msg)
          if (this.count) {
            // 时间清空 文字改变 停止定时器
            this.count = 0
            this.text = '获取验证码'
            clearInterval(this.offTimer)
            // 为了30秒过后还可以点击，清空定时器ID
            this.offTimer = ''
          }
        }
      }
    },
    // 登录验证
    async login () {
      let result
      // 先判断是什么方式登录方式
      if (this.showLogin) { // 短信登录
        const { rightPhone, phone, code } = this
        // 判断信息是否合法
        if (!rightPhone) {
          // 手机号不正确
          this.showTip('手机号格式不正确')
          return
        } else if (!/^\d{6}$/.test(code)) {
          // 验证码必须是六位数
          this.showTip('验证码必须是六位数')
          return
        }
        // 异步发送ajax请求短信登录
        result = await reqSmsLogin(phone, code)
      } else { // 账号密码登录
        const { pwd, name, captcha } = this
        if (!name) {
          // 用户名必须指定
          this.showTip('用户名必须指定')
          return
        } else if (!pwd) {
          // 密码必须指定
          this.showTip('密码必须指定')
          return
        } else if (!captcha) {
          // 图形验证码必须指定
          this.showTip('图形验证码必须指定')
          return
        }
        // 异步发送ajax请求账号密码登录
        result = await reqPwdLogin({ pwd, name, captcha })
      }
      // 登录过去后也要停止计时
      if (this.count) {
        // 时间清空 文字改变 停止定时器
        this.count = 0
        this.text = '获取验证码'
        clearInterval(this.offTimer)
        // 为了30秒过后还可以点击，清空定时器ID
        this.offTimer = ''
      }
      if (result.code === 0) { // 登录成功
        // 用户信息保存到vuex总的state中
        const user = result.data
        this.$store.dispatch('syncUserinfo', user)
        // 跳转到个人中心
        this.$router.replace('/profile')
      } else { // 登录失败
        this.showTip(result.msg)// 提示失败
        // 登录失败后再次刷新一次性验证码
        this.getCaptcha()
      }
    },
    // 关闭提示信息
    closeTip () {
      this.showTip('', false)
    },
    // 显示弹窗和文字
    showTip (text, show = true) {
      this.alterShow = show
      this.alertText = text
    },
    // 切换一次性验证码
    getCaptcha () {
      this.$refs.captcha.src = 'http://localhost:4000/captcha?time' + Date.now()
    }
  },
  computed: {
    // 手机正则验证
    rightPhone () {
      return (/^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/).test(this.phone)
    }
  },
  components: {
    AlterTip
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus'>
@import '../../common/stylus/mixins.styl';

.loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;

  .loginInner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;

    .login_header {
      .login_logo {
        font-size: 40px;
        font-weight: bold;
        color: #02a774;
        text-align: center;
      }

      .login_header_title {
        padding-top: 40px;
        text-align: center;

        >a {
          color: #333;
          font-size: 14px;
          padding-bottom: 4px;

          &:first-child {
            margin-right: 40px;
          }

          &.on {
            color: #02a774;
            font-weight: 700;
            border-bottom: 2px solid #02a774;
          }
        }
      }
    }

    .login_content {
      >form {
        >div {
          display: none;

          &.on {
            display: block;
          }

          input {
            width: 100%;
            height: 100%;
            padding-left: 10px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;

            &:focus {
              border: 1px solid #02a774;
            }
          }

          .login_message {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .get_verification {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 14px;
              background: transparent;

              &.right_phone {
                color: black;
              }
            }
          }

          .login_verification {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .switch_button {
              font-size: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              transition: background-color 0.3s, border-color 0.3s;
              padding: 0 6px;
              width: 30px;
              height: 16px;
              line-height: 16px;
              color: #fff;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);

              &.off {
                background: #fff;

                .switch_text {
                  float: right;
                  color: #ddd;
                }
              }

              &.on {
                background: #02a774;
              }

              >.switch_circle {
                position: absolute;
                top: -1px;
                left: -1px;
                width: 16px;
                height: 16px;
                border: 1px solid #ddd;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                transition: transform 0.3s;

                &.right {
                  transform: translateX(30px);
                }
              }
            }
          }

          .login_hint {
            margin-top: 12px;
            color: #999;
            font-size: 14px;
            line-height: 20px;

            >a {
              color: #02a774;
            }
          }
        }

        .login_submit {
          display: block;
          width: 100%;
          height: 42px;
          margin-top: 30px;
          border-radius: 4px;
          background: #4cd96f;
          color: #fff;
          text-align: center;
          font-size: 16px;
          line-height: 42px;
          border: 0;
        }
      }

      .about_us {
        display: block;
        font-size: 12px;
        margin-top: 20px;
        text-align: center;
        color: #999;
      }
    }

    .go_back {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 30px;
      height: 30px;

      >.iconfont {
        font-size: 20px;
        color: #999;
      }
    }
  }
}
</style>
