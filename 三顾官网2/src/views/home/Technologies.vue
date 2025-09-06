<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">Our Technologies</h1>
      
      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">核心技术</h2>
        <p class="text-lg text-gray-700 leading-relaxed mb-6">
          SANGO AI拥有多项前沿技术，为船舶管理提供全面的智能解决方案。
        </p>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">技术优势</h2>
        <div class="space-y-6">
          <!-- 数字孪生 -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-xl font-semibold text-primary mb-3">数字孪生技术</h3>
            <p class="text-gray-700 mb-4">
              通过创建船舶的数字孪生模型，实现对船舶状态的实时监控和预测性维护。
            </p>
            <router-link to="/tech-advantage/digital-twin" class="text-secondary hover:text-secondary-dark font-medium inline-flex items-center">
              了解更多
              <svg class="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </router-link>
          </div>
          
          <!-- AI技术 -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-xl font-semibold text-primary mb-3">人工智能</h3>
            <p class="text-gray-700 mb-4">
              利用先进的AI算法分析船舶数据，预测设备故障，优化船舶运营效率。
            </p>
            <router-link to="/tech-advantage/ai" class="text-secondary hover:text-secondary-dark font-medium inline-flex items-center">
              了解更多
              <svg class="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </router-link>
          </div>
          
          <!-- AIoT技术 -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-xl font-semibold text-primary mb-3">AIoT</h3>
            <p class="text-gray-700 mb-4">
              结合AI和IoT技术，实现船舶设备的智能互联和自动化控制。
            </p>
            <router-link to="/tech-advantage/aiot" class="text-secondary hover:text-secondary-dark font-medium inline-flex items-center">
              了解更多
              <svg class="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </router-link>
          </div>
          
          <!-- 大数据技术 -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-xl font-semibold text-primary mb-3">大数据分析</h3>
            <p class="text-gray-700 mb-4">
              通过大数据分析技术，挖掘船舶运营数据的价值，为决策提供支持。
            </p>
            <router-link to="/tech-advantage/big-data" class="text-secondary hover:text-secondary-dark font-medium inline-flex items-center">
              了解更多
              <svg class="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </router-link>
          </div>
        </div>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">技术创新</h2>
        <div class="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <p class="text-gray-700 mb-4">
            SANGO AI持续投入研发，不断推出创新技术，引领船舶管理技术的发展方向。我们的研发团队由行业顶尖专家组成，致力于解决船舶管理中的关键技术难题。
          </p>
          <p class="text-gray-700">
            我们拥有多项专利技术，并与全球知名高校和研究机构合作，共同推动船舶智能化管理技术的进步。
          </p>
        </div>
      </section>
    </div>
  </div>
</template>