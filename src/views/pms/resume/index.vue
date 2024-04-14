<template>
  <CommonPage>
    <MeCrud
      ref="$table"
      :is-pagination="true"
      :columns="columns"
      v-model:query-items="queryItems"
      :get-data="api.read"
    >
      <MeQueryItem label="文件名称" :label-width="80">
        <n-input
          v-model:value="queryItems.fileName"
          type="text"
          placeholder="请输入文件名称"
          clearable
        />
      </MeQueryItem>

    </MeCrud>
  </CommonPage>
</template>

<script setup>
import { useClipboard } from '@vueuse/core'
import { CommonPage } from '@/components/index.js'
import { NButton, NTag } from 'naive-ui'
import { formatDateTime } from '@/utils'
import { MeCrud, MeQueryItem } from '@/components'
import { useCrud } from '@/composables'
import api from './api'


defineOptions({ name: 'ResumeMgt' })

const { copy, copied } = useClipboard()


const $table = ref(null)

/** QueryBar筛选参数（可选） */
const queryItems = ref({})

onMounted(() => {
  $table.value?.handleSearch()
})

const columns = [
  { title: '文件名称', key: 'fileName', width: 280, ellipsis: { tooltip: true } },
  {
    title: '文件大小',
    key: 'fileSize',
    width: 120,
    ellipsis: { tooltip: true },
    render(row) {
      const fileSizeInMB = row.fileSize / (1024 * 1024); // 将字节转换为 MB
      return fileSizeInMB.toFixed(2) + ' MB'; // 保留两位小数并添加单位 MB
    },
  },
  {
    title: '创建时间',
    key: 'uploadTime',
    width: 280,
    render(row) {
      return h('span', formatDateTime(row['uploadTime']))
    },
  },
  {
    title: '上传者ID（有时间再姓名）',
    key: 'employeeId',
    width: 180,
    ellipsis: { tooltip: true },
    render(row) {
      return h('span', row.employeeId);
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
            size: 'tiny',
            type: 'error',
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
            size: 'tiny',
            type: 'success',
            style: 'margin-left: 12px;',
          },
          {
            default: () => '查看',
            icon: () => h('i', { class: 'i-carbon:view text-14' }),
          }
        ),
      ];
    },
  },
]

watch(copied, (val) => {
  val && $message.success('已复制到剪切板')
})

const {
  modalRef,
  handleDelete,
} = useCrud({
  name: '简历',
  initForm: {  },
  doDelete: api.delete,
  refresh: () => $table.value?.handleSearch(),
})
</script>
