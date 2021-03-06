//story
// 小明最近看上了一套房子，到了售楼处之后才被告知，该楼盘的房子早已售罄。好在售楼
// MM 告诉小明，不久后还有一些尾盘推出，开发商正在办理相关手续，手续办好后便可以购买。
// 但到底是什么时候，目前还没有人能够知道。
// 于是小明记下了售楼处的电话，以后每天都会打电话过去询问是不是已经到了购买时间。除
// 了小明，还有小红、小强、小龙也会每天向售楼处咨询这个问题。一个星期过后，售楼 MM 决
// 定辞职，因为厌倦了每天回答 1000 个相同内容的电话。
// 当然现实中没有这么 小明离开之前，把电话号码留在
// 了售楼处。售楼 MM  知小明。小红、小强和小龙也是一
// 样，他们的电话号码 出的时候，售楼 MM 会翻开花名册，
// 遍历上面的电话号码 


let observe = (function () {
    let _messages = {};
    return {
        //注册信息
        /**
         * @param  {要监听的动作} type
         * @param  {该动作对应的处理函数} fn
         */
        regist(type, fn) {
            //如果不存在则创建一个该消息类型
            if (typeof _messages[type] === 'undefined') {
                _messages[type] = [fn];
            } else {
                //存在 则将动作方法推入到该消息对应的工作执行序列中
                _messages[type].push(fn)
            }
        },
        //发布信息
        /**
         * @param  {消息类型} type
         * @param  {消息携带的数据} args
         */
        fire(type, args) {
            //队列中没有改消息则return
            if (!_messages[type]) {
                return
            }
            let events = {
                    type: type,
                    args: args || {}
                },
                i = 0,
                len = _messages[type].length;
            for (; i < len; i++) {
                // 依次执行注册的消息对应动作序列
                _messages[type][i].call(this, events)
            }
        },
        //移除信息
        reomove(type, fn) {
            if (_messages[type] instanceof Array) {
                let i = _messages[type].length - 1;
                for (; i >= 0; i--) {
                    _messages[type][i] === fn && _messages[type].splice(i, 1)
                }
            }
        },
        writerMsg() {
            console.log(_messages);
        }
    }
})()

//示例1
observe.regist('test', function (e) {
    console.log(e.type, '-------------------------', e.args.msg)
})
observe.fire('test', {
    msg: '传递参数'
})

//示例2
let Student = function (result) {
    let that = this;
    that.result = result;
    that.say = function () {
        console.log(that.result)
    }
}

Student.prototype.answer = function (question) {
    observe.regist(question, this.say)
}

Student.prototype.sleep = function (question) {
    console.log(this.result + '-------' + question + '已被注销');
    observe.reomove(question, this.say)
}

let Teacher = function () {};

Teacher.prototype.ask = function (question) {
    console.log(question);
    observe.fire(question)
}


let student1 = new Student('学生111回答问题'),
    student2 = new Student('学生222回答问题'),
    student3 = new Student('学生333回答问题');
student1.answer('什么是设计模式');
student1.answer('简述观察者模式');
student2.answer('什么是设计模式');
student3.answer('什么是设计模式');
student3.answer('简述观察者模式');
student3.sleep('简述观察者模式');
let teacher = new Teacher();
teacher.ask('什么是设计模式');
teacher.ask('简述观察者模式');
observe.writerMsg();