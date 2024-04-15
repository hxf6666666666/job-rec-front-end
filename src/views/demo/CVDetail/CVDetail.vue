<script setup>

import ResumeCard from '@/components/common/ResumeCard.vue'
import { AppPage } from '@/components/index.js'
import ResumeForm from '@/components/common/ResumeForm.vue'
import JobRec from '@/components/common/JobRec.vue'
import CompetencyAssess from '@/components/common/CompetencyAssess.vue'
import { useUserStore } from '@/store/index.js'
import axios from 'axios'
import api from './api.js'
import { ref } from 'vue'

const userStore = useUserStore()


const employee = reactive({
  id: 2,
  avatar: "",
  resumeIntegrity: 0,
  userId: 0,
  realName: "",
  gender: 0,
  age: 0,
  dateOfBirth: "",
  city: "",
  address: "",
  userPhone: "",
  email: "",
  qqNumber: "",
  wechat: "",
  skillTag: "",
  awardTag: "",
  personalityTag: "",
  advantage: "",
  workExperienceYear: 0,
  englishTag: "",
  createTime: "",
  updateTime: "",
  educationExperiences: [
    {
      schoolName: "",
      majorName: "",
      gpa: "",
      beginYear: "",
      endYear: "",
      activity: "",
      educationType: 2,
      ranking: "",
      schoolType: "",
    }
  ]
});


const link = ref()
const isPdfFile = ref(false)


// 准备请求的数据
const userId = '5a6787e0-d0b0-11ee-b312-b94efab9309e';
const secret = '3fc564f2-2494-430d-9a97-0540e578abdb';
const apiUrl = 'https://api.xiaoxizn.com/v1/parser/parse_base';


const text1 = '#你是一个娴熟的简历评估优化专家，但你必须严格按照我指定的JSON格式输出，不要多余的符号和内容。你的主要职责是详细地评估和分析中文用户的简历关键词和期望职位的大类要求，给出评价和建议。\n' +
  '-结合你对给定职位大类的理解以及给定的大类名称、重要技能和素养，深入地分析和理解职位的学历、专业、技能需求和素养需求。\n' +
  '-从学历、专业、技能和素养等方面对用户的简历进行分析，分别给出其学历、专业、技能和素养方面的评分。\n' +
  '-对用户简历的优点和缺点进行反馈，给出需要提升哪些方面的知识、技能，给出学习和提升建议。\n' +
   '- 对于不足之处，需要给出具体并且可以付诸实施的建议。优势和建议各至少3条。\n' +
  '- 永远不要回答其他无关问题。- 专业若不相关，请直接给出60分以下的专业匹配度。技能解释时，请尽量多地列出哪些技能没有匹配，若匹配度不高，请给出70分以下的技能匹配度。综合得分应权衡其他得分而给出。    \n' +
  '现在有一个简历是如下内容：';

const text2 = '，且他的期望职位为'

const text3 = '，该职位的重要技能为'

const text4 = '，素养要求为'


