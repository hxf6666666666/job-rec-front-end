<script setup>

const title = ref("网络工程师")
const exp = ref('3年以上')
const edu = ref('大专')
const city = ref('北京')
const type1 = ref('全职')
const zhaopinzhe = ref('刘女士')
const company = ref('汉博利特（北京）信息技术有限公司')
const address = ref('北京通州区金融街园中园6号院53号楼')
const skills = ref(['网络安全', '调试', 'VPN'])
const knowledges = ref(['云计算', '计算机', 'VPN'])
const characters = ref(['积极', '学习能力', '沟通', '分析', '团队', '合作', '抗压', '热情'])
</script>

<template>
  <div class="flex" style="width: 1000px">
    <n-card :title="title" size="small" class="mt-20 w-[100%]" embedded hoverable>
      <template #header-extra>
        <n-rate size="large" count="1" clearable/>
      </template>
      <n-list hoverable clickable>
        <n-list-item>
          <n-space align="center" class="mb-12">
            <div class="items-center">
              <span class="text-18 color-error">12-20K</span>
              <span class="text-18 ml-12">
                  <n-tag :bordered="false">
                    {{ exp }}
                  </n-tag>
                </span>
              <span class="text-18 ml-12">
                  <n-tag :bordered="false">
                    {{ edu }}
                  </n-tag>
                </span>
              <span class="text-18 ml-12">
                  <n-tag :bordered="false" type="success">
                    {{ city }}
                  </n-tag>
                </span>
              <span class="text-18 ml-12">
                  <n-tag :bordered="false" type="info">
                    {{ type1 }}
                  </n-tag>
                 </span>
            </div>
          </n-space>

          <n-space align="center" class="mb-12">
            <div class="items-center">
              <n-tag v-for="skill in skills" :bordered="false" class="mr-4" round size="small" type="success">
                {{ skill }}
              </n-tag>
              <n-tag v-for="knowledge in knowledges" :bordered="false" class="mr-4" round size="small" type="warning">
                {{ knowledge }}
              </n-tag>
              <n-tag v-for="character in characters" :bordered="false" class="mr-4" round size="small" type="error">
                {{ character }}
              </n-tag>
            </div>
          </n-space>

          <n-space align="center">
            <img alt="" object-contain size="45" src="/src/assets/images/logo.png" />
            <div class="ml-20">
              <div class="items-center">
                <span class="text-16 mr-12">{{ company }}</span>
                <span class="text-14">{{ zhaopinzhe }}</span>
                <p class="opacity-60">{{ address }}</p>
              </div>
            </div>
          </n-space>
        </n-list-item>
      </n-list>
    </n-card>
  </div>
</template>

<style scoped>

</style>
