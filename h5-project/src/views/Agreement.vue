<template>
  <div class="agreement-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <button class="back-btn" @click="goBack">←</button>
      <h1 class="page-title">{{ pageTitle }}</h1>
      <div class="header-placeholder"></div>
    </div>
    
    <!-- 协议类型切换 -->
    <div class="agreement-tabs">
      <button
        v-for="tab in agreementTabs"
        :key="tab.key"
        :class="['tab-btn', { active: currentType === tab.key }]"
        @click="switchType(tab.key)"
      >
        {{ tab.label }}
      </button>
    </div>
    
    <!-- 协议内容 -->
    <div class="agreement-content">
      <div class="content-header">
        <h2 class="content-title">{{ contentTitle }}</h2>
        <div class="content-meta">
          <span class="update-time">更新时间：{{ updateTime }}</span>
          <span class="version">版本：{{ version }}</span>
        </div>
      </div>
      
      <div class="content-body">
        <!-- 用户协议内容 -->
        <div v-if="currentType === 'user'" class="agreement-text">
          <section class="section">
            <h3 class="section-title">一、总则</h3>
            <div class="section-content">
              <p>1.1 本协议是您与邀请拉新平台（以下简称"本平台"）之间关于使用本平台服务的法律协议。</p>
              <p>1.2 本平台提供基于互联网的邀请拉新服务，用户通过邀请他人注册可获得相应奖励。</p>
              <p>1.3 用户在使用本平台服务前，应当认真阅读并同意本协议的全部条款。</p>
              <p>1.4 本平台有权根据需要修改本协议条款，修改后的协议将在平台上公布。</p>
            </div>
          </section>
          
          <section class="section">
            <h3 class="section-title">二、用户注册与账户</h3>
            <div class="section-content">
              <p>2.1 用户需要使用真实有效的手机号码进行注册。</p>
              <p>2.2 用户应当保证所提供的注册信息真实、准确、完整、有效。</p>
              <p>2.3 用户有义务维护账户和密码的安全性，不得将账户借给他人使用。</p>
              <p>2.4 用户发现账户被他人非法使用时，应当立即通知本平台。</p>
              <p>2.5 每个手机号只能注册一个账户，不得重复注册。</p>
            </div>
          </section>
          
          <section class="section">
            <h3 class="section-title">三、邀请服务规则</h3>
            <div class="section-content">
              <p>3.1 用户可通过分享邀请链接或邀请码的形式邀请他人注册。</p>
              <p>3.2 被邀请人必须通过邀请人的专属链接或邀请码完成注册才算有效邀请。</p>
              <p>3.3 邀请奖励将在被邀请人完成注册和实名认证后发放。</p>
              <p>3.4 本平台有权审核邀请的有效性，对于虚假邀请不予认定。</p>
              <p>3.5 用户不得通过技术手段或其他非正当方式进行虚假邀请。</p>
            </div>
          </section>
          
          <section class="section">
            <h3 class="section-title">四、奖励制度</h3>
            <div class="section-content">
              <p>4.1 邀请奖励的具体金额和发放规则以平台公布的最新规则为准。</p>
              <p>4.2 奖励金额将发放到用户的平台账户中，可申请提现。</p>
              <p>4.3 提现需要满足平台规定的最低提现金额要求。</p>
              <p>4.4 本平台有权调整奖励制度，调整后的制度将提前公告。</p>
              <p>4.5 对于违规获得的奖励，本平台有权追回并可能暂停用户账户。</p>
            </div>
          </section>
          
          <section class="section">
            <h3 class="section-title">五、用户行为规范</h3>
            <div class="section-content">
              <p>5.1 用户应当遵守国家法律法规和本协议约定。</p>
              <p>5.2 禁止用户从事以下行为：</p>
              <ul class="list">
                <li>发布虚假信息或恶意传播不实内容</li>
                <li>使用技术手段进行虚假注册或邀请</li>
                <li>恶意攻击或破坏平台系统</li>
                <li>侵犯他人知识产权或合法权益</li>
                <li>进行任何违法违规活动</li>
              </ul>
              <p>5.3 用户违反上述规定的，本平台有权采取相应措施，包括但不限于警告、暂停服务、终止协议等。</p>
            </div>
          </section>
          
          <section class="section">
            <h3 class="section-title">六、平台权利与义务</h3>
            <div class="section-content">
              <p>6.1 本平台有权对用户的邀请行为进行审核和监管。</p>
              <p>6.2 本平台承诺保护用户的合法权益，按照约定发放邀请奖励。</p>
              <p>6.3 本平台有权根据业务需要调整服务内容和规则。</p>
              <p>6.4 本平台有权暂停或终止对违规用户的服务。</p>
              <p>6.5 本平台将采取合理措施保护用户信息安全。</p>
            </div>
          </section>
          
          <section class="section">
            <h3 class="section-title">七、免责声明</h3>
            <div class="section-content">
              <p>7.1 本平台不对因不可抗力导致的服务中断承担责任。</p>
              <p>7.2 用户因违规行为导致的损失由用户自行承担。</p>
              <p>7.3 本平台不对第三方网站或服务的内容承担责任。</p>
              <p>7.4 用户理解并同意使用本服务的风险由用户个人承担。</p>
            </div>
          </section>
          
          <section class="section">
            <h3 class="section-title">八、协议修改与终止</h3>
            <div class="section-content">
              <p>8.1 本平台有权根据需要修改本协议，修改后的协议将在平台公布。</p>
              <p>8.2 用户继续使用服务即表示同意修改后的协议。</p>
              <p>8.3 用户可以随时停止使用服务并注销账户。</p>
              <p>8.4 本协议终止后，双方在协议项下的权利义务同时终止。</p>
            </div>
          </section>
          
          <section class="section">
            <h3 class="section-title">九、争议解决</h3>
            <div class="section-content">
              <p>9.1 本协议的签订、履行、解释及争议解决均适用中华人民共和国法律。</p>
              <p>9.2 因本协议产生的争议，双方应首先通过友好协商解决。</p>
              <p>9.3 协商不成的，任何一方均可向本平台所在地人民法院提起诉讼。</p>
            </div>
          </section>
          
          <section class="section">
            <h3 class="section-title">十、其他条款</h3>
            <div class="section-content">
              <p>10.1 本协议构成双方就相关事宜的完整协议。</p>
              <p>10.2 本协议部分条款无效不影响其他条款的效力。</p>
              <p>10.3 本协议的最终解释权归本平台所有。</p>
            </div>
          </section>
        </div>
        
        <!-- 隐私政策内容 -->
        <div v-if="currentType === 'privacy'" class="agreement-text">
          <section class="section">
            <h3 class="section-title">一、概述</h3>
            <div class="section-content">
              <p>1.1 邀请拉新平台（以下简称"我们"）非常重视用户隐私保护。</p>
              <p>1.2 本隐私政策说明我们如何收集、使用、存储和保护您的个人信息。</p>
              <p>1.3 请您仔细阅读本隐私政策，确保充分理解和同意后再使用我们的服务。</p>
              <p>1.4 本政策适用于我们提供的所有服务。</p>
            </div>
          </section>
          
          <section class="section">
            <h3 class="section-title">二、信息收集</h3>
            <div class="section-content">
              <p>2.1 我们收集的信息类型包括：</p>
              <ul class="list">
                <li><strong>注册信息：</strong>手机号码、验证码等注册必需信息</li>
                <li><strong>身份信息：</strong>实名认证所需的姓名、身份证号等</li>
                <li><strong>设备信息：</strong>设备型号、操作系统、IP地址等</li>
                <li><strong>使用信息：</strong>邀请记录、奖励记录、操作日志等</li>
                <li><strong>位置信息：</strong>基于IP的大致位置信息</li>
              </ul>
              <p>2.2 我们通过以下方式收集信息：</p>
              <ul class="list">
                <li>您主动提供的信息</li>
                <li>我们在您使用服务时自动收集的信息</li>
                <li>从合法第三方获得的信息</li>
              </ul>
            </div>
          </section>
          
          <section class="section">
            <h3 class="section-title">三、信息使用</h3>
            <div class="section-content">
              <p>3.1 我们使用收集的信息用于：</p>
              <ul class="list">
                <li>提供和维护我们的服务</li>
                <li>处理您的邀请和奖励申请</li>
                <li>防范安全风险和欺诈行为</li>
                <li>改进和优化我们的服务</li>
                <li>遵守法律法规要求</li>
                <li>与您沟通服务相关事宜</li>
              </ul>
              <p>3.2 我们不会将您的个人信息用于本政策未说明的用途。</p>
              <p>3.3 如需将信息用于新的用途，我们会事先征得您的同意。</p>
            </div>
          </section>
          
          <section class="section">
            <h3 class="section-title">四、信息共享</h3>
            <div class="section-content">
              <p>4.1 我们不会向第三方出售、出租或交易您的个人信息。</p>
              <p>4.2 在以下情况下，我们可能会共享您的信息：</p>
              <ul class="list">
                <li>获得您的明确同意</li>
                <li>法律法规要求或司法机关要求</li>
                <li>为保护我们或他人的合法权益</li>
                <li>与我们的服务提供商共享（如支付机构）</li>
              </ul>
              <p>4.3 我们会要求第三方严格遵守保密义务。</p>
            </div>
          </section>
          
          <section class="section">
            <h3 class="section-title">五、信息存储</h3>
            <div class="section-content">
              <p>5.1 我们将在中华人民共和国境内存储您的个人信息。</p>
              <p>5.2 我们只在实现本政策所述目的所需的期间内保留您的信息。</p>
              <p>5.3 信息保存期限：</p>
              <ul class="list">
                <li>账户信息：账户存续期间</li>
                <li>交易记录：交易完成后5年</li>
                <li>日志信息：180天</li>
                <li>其他信息：按法律法规要求保存</li>
              </ul>
            </div>
          </section>
          
          <section class="section">
            <h3 class="section-title">六、信息安全</h3>
            <div class="section-content">
              <p>6.1 我们采用行业标准的安全措施保护您的信息：</p>
              <ul class="list">
                <li>数据传输加密（HTTPS/SSL）</li>
                <li>数据存储加密</li>
                <li>访问权限控制</li>
                <li>安全审计和监控</li>
                <li>员工保密培训</li>
              </ul>
              <p>6.2 我们会定期评估和更新安全措施。</p>
              <p>6.3 尽管如此，请您理解没有任何安全措施是绝对完美的。</p>
            </div>
          </section>
          
          <section class="section">
            <h3 class="section-title">七、您的权利</h3>
            <div class="section-content">
              <p>7.1 您对自己的个人信息享有以下权利：</p>
              <ul class="list">
                <li><strong>访问权：</strong>查看我们持有的您的个人信息</li>
                <li><strong>更正权：</strong>要求更正错误或不完整的信息</li>
                <li><strong>删除权：</strong>要求删除您的个人信息</li>
                <li><strong>限制权：</strong>要求限制对您信息的处理</li>
                <li><strong>撤回权：</strong>撤回您此前给予的同意</li>
              </ul>
              <p>7.2 您可以通过以下方式行使上述权利：</p>
              <ul class="list">
                <li>在应用内的设置页面操作</li>
                <li>联系我们的客服</li>
                <li>发送邮件至我们的隐私邮箱</li>
              </ul>
            </div>
          </section>
          
          <section class="section">
            <h3 class="section-title">八、Cookie和类似技术</h3>
            <div class="section-content">
              <p>8.1 我们使用Cookie和类似技术来：</p>
              <ul class="list">
                <li>记住您的登录状态</li>
                <li>改善用户体验</li>
                <li>分析服务使用情况</li>
                <li>防范安全风险</li>
              </ul>
              <p>8.2 您可以通过浏览器设置控制Cookie的使用。</p>
              <p>8.3 禁用Cookie可能会影响某些功能的正常使用。</p>
            </div>
          </section>
          
          <section class="section">
            <h3 class="section-title">九、第三方服务</h3>
            <div class="section-content">
              <p>9.1 我们的服务可能包含第三方链接或集成第三方服务。</p>
              <p>9.2 第三方服务有自己的隐私政策，我们不对其隐私做法负责。</p>
              <p>9.3 我们建议您阅读第三方的隐私政策。</p>
            </div>
          </section>
          
          <section class="section">
            <h3 class="section-title">十、政策更新</h3>
            <div class="section-content">
              <p>10.1 我们可能会不时更新本隐私政策。</p>
              <p>10.2 重大变更会通过显著方式通知您。</p>
              <p>10.3 继续使用服务即表示您同意更新后的政策。</p>
            </div>
          </section>
          
          <section class="section">
            <h3 class="section-title">十一、联系我们</h3>
            <div class="section-content">
              <p>11.1 如您对本政策有任何疑问，可通过以下方式联系我们：</p>
              <ul class="list">
                <li>客服热线：400-000-0000</li>
                <li>客服邮箱：privacy@example.com</li>
                <li>通信地址：XX省XX市XX区XX路XX号</li>
              </ul>
              <p>11.2 我们将在30天内回复您的咨询。</p>
            </div>
          </section>
        </div>
      </div>
    </div>
    
    <!-- 同意按钮（如果是从注册页面跳转） -->
    <div v-if="showAgreeButton" class="agree-section">
      <button class="agree-btn" @click="handleAgree">
        我已阅读并同意本协议
      </button>
    </div>
  </div>
