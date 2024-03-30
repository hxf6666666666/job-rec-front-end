<template>
  <CommonPage>
    <template #action>
      <n-button type="primary" @click="handleAdd()">
        <i class="i-material-symbols:add mr-4 text-18" />
        创建新用户
      </n-button>
    </template>

    <MeCrud
      ref="$table"
      v-model:query-items="queryItems"
      :scroll-x="1000"
      :columns="columns"
      :get-data="api.read"
    >
      <MeQueryItem label="用户名" :label-width="50">
        <n-input
          v-model:value="queryItems.userNickname"
          type="text"
          placeholder="请输入用户名"
          clearable
        />
      </MeQueryItem>

      <MeQueryItem label="角色" :label-width="50">
        <n-select
          v-model:value="queryItems.userRoleId"
          clearable
          :options="[
            { label: '管理员', value: 0 },
            { label: '招聘者', value: 1 },
            { label: '求职者', value: 2 }
          ]"
        />
      </MeQueryItem>

      <MeQueryItem label="状态" :label-width="50">
        <n-select
          v-model:value="queryItems.isDisabled"
          clearable
          :options="[
            { label: '启用', value: 0 },
            { label: '停用', value: 1 },
          ]"
        />
      </MeQueryItem>
    </MeCrud>

    <MeModal ref="modalRef" width="520px">
      <n-form
        ref="modalFormRef"
        label-placement="left"
        label-align="left"
        :label-width="80"
        :model="modalForm"
        :disabled="modalAction === 'view'"
      >
        <n-form-item
          label="用户名"
          path="userName"
          :rule="{
            required: true,
            message: '请输入用户名',
            trigger: ['input', 'blur'],
          }"
        >
          <n-input v-model:value="modalForm.userName" :disabled="modalAction !== 'add'" />
        </n-form-item>
        <n-form-item
          v-if="['add', 'reset'].includes(modalAction)"
          :label="modalAction === 'reset' ? '重置密码' : '初始密码'"
          path="userPassword"
          :rule="{
            required: true,
            message: '请输入密码',
            trigger: ['input', 'blur'],
          }"
        >
          <n-input v-model:value="modalForm.userPassword" />
        </n-form-item>

        <n-form-item :rule="{
            required: true,
            message: '请选择分配角色'
            }"
            v-if="['add', 'setRole'].includes(modalAction)" label="角色" path="userRole">
          <n-select
            v-model:value="modalForm.userRole"
            :options="[
                { label: '管理员', value: '管理员' },
                { label: '招聘者', value: '招聘者' },
                { label: '求职者', value: '求职者' }
            ]"
            clearable
            filterable
          />
        </n-form-item>

      </n-form>
      <n-alert v-if="modalAction === 'add'" type="warning" closable>
        详细信息（昵称、头像）需要由用户本人补充修改
      </n-alert>
    </MeModal>
  </CommonPage>
</template>

<script setup>
import { NAvatar, NButton, NSwitch, NTag } from 'naive-ui'
import { formatDateTime } from '@/utils'
import { MeCrud, MeQueryItem, MeModal } from '@/components'
import { useCrud } from '@/composables'
import api from './api'
import { CommonPage } from '@/components/index.js'

defineOptions({ name: 'UserMgt' })

const $table = ref(null)

/** QueryBar筛选参数（可选） */
const queryItems = ref({})

onMounted(() => {
  $table.value?.handleSearch()
})


const genders = [
  { label: '男', value: 1 },
  { label: '女', value: 2 },
]
const roles = ref([])

const columns = [
  {
    title: '头像',
    key: 'userAvatar',
    width: 80,
    render: ({ userAvatar }) =>
      h(NAvatar, {
        size: 'small',
        src: userAvatar,
      }),
  },
  { title: '昵称', key: 'userNickname', width: 130, ellipsis: { tooltip: true } },
  {
    title: '角色',
    key: 'userRole',
    width: 150,
    ellipsis: { tooltip: true },
    render: ({ userRole }) => {
      const typeMap = {
        '超级管理员': 'warning',
        '管理员': 'error',
        '招聘者': 'info',
        '求职者': 'success',
      };
      if (userRole) {
        return h(
          NTag,
          { type: typeMap[userRole] || 'default', round: true, size: "small"},
          { default: () => userRole }
        );
      } else {
        return '未知角色';
      }
    },
  },
  {
    title: '更新时间',
    key: 'updateTime',
    width: 180,
    render(row) {
      return h('span', formatDateTime(row['updateTime']))
    },
  },
  {
    title: '状态',
    key: 'isDisabled',
    width: 120,
    render: (row) =>
      h(
        NSwitch,
        {
          size: 'small',
          rubberBand: false,
          value: row.isDisabled==0?true:false,
          loading: false,
          onUpdateValue: () => handleEnable(row),
        },
        {
          checked: () => '启用',
          unchecked: () => '停用',
        }
      ),
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
            type: 'primary',
            secondary: true,
            onClick: () => handleOpenRolesSet(row),
          },
          {
            default: () => '设置角色',
            icon: () => h('i', { class: 'i-carbon:user-role text-14' }),
          }
        ),
        h(
          NButton,
          {
            size: 'tiny',
            type: 'info',
            style: 'margin-left: 12px;',
            onClick: () => handleOpen({ action: 'reset', title: '重置密码', row, onOk: onSave }),
          },
          {
            default: () => '重置密码',
            icon: () => h('i', { class: 'i-radix-icons:reset text-14' }),
          }
        ),

        h(
          NButton,
          {
            size: 'tiny',
            type: 'error',
            style: 'margin-left: 12px;',
            onClick: () => handleDelete(row.id),
          },
          {
            default: () => '删除',
            icon: () => h('i', { class: 'i-material-symbols:delete-outline text-14' }),
          }
        ),
      ]
    },
  },
]

async function handleEnable(row) {
  row.enableLoading = true
  try {
    await api.update({
      id: row.id,
      isDisabled: row.isDisabled==0?1:0
    })
    row.enableLoading = false
    $message.success('操作成功')
    $table.value?.handleSearch()
  } catch (error) {
    row.enableLoading = false
  }
}

function handleOpenRolesSet(row) {
  handleOpen({
    action: 'setRole',
    title: '分配角色',
    row: { id: row.id, userName: row.userName, userRole: row.userRole },
    onOk: onSave,
  })
}

const {
  modalRef,
  modalFormRef,
  modalForm,
  modalAction,
  handleAdd,
  handleDelete,
  handleOpen,
  handleSave,
} = useCrud({
  name: '用户',
  initForm: { isDisabled: 0, createTime: new Date(Date.now()).toISOString(), updateTime: new Date(Date.now()).toISOString() },
  doCreate: api.create,
  doDelete: api.delete,
  doUpdate: api.update,
  refresh: () => $table.value?.handleSearch(),
})

function onSave() {
  if (modalAction.value === 'setRole') {
    return handleSave({
      api: () => api.update(modalForm.value),
      cb: () => $message.success('分配成功'),
    })
  } else if (modalAction.value === 'reset') {
    return handleSave({
      api: () => api.update(modalForm.value),
      cb: () => $message.success('密码重置成功'),
    })
  }
  handleSave()
}
</script>
