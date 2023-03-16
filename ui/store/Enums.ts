export enum PageRoute {
  HOME = "/",
  LOGIN = "/auth/login",
  MEMBER = "/member",
  MEMBER_CREATE = "/member/create",
  ORGANIZATION = "/organization",
  PROJECT = "/project",
  PROJECT_CREATE = "/project/create",
  TICKET = "/ticket",
  WORKLOAD = "/workload",
  WORKLOAD_POINT = "/workload/create",
  WORKLOAD_PERCENT = "/workload/percent",
  WORKLOAD_RAW = "/workload/raw",
  WORKLOAD_SUMMARY = "/workload/summary",
}

export enum PanelOpen {
  HOME = "Home",
  LOGIN = "登陆",

  WORKLOAD_SUMMARY = "工作统计",
  WORKLOAD_LIST = "工作记录",
  WORKLOAD_ADD = "添加工作",
  WORKLOAD_PERCENT = "工作百分比",

  TABLE_ORIGIN = "原始数据统计表",
  TABLE_CUSTOM = "小组统计表",
  TABLE_PERCENT = "完成比例得分",

  MEMBER_LIST = "义工会员",
  MEMBER_ADD = "添加会员",

  PROJECT_LIST = "工作项目",
  PROJECT_ADD = "添加项目",

  TICKET_LIST = "查看请求",

  EXIT = "退出",
}

export enum MessageDisplay {
  REFETCH = "refetch",
  TITLE_WELCOME = "Welcome",
  APP_NAME = "ML Pipeline",
  APP_FULL_NAME = "会员系统",
  ACTION = "操作",
  CONFIRM = "确定",
  CURRENT_STATUS = "当前状态",
  DATA_NOT_COMPLETE = "输入数据不完整",
  DELETE = "删除",
  DETAIL = "详情",
  DISCORD = "Discord",
  ERROR = "错误",
  EXPORT = "导出",
  JOIN_DATE = "加入农场时间",
  VOLUNTEER_DATE = "成为义工时间",
  LEVEL_ONE_DATE = "一星会员时间",
  LEVEL_TWO_DATE = "二星会员时间",
  LEVEL_THREE_DATE = "三星会员时间",
  FALSE = "否",
  MEMBER = "会员",
  MEMBER_CREATE = "创建会员",
  MEMBER_ORGANIZATION = "会员组织结构",
  NO_DATA = "没有数据",
  ORGANIZATION = "组织结构",
  PROJECT = "项目",
  SUCCESS = "成功",
  TRUE = "是",
}
