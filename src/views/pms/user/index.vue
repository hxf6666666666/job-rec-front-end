<template>
  <CommonPage>
    <template #action>
      <n-button v-permission="'AddUser'" type="primary" @click="handleAdd()">
        <i class="i-material-symbols:add mr-4 text-18" />
        创建新用户
      </n-button>
    </template>

    <MeCrud
      ref="$table"
      v-model:query-items="queryItems"
      :scroll-x="1000"
      :columns="columns"
      :my-data="myData"
    >
      <MeQueryItem label="用户名" :label-width="50">
        <n-input
          v-model:value="queryItems.username"
          type="text"
          placeholder="请输入用户名"
          clearable
        />
      </MeQueryItem>

      <MeQueryItem label="角色" :label-width="50">
        <n-select
          v-model:value="queryItems.role"
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
          v-model:value="queryItems.enable"
          clearable
          :options="[
            { label: '启用', value: 1 },
            { label: '停用', value: 0 },
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
          path="username"
          :rule="{
            required: true,
            message: '请输入用户名',
            trigger: ['input', 'blur'],
          }"
        >
          <n-input v-model:value="modalForm.username" :disabled="modalAction !== 'add'" />
        </n-form-item>
        <n-form-item
          v-if="['add', 'reset'].includes(modalAction)"
          :label="modalAction === 'reset' ? '重置密码' : '初始密码'"
          path="password"
          :rule="{
            required: true,
            message: '请输入密码',
            trigger: ['input', 'blur'],
          }"
        >
          <n-input v-model:value="modalForm.password" />
        </n-form-item>

        <n-form-item :rule="{
            required: true,
            message: '请选择分配角色'
            }"
            v-if="['add', 'setRole'].includes(modalAction)" label="角色" path="roleIds">
          <n-select
            v-model:value="modalForm.roleIds"
            :options="[
                { label: '管理员', value: 0 },
                { label: '招聘者', value: 1 },
                { label: '求职者', value: 2 }
            ]"
            clearable
            filterable
            multiple
          />
        </n-form-item>

        <n-form-item v-if="modalAction === 'add'" label="状态" path="enable">
          <n-switch v-model:value="modalForm.enable">
            <template #checked>启用</template>
            <template #unchecked>停用</template>
          </n-switch>
        </n-form-item>
      </n-form>
      <n-alert v-if="modalAction === 'add'" type="warning" closable>
        详细信息需由用户本人补充修改
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

const myData = [
    {
      "id": 1,
      "username": "admin",
      "enable": true,
      "createTime": "2023-11-18T08:18:59.150Z",
      "roles": [
        {
          "id": 1,
          "name": "管理员",
        },
      ],
      "avatar": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80",
    },
    {
      "id": 2,
      "username": "张先生",
      "enable": true,
      "createTime": "2024-01-18T08:28:69",
      "roles": [
        {
          "id": 2,
          "name": "招聘者",
        }
      ],
      "avatar": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80",
    },
    {
      "id": 3,
      "username": "王女士",
      "enable": true,
      "createTime": "2024-02-18T08:18:59",
      "roles": [
        {
          "id": 1,
          "name": "求职者",
        },
      ],
      "avatar": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80",
    },
    {
      "id": 4,
      "username": "王女士",
      "enable": true,
      "createTime": "2024-02-18T08:18:59",
      "roles": [
        {
          "id": 2,
          "name": "招聘者",
        }
      ],
      "avatar": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80",
    },
    {
      "id": 5,
      "username": "王女士",
      "enable": true,
      "createTime": "2024-02-18T08:18:59",
      "roles": [
        {
          "id": 1,
          "name": "求职者",
        }
      ],
      "avatar": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80",
    },
    {
      "id": 6,
      "username": "李先生",
      "enable": true,
      "createTime": "2024-02-18T08:18:59",
      "roles": [
        {
          "id": 1,
          "name": "求职者",
        }
      ],
      "avatar": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80",
    },
];


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
api.getAllRoles().then(({ data = [] }) => (roles.value = data))

const columns = [
  {
    title: '头像',
    key: 'avatar',
    width: 80,
    render: ({ avatar }) =>
      h(NAvatar, {
        size: 'medium',
        src: avatar,
      }),
  },
  { title: '用户名', key: 'username', width: 130, ellipsis: { tooltip: true } },
  {
    title: '角色',
    key: 'roles',
    width: 150,
    ellipsis: { tooltip: true },
    render: ({ roles }) => {
      const typeMap = {
        '管理员': 'error',
        '招聘者': 'info',
        '求职者': 'success',
        // ... 其他role和type的映射
      };
      if (roles?.length) {
        return roles.map((item, index) =>
          h(
            NTag,
            { type: typeMap[item.name], style: index > 0 ? 'margin-left: 8px;' : '' },
            { default: () => item.name }
          )
        )
      }
      return '暂无角色'
    },
  },
  {
    title: '创建时间',
    key: 'createDate',
    width: 180,
    render(row) {
      return h('span', formatDateTime(row['createTime']))
    },
  },
  {
    title: '状态',
    key: 'enable',
    width: 120,
    render: (row) =>
      h(
        NSwitch,
        {
          size: 'small',
          rubberBand: false,
          value: row.enable,
          loading: !!row.enableLoading,
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
            size: 'small',
            type: 'primary',
            secondary: true,
            onClick: () => handleOpenRolesSet(row),
          },
          {
            default: () => '分配角色',
            icon: () => h('i', { class: 'i-carbon:user-role text-14' }),
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
            default: () => '重置密码',
            icon: () => h('i', { class: 'i-radix-icons:reset text-14' }),
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
      ]
    },
  },
]

async function handleEnable(row) {
  row.enableLoading = true
  try {
    await api.update({ id: row.id, enable: !row.enable })
    row.enableLoading = false
    $message.success('操作成功')
    $table.value?.handleSearch()
  } catch (error) {
    row.enableLoading = false
  }
}

function handleOpenRolesSet(row) {
  const roleIds = row.roles.map((item) => item.id)
  handleOpen({
    action: 'setRole',
    title: '分配角色',
    row: { id: row.id, username: row.username, roleIds },
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
  initForm: { enable: true },
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
      api: () => api.resetPwd(modalForm.value.id, modalForm.value),
      cb: () => $message.success('密码重置成功'),
    })
  }
  handleSave()
}
</script>
