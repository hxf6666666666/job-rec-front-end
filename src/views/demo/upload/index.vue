<template>
  <CommonPage title="简历上传">
    <template #action>
      <n-button type="info">
        <i class="i-material-symbols:add mr-4 text-18" />
        创建在线简历
      </n-button>
    </template>

    <n-upload
      class="mx-auto w-[60%] p-20 text-center"
      :custom-request="handleUpload"
      :show-file-list="false"
      accept=".pdf,.docx,.doc,.txt,.jpeg,.png"
      @before-upload="onBeforeUpload"
    >
      <n-upload-dragger>
        <div class="h-150 f-c-c flex-col">
          <i class="i-mdi:upload mb-12 text-68 color-primary" />
          <n-text class="text-24 font-extrabold color-neutral">点击或者拖动文件到该区域</n-text>
          <n-text class="text-16 color-primary">支持简历格式：PDF, DOC, DOCX, TXT, JPEG, PNG</n-text>
        </div>
      </n-upload-dragger>
    </n-upload>

    <MeCrud
      ref="$table"
      :is-pagination="false"
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

      <MeQueryItem label="简历状态" :label-width="80">
        <n-select
          v-model:value="queryItems.resumeStatus"
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
import api from './api'


defineOptions({ name: 'ImgUpload' })

const { copy, copied } = useClipboard()

const resumeList = reactive([

])

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
    title: '简历状态',
    key: 'resumeStatus',
    width: 180,
    ellipsis: { tooltip: true },
    render({ resumeStatus }) {
      const statusMap = {
        0: { text: '待解析', type: 'warning' },
        1: { text: '解析成功', type: 'success' },
        2: { text: '解析出错', type: 'error' },
      };
      const status = statusMap[resumeStatus];
      if (status) {
        return h(
          'div',
          {},
          [
            h(
              NTag,
              { type: status.type },
              { default: () => status.text }
            )
          ]
        );
      }
      return '暂无状态';
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
  if (
    !['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain', 'image/jpeg', 'image/png'].includes(file.type)) {
    $message.error('该格式的简历暂不支持');
    return false;
  }
  return true;
}


const {
  modalRef,
  modalFormRef,
  modalForm,
  modalAction,
  handleDelete,
  handleSave,
} = useCrud({
  name: '简历',
  initForm: {  },
  doDelete: api.delete,
  refresh: () => $table.value?.handleSearch(),
})


async function handleUpload({ file, onFinish }) {
  if (!file || !file.type) {
    $message.error('请选择你的简历文件')
  }

  let formData = new FormData();
  formData.append("file", file.file);

  try {
    // 发送文件到后端
    const response = await api.uploadResume(formData);

    // 处理后端返回的响应
    if (response.data) {
      $table.value?.handleSearch()
      $message.success(response.data);
      // 这里可以根据后端返回的数据更新页面的显示状态或者做其他操作
    } else {
      $message.error('上传失败');
    }
  } catch (error) {
    $message.error('上传失败：' + error.message);
  } finally {
    onFinish();
  }
}
</script>