</template>

<script setup>
/**
 * 协议页面
 * 显示用户协议和隐私政策内容
 * @author 前端工程师团队
 * @date 2024-12-XX
 */
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

// 路由
const router = useRouter()
const route = useRoute()

// 响应式数据
const currentType = ref('user')
const updateTime = ref('2024-12-15')
const version = ref('v1.0')

// 协议类型配置
const agreementTabs = [
  { key: 'user', label: '用户协议' },
  { key: 'privacy', label: '隐私政策' }
]

// 计算属性
const pageTitle = computed(() => {
  return currentType.value === 'user' ? '用户协议' : '隐私政策'
})

const contentTitle = computed(() => {
  return currentType.value === 'user' ? '邀请拉新平台用户服务协议' : '邀请拉新平台隐私保护政策'
})

const showAgreeButton = computed(() => {
  // 如果是从注册页面跳转过来的，显示同意按钮
  return route.query.from === 'register'
})

/**
 * 切换协议类型
 * @param {string} type 协议类型
 */
const switchType = (type) => {
  currentType.value = type
  // 滚动到顶部
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

/**
 * 处理同意协议
 */
const handleAgree = () => {
  // 返回注册页面并传递同意状态
  router.back()
}

/**
 * 返回上一页
 */
const goBack = () => {
  router.back()
}

// 生命周期
onMounted(() => {
  console.log('📄 协议页面初始化')
  
  // 根据URL参数设置默认显示的协议类型
  const type = route.query.type
  if (type && ['user', 'privacy'].includes(type)) {
    currentType.value = type
  }
})
</script>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;
@use "@/assets/styles/mixins.scss" as *;

.agreement-page {
  min-height: 100vh;
  background-color: $background-color-light;
  padding-bottom: $spacing-xl;
}

// 页面头部
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $spacing-base;
  background-color: $background-color;
  border-bottom: 1px solid $border-color-light;
  position: sticky;
  top: 0;
  z-index: 10;
  
  .back-btn {
    width: 40px;
    height: 40px;
    border: none;
    background: none;
    font-size: $font-size-xl;
    color: $text-color-primary;
    cursor: pointer;
    @include transition(color);
    
    &:hover {
      color: $primary-color;
    }
  }
  
  .page-title {
    font-size: $font-size-lg;
    font-weight: $font-weight-medium;
    color: $text-color-primary;
  }
  
  .header-placeholder {
    width: 40px;
  }
}

