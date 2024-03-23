<script>
import { computed, defineComponent, ref } from 'vue'

function genOptions(depth = 2, iterator = 1, prefix = '') {
  const length = 12
  const options = []
  for (let i = 1; i <= length; ++i) {
    if (iterator === 1) {
      options.push({
        value: `${i}`,
        label: `${i}`,
        disabled: i % 5 === 0,
        children: genOptions(depth, iterator + 1, '' + i)
      })
    } else if (iterator === depth) {
      options.push({
        value: `${prefix}-${i}`,
        label: `${prefix}-${i}`,
        disabled: i % 5 === 0
      })
    } else {
      options.push({
        value: `${prefix}-${i}`,
        label: `${prefix}-${i}`,
        disabled: i % 5 === 0,
        children: genOptions(depth, iterator + 1, `${prefix}-${i}`)
      })
    }
  }
  return options
}

export default defineComponent({
  setup() {
    const formRef = ref(null)
    const model = ref({
      inputValue: null,
      selectValue: null,
      autoCompleteValue: '',
      dynamicTagsValue: ['teacher', 'frontend'],
      cascaderValue: null,
      datetimeValue: null,
      switchValue: false,
      checkboxValue: false,
      checkboxGroupValue: null,
      radioValue: 'Definitely Maybe',
      radioGroupValue: null,
      radioButtonGroupValue: null,
      inputNumberValue: null,
      timePickerValue: null,
      colorValue: null,
      sliderValue: 0,
      transferValue: null
    })
    return {
      updateDisabled: ref(false),
      formRef,
      model,
      generalOptions: ['男', '女', '保密'].map(
        (v) => ({
          label: v,
          value: v
        })
      ),
      customValue: ref([
        {
          isCheck: true,
          num: 1,
          string: '一个字符串',
          timestamp: ref([118313526e4, Date.now()])
        }
      ]),
      onCreate() {
        return {
          isCheck: false,
          num: 1,
          string: '一个字符串'
        }
      },
      options: genOptions(),
      treeSelectOptions: [
        {
          label: 'Rubber Soul',
          key: 'Rubber Soul',
          children: [
            {
              label: 'Drive My Car',
              key: 'Drive My Car'
            },
            {
              label: 'Michelle',
              key: 'Michelle'
            }
          ]
        }
      ],
      autoCompleteOptions: computed(() => {
        return ['@gmail.com', '@163.com', '@qq.com', '@126.com', '@sina.com'].map((suffix) => {
          const prefix = model.value.autoCompleteValue.split('@')[0]
          return {
            label: prefix + suffix,
            value: prefix + suffix
          }
        })
      }),
      railStyle: ({
                    focused,
                    checked
                  }) => {
        const style = {}
        if (checked) {
          style.background = '#d03050'
          if (focused) {
            style.boxShadow = '0 0 0 2px #d0305040'
          }
        } else {
          style.background = '#2080f0'
          if (focused) {
            style.boxShadow = '0 0 0 2px #2080f040'
          }
        }
        return style
      }
    }
  }
})
</script>

<template>
  <n-card class="mt-5 w-720px" embedded hoverable>
    <n-space vertical>
      <!--      <div style="text-align: right; margin-bottom: 10px">-->
      <!--        <n-switch v-model:value="updateDisabled" :rail-style="railStyle">-->
      <!--          <template #checked>-->
      <!--            浏览模式-->
      <!--          </template>-->
      <!--          <template #unchecked>-->
      <!--            修改模式-->
      <!--          </template>-->
      <!--        </n-switch>-->
      <!--      </div>-->
      <n-form
        ref="formRef"
        :disabled="updateDisabled"
        :label-width="160"
        :model="model"
        :style="{  maxWidth: '640px' }"
        label-placement="left"
      >
        <n-form-item label="姓名" path="inputValue">
          <n-input placeholder="请输入姓名" />
        </n-form-item>
        <n-form-item label="性别" path="selectValue">
          <n-select
            v-model:value="model.selectValue"
            :options="generalOptions"
            placeholder="选择性别"
          />
        </n-form-item>
        <n-form-item label="出生年月">
          <n-date-picker v-model:value="timestamp" clearable type="month" />
        </n-form-item>
        <n-form-item label="当前地址">
          <n-input placeholder="请输入地址" />
        </n-form-item>
        <n-form-item label="电话">
          <n-input placeholder="请输入电话号码" />
        </n-form-item>
        <n-form-item label="邮箱" path="autoCompleteValue">
          <n-auto-complete
            v-model:value="model.autoCompleteValue"
            :options="autoCompleteOptions"
            placeholder="Email"
          />
        </n-form-item>
        <n-form-item label="QQ">
          <n-input placeholder="请输入QQ号码" />
        </n-form-item>
        <n-form-item label="微信">
          <n-input placeholder="请输入微信号" />
        </n-form-item>
        <n-divider></n-divider>


        <n-form-item label="教育经历" path="教育经历">
          <n-dynamic-input v-model:value="customValue" :on-create="onCreate">
            <template #create-button-default>
              添加教育经历
            </template>
            <template #default="{ value }">
              <div style="display: flex; flex-wrap: wrap; align-items: center; width: 100%;">
                <div style="margin-right: 12px; margin-bottom: 12px; width: 100%;">
                  <n-date-picker v-model:value="value.timestamp" clearable type="yearrange" />
                </div>
                <div style="margin-right: 12px; margin-bottom: 12px; width: 100%;">
                  <label for="school" style="display: block; margin-bottom: 4px;">学校名称</label>
                  <n-input v-model:value="value.school" type="text" />
                </div>
                <div style="margin-right: 12px; margin-bottom: 12px; width: 100%;">
                  <label for="education-level" style="display: block; margin-bottom: 4px;">学历:</label>
                  <n-select v-model:value="value.educationLevel" :options="educationOptions" placeholder="选择学历" />
                </div>
                <div style="margin-right: 12px; margin-bottom: 12px; width: 100%;">
                  <label for="major" style="display: block; margin-bottom: 4px;">专业</label>
                  <n-input v-model:value="value.major" type="text" />
                </div>
                <div style="margin-right: 12px; margin-bottom: 12px; width: 100%;">
                  <label for="gpa" style="display: block; margin-bottom: 4px;">GPA</label>
                  <n-input v-model:value="value.gpa" type="text" />
                </div>
                <div style="margin-bottom: 12px; width: 100%;">
                  <label for="description" style="display: block; margin-bottom: 4px;">描述</label>
                  <n-input v-model:value="value.description" type="textarea" />
                </div>
              </div>
            </template>
          </n-dynamic-input>
        </n-form-item>

        <n-divider></n-divider>

        <n-form-item label="所获奖项" path="所获奖项">
          <n-dynamic-tags v-model:value="model.dynamicTagsValue" type="success" />
        </n-form-item>
        <n-form-item label="技能标签" path="技能标签">
          <n-dynamic-tags v-model:value="model.dynamicTagsValue" type="info" />
        </n-form-item>
        <n-form-item label="素养标签" path="素养标签">
          <n-dynamic-tags v-model:value="model.dynamicTagsValue" type="error" />
        </n-form-item>

        <n-divider></n-divider>

        <n-form-item label="补充信息" path="paragraphValue">
          <n-input
            v-model:value="model.paragraphValue"
            placeholder="请输入其他补充内容"
            type="textarea"
          />
        </n-form-item>
      </n-form>
    </n-space>
  </n-card>
</template>

<style scoped>

</style>