onMounted(async ()=>{
  try {
    const response1 = await api.getByUserId(userStore.userId);
    const response2 = await api.getResumeByUserId(userStore.userId);
    // 更新响应式对象的属性
    employee.id = response1.data.id;
    employee.avatar = response1.data.avatar;
    employee.resumeIntegrity = response1.data.resumeIntegrity;
    employee.userId = response1.data.userId;
    employee.realName = response1.data.realName;
    employee.gender = response1.data.gender;
    employee.age = response1.data.age;
    employee.dateOfBirth = response1.data.dateOfBirth;
    employee.city = response1.data.city;
    employee.address = response1.data.address;
    employee.userPhone = response1.data.userPhone;
    employee.email = response1.data.email;
    employee.qqNumber = response1.data.qqNumber;
    employee.wechat = response1.data.wechat;
    employee.skillTag = response1.data.skillTag;
    employee.awardTag = response1.data.awardTag;
    employee.personalityTag = response1.data.personalityTag;
    employee.advantage = response1.data.advantage;
    employee.workExperienceYear = response1.data.workExperienceYear;
    employee.englishTag = response1.data.englishTag;
    employee.createTime = response1.data.createTime;
    employee.updateTime = response1.data.updateTime;
    employee.educationExperiences = response1.data.educationExperiences;

    if(response2.data.length!=0){
      const filePath = response2.data.filePath;
      // 检查 filePath 的后缀是否为 .pdf（不区分大小写）
      if (filePath.toLowerCase().endsWith('.pdf')) {
        const response3 = await api.getPdf({ 'filePath': filePath });
        const base64Pdf = response3.data;
        const pdfDataUrl = `data:application/pdf;base64,${base64Pdf}`;
        link.value = pdfDataUrl;
        isPdfFile.value = true
      }
    }
  } catch (error) {
    $message.error('失败：' + error.message);
  }
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

async function handleUpload({ file, onFinish }) {
  if (!file || !file.type) {
    $message.error('请选择你的简历文件')
  }

  let formData = new FormData();
  formData.append("file", file.file);

  try {
    // 发送文件到后端
    const response = await api.uploadResume(employee.id, formData);

    // 处理后端返回的响应
    if (response.data) {
      $message.success(response.data);
      // 更新 link 变量以重新渲染 PDF 文件
      const response2 = await api.getResumeByUserId(userStore.userId);
      const filePath = response2.data.filePath;
      const response3 = await api.getPdf({ 'filePath': filePath });
      const base64Pdf = response3.data;



      const resumeBase64 = base64Pdf; // 替换为实际的经 Base64 编码的简历内容
      const fileName = response2.data.fileName; // 简历文件名，确保文件后缀正确

      console.log(resumeBase64)
      console.log(fileName)

      // 构建请求体
      const requestData = {
        resume_base: resumeBase64,
        file_name: fileName
      };

      // 发送 POST 请求
      axios.post(apiUrl, requestData, {
        headers: {
          rawtext: 1,
          handle_image: 1, // 处理图片简历
          avatar: 1, // 提取简历头像
          parse_mode: 'general', // 解析模式
          ocr_mode: 'general', // OCR 模式
          ocr_service: 'xiaoxi',
          'Content-Type': 'application/json',
          id: userId,
          secret: secret,
        }
      })
        .then(response => {
          // 请求成功处理
          console.log('解析结果：', response.data);

          // 假设这里的 response.data 包含了需要的字段信息

          // 解析 basic_info 字段
          const basicInfo = response.data.parsing_result.basic_info;

          // 解析 contact_info 字段
          const contactInfo = response.data.parsing_result.contact_info;

          // 解析 education_experience 字段
          const educationExperiences = response.data.parsing_result.education_experience;

          // 更新 employee 对象
          employee.avatar = response.data.avatar_data; // 更新简历头像 URL
          employee.realName = basicInfo.name; // 更新真实姓名
          employee.resumeIntegrity = response.data.resume_integrity; // 更新简历完整度
          employee.gender = basicInfo.gender === '女' ? 0 : 1; // 更新性别：1 表示男性，0 表示女性
          employee.age = basicInfo.age; // 更新年龄
          employee.dateOfBirth = basicInfo.date_of_birth; // 更新生日
          employee.city = basicInfo.current_location; // 更新城市
          employee.address = basicInfo.detailed_location; // 更新详细地址
          employee.userPhone = contactInfo.phone_number; // 更新电话号码
          employee.email = contactInfo.email; // 更新邮箱
          employee.qqNumber = contactInfo.QQ; // 更新 QQ 号码
          employee.wechat = contactInfo.wechat; // 更新微信号
          employee.skillTag = response.data.parsing_result.others.skills.toString(); // 以下是字段待更新
          employee.awardTag = response.data.parsing_result.others.awards.toString();
          employee.personalityTag = "";
          employee.englishTag = response.data.parsing_result.others.certificate.toString();
          employee.advantage = response.data.parsing_result.resume_rawtext;
          employee.workExperienceYear = basicInfo.num_work_experience;

          // 更新教育经历列表
          employee.educationExperiences = educationExperiences.map(edu => ({
            schoolName: edu.school_name,
            educationType: mapEducationType(edu.degree), // 转换教育类型
            beginYear: parseInt(edu.start_time_year),
            endYear: parseInt(edu.end_time_year),
            majorName: edu.major,
            activity: edu.courses || "", // 在校活动经历，可能为空
            gpa: edu.GPA || "",
            ranking: edu.ranking || "",
          }));

          // 辅助函数：将教育类型映射为数字
          function mapEducationType(degree) {
            const degreeMap = {
              "博士": 4,
              "硕士": 3,
              "本科": 2,
              "大专": 1,
            };
            return degreeMap[degree] || 2; // 默认为本科
          }
          // 更新时间信息
          employee.createTime = new Date().toISOString(); // 更新创建时间为当前时间
          employee.updateTime = new Date().toISOString(); // 更新更新时间为当前时间
          console.log(employee)

          const response4 = api.uploadEmployee(userStore.userId, employee)
        })
        .catch(error => {
          // 请求失败处理
          console.error('请求失败：', error.message);
        });


      const pdfDataUrl = `data:application/pdf;base64,${base64Pdf}`;
      // 更新 link 变量，触发 PdfObject 组件重新渲染
      link.value = pdfDataUrl;
      // 检查文件类型是否为 PDF，更新显示 PdfObject 的状态
      isPdfFile.value = file.type === 'application/pdf';
    } else {
      $message.error('上传失败');
    }
  } catch (error) {
    $message.error('上传失败：' + error.message);
  } finally {
    onFinish();
  }
}
const time = ref()


function matchSkills(expectedSkills, applicantSkills) {
  // 将求职者的技能数组转换为小写字母形式的集合，方便后续比较
  const applicantSkillsLowercase = new Set(applicantSkills.map(skill => skill.toLowerCase()));

  // 初始化匹配到的技能数组和未匹配到的技能数组
  let matchedSkills = [];
  let unmatchedSkills = [];

  // 遍历期望的技能数组，检查每个技能是否在求职者的技能数组中
  expectedSkills.forEach(skill => {
    const skillLowercase = skill.toLowerCase();
    if (applicantSkillsLowercase.has(skillLowercase)) {
      matchedSkills.push(skill); // 技能匹配成功，加入匹配到的数组
    } else {
      unmatchedSkills.push(skill); // 技能未匹配成功，加入未匹配的数组
    }
  });

  // 返回匹配到的技能数组和未匹配到的技能数组
  return {
    matchedSkills,
    unmatchedSkills
  };
}


const access = async () => {
  $message.loading('评价结果生成中，请稍候...', { key: 'access', duration: 200000 })
  try {
    const text9 = text1 + employee.advantage + text2 + expectedJob.value.category + text3 +
      expectedJob.value.importantSkills.toString() + text4 +
      expectedJob.value.competencies.toString() + '### 输出格式：请严格仿照下面的JSON格式输出，请严格仿照下面的JSON格式输出，请严格仿照下面的JSON格式输出！！！你的输出格式必须是标准的纯JSON，一定不要有其他提示词\n' +
      '{"overallScore":88,"educationMatch":100,"majorMatch":100,"skillScore":81,"personalityScore":89,"explanationOverall":"综合得分的解释说明(100字)。","explanationEducation":"学历匹配度的解释说明(100字)。","explanationMajor":"专业匹配度的解释说明(100字)。","explanationSkill":"技能得分的解释说明(100字)。","explanationPersonality":"素养得分的解释说明(100字)","advantages":["",""],"suggestions":["","",""]}\n';
    const uid = 'hxf'
    let formData = new FormData();
    formData.append("uid", uid);
    formData.append("text", text9);
    const response_raw =  await api.askXF(formData)
    // const cleanedJsonString = response_raw.data.replace(/\\/g, '');
    // console.log(response_raw.data.data);
    const jsonObject = JSON.parse(response_raw.data.data.substring(response_raw.data.data.indexOf('{'), response_raw.data.data.lastIndexOf('}') + 1))
    pingjia.overallScore = jsonObject.overallScore;
    pingjia.educationMatch = jsonObject.educationMatch;
    pingjia.majorMatch = jsonObject.majorMatch;
    pingjia.skillScore = jsonObject.skillScore;
    pingjia.personalityScore = jsonObject.personalityScore;
    pingjia.explanationOverall = jsonObject.explanationOverall;
    pingjia.explanationEducation = jsonObject.explanationEducation;
    pingjia.explanationMajor = jsonObject.explanationMajor;
    pingjia.explanationSkill = jsonObject.explanationSkill;
    pingjia.explanationPersonality = jsonObject.explanationPersonality;
    pingjia.matchedSkills = jsonObject.matchedSkills || [];
    pingjia.unmatchedSkills = jsonObject.unmatchedSkills || [];
    pingjia.matchedTraits = jsonObject.matchedTraits || [];
    pingjia.unmatchedTraits = jsonObject.unmatchedTraits || [];
    pingjia.advantages = jsonObject.advantages || [];
    pingjia.suggestions = jsonObject.suggestions || [];
    const result1 = matchSkills(expectedJob.value.importantSkills, String(employee.skillTag).split(','));
    const result2 = matchSkills(expectedJob.value.competencies, String(employee.personalityTag).split(','));
    pingjia.matchedSkills = result1.matchedSkills
    pingjia.unmatchedSkills = result1.unmatchedSkills
    pingjia.matchedTraits = result2.matchedSkills
    pingjia.unmatchedTraits = result2.unmatchedSkills
    $message.success('成功生成评价，页面将刷新', { key: 'access' })
    setTimeout(() => {
      history.go(0); // 刷新当前页面
    }, 1000); // 延迟1秒
  }catch (error) {
    $message.destroy('access')
    $message.error('失败：' + error.message);
  }
}

const pingjia = reactive({
  overallScore: Number,
  educationMatch: Number,
  majorMatch: Number,
  skillScore: Number,
  personalityScore: Number,
  explanationOverall: String,
  explanationEducation: String,
  explanationMajor: String,
  explanationSkill: String,
  explanationPersonality: String,
  matchedSkills: Array,
  unmatchedSkills: Array,
  matchedTraits: Array,
  unmatchedTraits: Array,
  advantages: Array,
  suggestions: Array
});

// 尝试从 localStorage 恢复 pingjia 数据
const savedPingjia = localStorage.getItem('pingjia');
if (savedPingjia) {
  Object.assign(pingjia, JSON.parse(savedPingjia));
}

// 使用 watch 监听 pingjia 对象的变化，并将其保存到 localStorage
watch(pingjia, (newVal) => {
  localStorage.setItem('pingjia', JSON.stringify(newVal));
}, { deep: true });




const jobCategories = [
  {
    category: "后端开发/Java/C/C++/PHP/Python/C#/Golang/全栈",
    value: 1,
    importantSkills: [
      "C++",
      "计算机",
      "数据库",
      "C",
      "优化",
      "Java",
      "Linux",
      "算法",
      "Spring",
      "SQL",
      "软件工程",
      "设计模式",
      "数据结构"
    ],
    competencies: ["学习能力", "逻辑", "严谨"]
  },
  {
    category: "移动开发工程师",
    value: 2,
    importantSkills: [
      "Android",
      "设计模式",
      "调试",
      "通信",
      "UI",
      "APP",
      "数据结构",
      "算法",
      "C",
      "数据库",
      "Java",
      "SDK",
      "app",
      "面向对象",
      "动画"
    ],
    competencies: ["分析", "团队", "沟通", "学习能力"]
  },
  {
    category: "前端开发工程师",
    value: 3,
    importantSkills: [
      "前端",
      "开发",
      "优化",
      "CSS",
      "Vue",
      "JavaScript",
      "Web",
      "HTML",
      "js",
      "vue",
      "HTML5",
      "React",
      "web",
      "CSS3",
      "UI",
      "小程序",
      "JS"
    ],
    competencies: ["学习能力", "总结"]
  },
  {
    category: "测试工程师/软件测试",
    value: 4,
    importantSkills: [
      "自动化",
      "数据库",
      "优化",
      "Python",
      "调试",
      "Linux",
      "app",
      "C",
      "C++",
      "SQL",
      "Java",
      "操作系统",
      "web",
      "软件工程",
      "部署",
      "英语",
      "Shell"
    ],
    competencies: ["学习能力", "细致"]
  },
  {
    category: "运维/技术支持",
    value: 5,
    importantSkills: [
      "安装",
      "调试",
      "IP",
      "网络安全",
      "监控",
      "通信",
      "操作系统",
      "TCP",
      "硬件",
      "部署",
      "Linux",
      "数据库",
      "办公软件",
      "VPN",
      "CCIE",
      "项目管理",
      "Cisco",
      "网络协议",
      "网络通信"
    ],
    competencies: ["沟通", "严谨"]
  },
  {
    category: "人工智能/算法",
    value: 6,
    importantSkills: [
      "算法",
      "C++",
      "Python",
      "C语言",
      "自动化",
      "AI",
      "Linux",
      "部署",
      "数据结构",
      "3D",
      "Matlab",
      "控制",
      "机器人",
      "TensorFlow",
      "NLP",
      "pytorch",
      "OpenCV",
      "数据分析",
      "Pytorch",
      "Tensorflow",
      "SLAM",
      "大数据",
      "PyTorch",
      "tensorflow",
      "导航",
      "MATLAB",
      "GPU",
      "CUDA",
      "matlab",
      "OpenGL"
    ],
    competencies: ["分析", "创新", "勤奋"]
  },
  {
    category: "销售技术支持",
    value: 7,
    importantSkills: [
      "销售",
      "计算机",
      "营销",
      "自动化",
      "办公软件",
      "通信",
      "PPT",
      "数据分析",
      "案例",
      "Word",
      "客服",
      "大数据",
      "项目经验",
      "word",
      "软件工程",
      "微信",
      "物联网",
      "office",
      "Oracle",
      "Excel"
    ],
    competencies: ["沟通", "积极", "勤奋", "抗压", "敬业", "亲和力"]
  },
  {
    category: "大数据/数据分析/数据",
    value: 8,
    importantSkills: [
      "计算机",
      "开发",
      "数据库",
      "大数据",
      "算法",
      "SQL",
      "数据分析",
      "优化",
      "Python",
      "C++",
      "Hadoop",
      "Spark"
    ],
    competencies: ["分析", "合作"]
  },
  {
    category: "IT培训",
    value: 9,
    importantSkills: [
      "计算机",
      "数据库",
      "C语言",
      "办公软件",
      "机器人",
      "开发",
      "语言",
      "硬件",
      "PS",
      "python",
      "Python",
      "安装",
      "C++",
      "网络安全",
      "自动化",
      "office"
    ],
    competencies: ["亲和力", "创新", "热情"]
  },
  {
    category: "软件工程师",
    value: 10,
    importantSkills: [
      "C++",
      "计算机",
      "C",
      "调试",
      "自动化",
      "算法",
      "数据库",
      "优化",
      "Linux",
      "嵌入式",
      "操作系统",
      "软件工程",
      "SQL",
      "数据结构",
      "ARM",
      "TCP",
      "Python",
      "英语",
      "Java",
      "DSP",
      "QT",
      "MCU",
      "开发环境"
    ],
    competencies: ["学习能力", "逻辑", "严谨"]
  },
  {
    category: "硬件/电子/电气",
    value: 11,
    importantSkills: [
      "调试",
      "自动化",
      "硬件",
      "计算机",
      "开发",
      "安装",
      "电路",
      "通信",
      "CAD",
      "办公软件",
      "监控",
      "控制",
      "操作系统",
      "优化",
      "英语",
      "嵌入式",
      "ARM"
    ],
    competencies: ["勤奋", "严谨", "执行力"]
  }
];

const types2 = [
  { label: "后端开发/Java/C/C++/PHP/Python/C#/Golang/全栈", value: 1 },
  { label: "移动开发工程师", value: 2 },
  { label: "前端开发工程师", value: 3 },
  { label: "测试工程师/软件测试", value: 4 },
  { label: "运维/技术支持", value: 5 },
  { label: "人工智能/算法", value: 6 },
  { label: "销售技术支持", value: 7 },
  { label: "大数据/数据分析/数据", value: 8 },
  { label: "IT培训", value: 9 },
  { label: "软件工程师", value: 10 },
  { label: "硬件/电子/电气", value: 11 },
];

// 职位简介内容
const jobDescriptions = {
  1: "后端开发工程师负责服务器端的开发工作，熟练掌握Java、C、C++、PHP、Python等后端技术。他们设计和开发应用程序的后端逻辑，确保系统功能的稳定和高效。",
  2: "移动开发工程师致力于移动应用程序的开发，具备丰富的移动端开发经验。他们熟悉Android和iOS平台的开发，负责移动应用的架构设计和实现。",
  3: "前端开发工程师负责网站前端开发，熟悉HTML、CSS、JavaScript等前端技术。他们将设计师提供的界面设计转化为可交互的网页，关注用户体验和页面性能优化。",
  4: "测试工程师负责软件测试工作，保证软件质量。他们设计和执行测试用例，发现和报告软件缺陷，确保软件产品的稳定性和可靠性。",
  5: "运维/技术支持负责系统运维和技术支持工作。他们管理和维护计算机系统和网络设备，解决用户的技术问题，确保系统的正常运行。",
  6: "人工智能/算法工程师专注于人工智能领域，具备算法开发经验。他们研究和开发机器学习算法，构建智能系统和应用。",
  7: "销售技术支持提供销售技术支持。他们协助销售团队，解决客户的技术问题，推动产品销售。",
  8: "大数据/数据分析/数据工程师负责大数据平台和数据分析工作。他们收集、存储和分析海量数据，提供数据洞察和业务支持。",
  9: "IT培训师提供IT培训服务。他们教授和培训学员各种IT技术和知识，帮助他们提升技能。",
  10: "软件工程师负责软件开发工作。他们设计、开发和维护应用程序，确保软件按时交付和高质量。",
  11: "硬件/电子/电气工程师负责硬件设备和电气设备的开发工作。他们设计和测试硬件电路和系统，确保设备的性能和可靠性。",
};



const type_value2 = ref(types2[0].value)


// 当选择的职位类型发生变化时更新
const jobDescription = ref(jobDescriptions[type_value2.value] || '');
const expectedJob = ref(jobCategories.find((item) => item.value === type_value2.value) || { });


// 监听职位类型变化
watch(type_value2, (newValue) => {
  jobDescription.value = jobDescriptions[newValue] || '';
  expectedJob.value = jobCategories.find((item) => item.value === newValue) || {};
});


// 将 type_value2 的值存储到 localStorage
const savedTypeValue2 = localStorage.getItem('type_value2');
if (savedTypeValue2) {
  type_value2.value = JSON.parse(savedTypeValue2);
}

// 使用 watch 监听 type_value2 的变化，并将其保存到 localStorage
watch(type_value2, (newVal) => {
  localStorage.setItem('type_value2', JSON.stringify(newVal));
});

// 处理职位类型变化事件
const handleTypeChange = (value) => {
  type_value2.value = value;
};

// 初始的 tabs value 值
const initialTabsValue = '简历上传'; // 这里需要设置初始的 tabs value

// 创建一个 ref 来存储 tabs 的 value
const tabsValue = ref(initialTabsValue);

// 尝试从 localStorage 恢复 tabs value 数据
const savedTabsValue = localStorage.getItem('tabsValue');
if (savedTabsValue) {
  tabsValue.value = savedTabsValue;
}

// 使用 watch 监听 tabsValue 的变化，并将其保存到 localStorage
watch(tabsValue, (newValue) => {
  localStorage.setItem('tabsValue', newValue);
});



</script>

<template>
  <AppPage>
    <n-card>
      <n-tabs :bar-width="100" default-value="简历上传" v-model:value="tabsValue" animated class="items-center" tab-style="font-size:17px; font-weight:bold;"
              type="bar">
        <n-tab-pane name="简历上传" tab="简历上传">
          <div class="mt-12 f-c-c flex-col">
            <n-alert class="w-720" type="info" v-if="!isPdfFile">
              初次登录需要先上传简历，PDF格式的简历支持在线预览哦~
            </n-alert>
          </div>
          <n-upload
            class="mx-auto p-20 text-center"
            :custom-request="handleUpload"
            :show-file-list="false"
            accept=".pdf,.docx,.doc,.txt,.jpeg,.png"
            @before-upload="onBeforeUpload"
          >
            <n-upload-dragger>
              <div class="h-150 w-670 f-c-c flex-col">
                <i class="i-mdi:upload mb-12 text-68 color-primary" />
                <n-text class="text-24 font-extrabold color-neutral">点击或者拖动文件到该区域</n-text>
                <n-text class="text-16 color-primary">支持简历格式：PDF(推荐), DOC, DOCX, TXT, JPEG, PNG</n-text>
              </div>
            </n-upload-dragger>
          </n-upload>
          <!-- 只有在文件类型为 PDF 时才显示 PdfObject -->
          <div id="my-pdf" class="flex justify-center" v-if="isPdfFile">
            <PdfObject :options="{ page: 1 }" :url="link" />
          </div>

        </n-tab-pane>


        <n-tab-pane name="在线简历" tab="在线简历">
          <resume-form
            :id="employee.id"
            :date-of-birth="employee.dateOfBirth"
            :avatar="employee.avatar"
            :resume-integrity="employee.resumeIntegrity"
            :realName="employee.realName"
            :age="employee.age"
            :city="employee.city"
            :address="employee.address"
            :userPhone="employee.userPhone"
            :gender="employee.gender"
            :email="employee.email"
            :qqNumber="employee.qqNumber"
            :wechat="employee.wechat"
            :skillTag="employee.skillTag"
            :awardTag="employee.awardTag"
            :personalityTag="employee.personalityTag"
            :advantage="employee.advantage"
            :workExperienceYear="employee.workExperienceYear"
            :englishTag="employee.englishTag"
            :createTime="employee.createTime"
            :updateTime="employee.updateTime"
            :educationExperiences="employee.educationExperiences"
          ></resume-form>
        </n-tab-pane>


        <n-tab-pane name="解析结果" tab="解析结果">
          <div class="button-container">
            <n-button v-print="'#resume'" size="tiny" type="info">导出为PDF</n-button>
          </div>
          <resume-card
            id="resume"
            :work-experience-year="employee.workExperienceYear"
            :gender="employee.gender"
            :id="employee.id"
            :date-of-birth="employee.dateOfBirth"
            :avatar="employee.avatar"
            :resume-integrity="employee.resumeIntegrity"
            :realName="employee.realName"
            :age="employee.age"
            :city="employee.city"
            :address="employee.address"
            :userPhone="employee.userPhone"
            :email="employee.email"
            :qqNumber="employee.qqNumber"
            :wechat="employee.wechat"
            :skillTag="employee.skillTag"
            :awardTag="employee.awardTag"
            :personalityTag="employee.personalityTag"
            :advantage="employee.advantage"
            :workExperience="employee.workExperienceYear"
            :englishTag="employee.englishTag"
            :createTime="employee.createTime"
            :updateTime="employee.updateTime"
            :educationExperiences="employee.educationExperiences"
          ></resume-card>
        </n-tab-pane>



        <n-tab-pane name="能力评价" tab="能力评价">
          <div class="button-container">
            <n-button class="mr-12" size="tiny" type="info" @click="access">生成评价</n-button>
            <div class="mt-8">
              当前评价结果生成时间：
              <n-time :time="time"/>
            </div>
          </div>
          <div class="flex mt-15">
            <n-card class="w-100%" embedded hoverable size="small" title="期望职位类型">
              <n-select class="w-50%" v-model:value="type_value2" :options="types2" clearable placeholder="职位类型" />
              <n-divider></n-divider>
              <n-alert class="w-840" type="info" title="职位简介" :bordered="false">
                {{ jobDescription }}
              </n-alert>
            </n-card>
          </div>
          <CompetencyAssess
            :overall-score="pingjia.overallScore"
            :education-match="pingjia.educationMatch"
            :major-match="pingjia.majorMatch"
            :skill-score="pingjia.skillScore"
            :personality-score="pingjia.personalityScore"
            :explanation-overall="pingjia.explanationOverall"
            :explanation-education="pingjia.explanationEducation"
            :explanation-major="pingjia.explanationMajor"
            :explanation-skill="pingjia.explanationSkill"
            :explanation-personality="pingjia.explanationPersonality"
            :matched-skills="pingjia.matchedSkills"
            :unmatched-skills="pingjia.unmatchedSkills"
            :matched-traits="pingjia.matchedTraits"
            :unmatched-traits="pingjia.unmatchedTraits"
            :advantages="pingjia.advantages"
            :suggestions="pingjia.suggestions"
          ></CompetencyAssess>
        </n-tab-pane>
        <n-tab-pane name="职位推荐" tab="职位推荐">
          <job-rec></job-rec>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </AppPage>
</template>

<style scoped>

.pdfobject-container {
  height: 900px;
  width: 720px;
  border: 1px solid #ccc;
}

.button-container {
  text-align: right;
  margin-bottom: 10px; /* 根据需要调整间隔 */
}
</style>