// 协议类型标签
.agreement-tabs {
  display: flex;
  margin: $spacing-base;
  background-color: $background-color;
  border-radius: $border-radius-lg;
  padding: $spacing-xs;
  box-shadow: $box-shadow-base;
}

.tab-btn {
  flex: 1;
  padding: $spacing-sm;
  border: none;
  border-radius: $border-radius-base;
  background: none;
  color: $text-color-secondary;
  font-size: $font-size-base;
  font-weight: $font-weight-medium;
  cursor: pointer;
  @include transition(all);
  
  &:hover {
    background-color: $background-color-light;
  }
  
  &.active {
    background-color: $primary-color;
    color: white;
  }
}

// 协议内容
.agreement-content {
  margin: 0 $spacing-base $spacing-base;
  background-color: $background-color;
  border-radius: $border-radius-lg;
  overflow: hidden;
  box-shadow: $box-shadow-base;
}

.content-header {
  padding: $spacing-lg;
  background: linear-gradient(135deg, $primary-color, $primary-light);
  color: white;
  text-align: center;
  
  .content-title {
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    margin-bottom: $spacing-base;
  }
  
  .content-meta {
    display: flex;
    justify-content: center;
    gap: $spacing-lg;
    font-size: $font-size-sm;
    opacity: 0.9;
  }
}

