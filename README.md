## 教务管理系统( educationalAdministrationSystem)

### 数据库设计

#### 表和功能的描述

##### 学生端

- 登陆模块：包含 loginId & loginPwd 在student集合中

- 课表查询： 由于课表是一个课表对应多个学生的形式，所以课表为单独的一个集合，采用Student集合中包含课表id的形式来存储每个学生的课表数据

- 成绩查询： 成绩查询采用Map的形式，包含在student集合中

  ```js
  student document
  {
      ...
      scores:[
          {
              sbjID:string, // 学科id
              sbjScore:number // 学科成绩
          }
      ]
          ...
      }
  }
  ```

- 教学评价：(Evaluation of teaching) 采用单独的一个evaluation 集合,其中包括学生的id导员的id和对各个方面的评价，具体文档格式见数据表

- 请销假申请：（Ask for leave） 采用单独的一个 leaveForm 集合，其中包括学生的id 和 导员的id 和请假的信息

- 培养方案：直接链接到一个在线文档

- 校园通知推送： （news and notice）由后端维护一个集合：包括每个通知的信息,具体见集合表

- 考试成绩分析：结合echart绘制图标分析成绩

  ##### 教师端

  ...

#### 集合表

​	**学生** ：

```js
Student:
{
        _id:ObjectId(), // 学生id 由MongoDB自动生成
            //登录模块
        loginId:string, // 学生登陆账号
        loginPwd:string, // 学生登陆密码
            
            // 学生基本信息
        name:string, // 学生姓名
        tel:string, // 联系电话
        mail:string, // 邮箱地址
        avatar:string, //学生的头像
        wechat:string, // 微信号码
        intro:string, // 个人简介
		enabled:boolean, // 学生账户是否被冻结
            // 教学评价 请假审批人
        counselorId:string, // 学生对应的辅导员的id
            // 课表查询 课表查询采用后台根据辅导员筛选出对应的学生来采用同意的课表id赋值
        classSchedule:string, // 课表id
        classId:string, // 班级id
            //成绩
        scores:[
            // 该对象提为一个单独的schema
        	{
            sbjID:string, // 学科id
            sbjScore:number // 学科成绩
       	 	}
    ]
}
```



**课表**

```js
classSchedule:
{
    _id:ObjectId(), //课表id
    courses:{
        '1-1'(string):string(课程名称) // 表示星期一第一节课
       	...
	}
}
```



**学科**

```js
course
{
    _id:ObjectId(), // 学科Id
    courseName:string, // 学科名字
}
```



**评教**

```js
evaluation 
{
    stuId:string, // 学生id
    tecId:string, // 导员id
    evaluation:[
        // 该对象提为一个单独的schema
        {
            question:string,// 问题
            score:number // 1-5 分数
        }
        ...
    ]
}
```

**请销假**

```js
Ask for leave{
    stuId:string, // 学生id
    tecId:string, // 导员id
        //请假信息
    tel:string, // 联系电话
    typeOfLeave:string, // 请假类型
    destination:string, //目的地
    emergencyContact:string, // 紧急联系人
    emergencyTel:string, // 紧急电话
    begin:Date,
    end:Date,
    reasons:string, // 请假原因
    attachment：string, // 附件
}
```



校园通知推送

```js
news and notice
// 封面 标题 内容
{
    cover:string, // 封面
    title:string, // 标题
    content:string, // 内容
}
```



班级

```js
class
    {
        classId:objectId(), // 班级id
        className:string, // 班级名称
    }
```



### Mongoose的字段约束

```js
// 结构体中的字段约束
{
    type:string, // 类型约束 该类型约束可提为公共的类型约束 将string换为mongoose.schema的实例即可
    /**
    类型可嵌套
    {
    	type:{
    		province:string,
    		city:{
    			type:string
    			}
    		}
    }
    */
    /**
        {
        	type:[String] //数组的每一项为字符串
        }
    */
    required:Boolean, //是否必须
    trim:Boolean, //是否去除空格
    minlength/maxlength:number, // 最长最短长度
    index:Boolean, // 将该字段设置为索引 搜索时提高效率
    unique:Boolean, // 唯一索引，包含上述的功能，保证该字段的记录不会重复
    default:any, // 默认值
    select:Boolean, // 设置为false的时候 默认情况下不会查询该字段
    enum:Array, // 枚举字段的值
}
```

### Mongoose增删改查

#### 增

```js
consts res = new User(obj);
res.save((error,res)=>{})

const res = await User.create([obj,[obj2,...]],option)
```

#### 查

```js
<Model>.findById(id)
<Model>.findByOne(filter,projection)
<Model>.findBy(filter,projection)
```

#### 改

```js
<Model>.updateOne(filter,projection,option);
<Model>.updateMany(filter,projection,option);
```

#### 删

```js
<Model>.deleteOne(filter)
<Model>.deleteManyfilter)
```

### API文档

#### 请销假

- 新增一条请假信息

