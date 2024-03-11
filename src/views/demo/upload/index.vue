<template>
  <CommonPage title="简历上传">
    <template #action>
      <n-button type="primary">
        <i class="i-material-symbols:add mr-4 text-18" />
        手动创建简历
      </n-button>
    </template>
    <n-upload
      class="mx-auto w-[75%] p-20 text-center"
      :custom-request="handleUpload"
      :show-file-list="false"
      accept=".pdf,.docx,.doc"
      @before-upload="onBeforeUpload"
    >
      <n-upload-dragger>
        <div class="h-150 f-c-c flex-col">
          <i class="i-mdi:upload mb-12 text-68 color-primary" />
          <n-text class="text-24 color-gray">点击或者拖动文件到该区域以上传简历文件</n-text>
          <n-text class="text-16 color-primary">支持简历格式：pdf,docx/doc</n-text>
        </div>
      </n-upload-dragger>
    </n-upload>

    <MeCrud
      :is-pagination="false"
      :columns="columns"
      :my-data="myData"
      v-model:query-items="queryItems"
    >
      <MeQueryItem label="文件名称" :label-width="80">
        <n-input
          v-model:value="queryItems.username"
          type="text"
          placeholder="请输入文件名称"
          clearable
        />
      </MeQueryItem>

      <MeQueryItem label="简历状态" :label-width="80">
        <n-select
          v-model:value="queryItems.enable"
          clearable
          :options="[
            { label: '待解析', value: 0 },
            { label: '解析成功', value: 1 },
            { label: '解析出错', value: 2 },
          ]"
        />
      </MeQueryItem>
    </MeCrud>

  </CommonPage>
</template>

<script setup>
import { useClipboard } from '@vueuse/core'
import { CommonPage } from '@/components/index.js'
import { NAvatar, NButton, NSwitch, NTag } from 'naive-ui'
import { formatDateTime } from '@/utils'
import { MeCrud, MeQueryItem, MeModal } from '@/components'
import { useCrud } from '@/composables'

defineOptions({ name: 'ImgUpload' })

const { copy, copied } = useClipboard()

const resumeList = reactive([

])

/** QueryBar筛选参数（可选） */
const queryItems = ref({})

const myData = [
  {
    fileName: '张三的简历.pdf',
    fileSize: '150KB',
    createTime: '2023-04-01T12:34:56Z',
    enable: [
      { name: '待解析' },
    ],
  },
  {
    fileName: '李四的简历.docx',
    fileSize: '250KB',
    createTime: '2023-04-02T09:45:12Z',
    enable: [
      { name: '解析成功' },
    ],
  },
  {
    fileName: '王五的简历.doc',
    fileSize: '200KB',
    createTime: '2023-04-03T14:56:23Z',
    enable: [
      { name: '解析成功' },
    ],
  },
  {
    fileName: '赵六的简历.pdf',
    fileSize: '200KB',
    createTime: '2024-01-03T14:56:23Z',
    enable: [
      { name: '解析成功' },
    ],
  },
  {
    fileName: 'hello的简历.odt',
    fileSize: '200KB',
    createTime: '2023-04-03T14:56:23Z',
    enable: [
      { name: '解析出错' },
    ],
  },
  // ... 可以添加更多简历数据对象
];


const columns = [
  { title: '文件名称', key: 'fileName', width: 280, ellipsis: { tooltip: true } },
  { title: '文件大小', key: 'fileSize', width: 120, ellipsis: { tooltip: true } },
  {
    title: '创建时间',
    key: 'createDate',
    width: 280,
    render(row) {
      return h('span', formatDateTime(row['createTime']))
    },
  },
  {
    title: '简历状态',
    key: 'enable',
    width: 180,ellipsis: { tooltip: true },
    render: ({enable}) => {
      const typeMap = {
        '待解析': 'warning',
        '解析成功': 'success',
        '解析出错': 'error',
        // ... 其他role和type的映射
      };
      if (enable) {
        return enable.map((item,index) =>
          h(
            NTag,
            { type: typeMap[item.name], style: index > 0 ? 'margin-left: 8px;' : '' },
            { default: () => item.name }
          )
        )
      }
      return '暂无状态'
    },
  },
  {
    title: '操作',
    key: 'actions',
    width: 310,
    hideInExcel: true,
    render(row) {
      return [
        h(
          NButton,
          {
            size: 'small',
            type: 'primary',
            onClick: () => handleOpenRolesSet(row),
          },
          {
            default: () => '查看',
            icon: () => h('i', { class: 'i-carbon:view text-14' }),
          }
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'error',
            style: 'margin-left: 12px;',
            onClick: () => handleDelete(row.id),
          },
          {
            default: () => '删除',
            icon: () => h('i', { class: 'i-material-symbols:delete-outline text-14' }),
          }
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'info',
            style: 'margin-left: 12px;',
            onClick: () => handleOpen({ action: 'reset', title: '重置密码', row, onOk: onSave }),
          },
          {
            default: () => '解析',
            icon: () => h('i', { class: 'i-fe:slack text-14' }),
          }
        ),
      ]
    },
  },
]


watch(copied, (val) => {
  val && $message.success('已复制到剪切板')
})

function onBeforeUpload({ file }) {
  if (!file.file?.type.startsWith('')) {
    $message.error('该格式的简历暂不支持')
    return false
  }
  return true
}

async function handleUpload({ file, onFinish }) {
  if (!file || !file.type) {
    $message.error('请选择你的简历文件')
  }

  // 模拟上传
  $message.loading('简历上传中...')
  setTimeout(() => {
    $message.success('简历上传成功')
    resumeList.push({ fileName: file.name, url: URL.createObjectURL(file.file) })
    onFinish()
  }, 1500)
}
</script>