.content-body {
  padding: $spacing-lg;
}

// 协议文本样式
.agreement-text {
  line-height: $line-height-lg;
  
  .section {
    margin-bottom: $spacing-xl;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .section-title {
      font-size: $font-size-lg;
      font-weight: $font-weight-bold;
      color: $text-color-primary;
      margin-bottom: $spacing-base;
      padding-bottom: $spacing-sm;
      border-bottom: 2px solid $primary-color;
    }
    
    .section-content {
      p {
        font-size: $font-size-base;
        color: $text-color-secondary;
        line-height: $line-height-lg;
        margin-bottom: $spacing-base;
        
        &:last-child {
          margin-bottom: 0;
        }
        
        strong {
          color: $text-color-primary;
          font-weight: $font-weight-bold;
        }
      }
      
      .list {
        padding-left: $spacing-lg;
        margin-bottom: $spacing-base;
        
        li {
          font-size: $font-size-base;
          color: $text-color-secondary;
          line-height: $line-height-lg;
          margin-bottom: $spacing-sm;
          position: relative;
          
          &:last-child {
            margin-bottom: 0;
          }
          
          &::marker {
            color: $primary-color;
          }
          
          strong {
            color: $text-color-primary;
            font-weight: $font-weight-bold;
          }
        }
      }
    }
  }
}

