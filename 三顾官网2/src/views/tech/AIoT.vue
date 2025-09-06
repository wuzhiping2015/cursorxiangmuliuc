<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">AIoT技术</h1>
      
      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">技术概述</h2>
        <p class="text-lg text-gray-700 leading-relaxed mb-6">
          三顾海事的AIoT技术将人工智能(AI)与物联网(IoT)深度融合，创造智能感知、分析和决策一体化的船舶管理系统。通过在船舶各关键设备上部署智能传感器，实现设备互联互通，同时运用AI算法对采集的数据进行深度分析，为船舶操作和维护提供智能支持。
        </p>
        <div class="w-full h-64 bg-gray-300 rounded-lg flex items-center justify-center mb-6">
          <span class="text-gray-600 text-xl">AIoT技术图片</span>
        </div>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">核心技术组件</h2>
        <div class="space-y-6">
          <div class="bg-white rounded-lg shadow overflow-hidden">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg leading-6 font-medium text-primary">智能传感网络</h3>
              <div class="mt-2 max-w-xl text-sm text-gray-500">
                <p>基于先进的MEMS技术和低功耗微处理器的海事专用传感器系统，支持振动、温度、压力、流量等多物理量监测，确保在恶劣环境下的稳定运行。</p>
              </div>
              <div class="mt-3 text-sm">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-light text-gray-800">
                  测量精度±0.1%
                </span>
                <span class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-light text-gray-800">
                  电池寿命3年+
                </span>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-lg shadow overflow-hidden">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg leading-6 font-medium text-primary">边缘计算平台</h3>
              <div class="mt-2 max-w-xl text-sm text-gray-500">
                <p>船舶本地部署的高性能边缘计算系统，支持数据预处理和实时分析，减少带宽需求并提供离线计算能力，确保网络断连时系统仍能高效运行。</p>
              </div>
              <div class="mt-3 text-sm">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-light text-primary-dark">
                  处理能力5TOPS
                </span>
                <span class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-light text-primary-dark">
                  功耗&lt;20W
                </span>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-lg shadow overflow-hidden">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg leading-6 font-medium text-primary">船岸一体化通信</h3>
              <div class="mt-2 max-w-xl text-sm text-gray-500">
                <p>多通道通信系统，支持卫星、4G/5G、WiFi等多种通信方式，自动选择最优通信链路，实现船岸数据实时同步，保障信息流畅通。</p>
              </div>
              <div class="mt-3 text-sm">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-light text-primary-dark">
                  传输加密AES-256
                </span>
                <span class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-light text-primary-dark">
                  通信可靠性99.9%
                </span>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-lg shadow overflow-hidden">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg leading-6 font-medium text-primary">云端协同分析平台</h3>
              <div class="mt-2 max-w-xl text-sm text-gray-500">
                <p>基于云计算架构的大规模数据处理平台，整合船队级数据，进行跨船分析和模式识别，提供全局优化建议，支持海事大数据挖掘。</p>
              </div>
              <div class="mt-3 text-sm">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-light text-primary-dark">
                  PB级数据分析能力
                </span>
                <span class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-light text-primary-dark">
                  弹性扩展架构
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">应用场景</h2>
        <div class="bg-white shadow overflow-hidden sm:rounded-lg p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <svg class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div class="ml-3">
                  <h3 class="text-lg font-medium text-primary">智能设备健康管理</h3>
                  <p class="mt-2 text-sm text-gray-600">
                    通过传感器实时监测设备运行状态，AI算法分析性能变化趋势，提前预警潜在问题，优化维护计划，避免计划外停机。
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <svg class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div class="ml-3">
                  <h3 class="text-lg font-medium text-primary">智能能源管理</h3>
                  <p class="mt-2 text-sm text-gray-600">
                    基于多源传感器数据和AI分析，实时监控船舶能耗，智能调节能源分配，优化发电机组负载，降低燃油消耗和碳排放。
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <svg class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div class="ml-3">
                  <h3 class="text-lg font-medium text-primary">船舶环境监控</h3>
                  <p class="mt-2 text-sm text-gray-600">
                    综合传感网络监测船舶环境参数，包括气温、湿度、气体浓度等，保障船员健康和货物安全，预防火灾和环境污染风险。
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <svg class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <div class="ml-3">
                  <h3 class="text-lg font-medium text-primary">远程操控与协作</h3>
                  <p class="mt-2 text-sm text-gray-600">
                    通过AIoT网络实现设备远程监控和操作，支持专家远程诊断和技术指导，减少船岸人员差旅，提高问题解决效率。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">技术指标</h2>
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
            <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">传感器数量</dt>
                <dd class="mt-1 text-sm text-gray-900">单船500-2000个节点</dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">数据采集频率</dt>
                <dd class="mt-1 text-sm text-gray-900">最快10ms/次，可配置</dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">网络稳定性</dt>
                <dd class="mt-1 text-sm text-gray-900">丢包率&lt;0.01%，自愈能力</dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">通信距离</dt>
                <dd class="mt-1 text-sm text-gray-900">船内100m+ (无障碍)，全球船岸连接</dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">系统可靠性</dt>
                <dd class="mt-1 text-sm text-gray-900">MTBF>50,000小时</dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">电池寿命</dt>
                <dd class="mt-1 text-sm text-gray-900">无线传感器3-5年</dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">安全认证</dt>
                <dd class="mt-1 text-sm text-gray-900">IMO/ISPS/ISO27001/GDPR兼容</dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">防护等级</dt>
                <dd class="mt-1 text-sm text-gray-900">IP66/IP67/ATEX防爆(适用区域)</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <div class="mt-8 flex justify-center">
        <router-link
          to="/contact/form"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          了解AIoT解决方案
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// 组件逻辑
</script>

<style scoped>
/* 组件样式 */
</style>