// 同意按钮
.agree-section {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: $spacing-base;
  background-color: $background-color;
  border-top: 1px solid $border-color-light;
  z-index: 10;
  
  .agree-btn {
    width: 100%;
    padding: $spacing-base;
    border: none;
    border-radius: $border-radius-lg;
    background-color: $primary-color;
    color: white;
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    cursor: pointer;
    @include transition(all);
    
    &:hover {
      background-color: $primary-dark;
      transform: translateY(-2px);
      box-shadow: $box-shadow-lg;
    }
  }
}

// 移动端适配
@include respond-to(xs) {
  .content-header {
    padding: $spacing-base;
    
    .content-title {
      font-size: $font-size-lg;
    }
    
    .content-meta {
      flex-direction: column;
      gap: $spacing-sm;
    }
  }
  
  .content-body {
    padding: $spacing-base;
  }
  
  .agreement-text {
    .section {
      .section-title {
        font-size: $font-size-base;
      }
      
      .section-content {
        p,
        .list li {
          font-size: $font-size-sm;
        }
      }
    }
  }
}

// 滚动条样式
.agreement-page {
  ::-webkit-scrollbar {
    width: 4px;
  }
  
  ::-webkit-scrollbar-track {
    background-color: $background-color-light;
  }
  
  ::-webkit-scrollbar-thumb {
    background-color: rgba($primary-color, 0.3);
    border-radius: 2px;
    
    &:hover {
      background-color: rgba($primary-color, 0.5);
    }
  }
}
</style>