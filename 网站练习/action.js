//ES6学生类方法 导出到外部共用

class Student {
    constructor(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
    study() {
        console.log(`${this.name} is studying`);
    }
    getAge() {
        if (this.age > 18) {
            return "成年";
        } else {
            return "未成年";
        }
    }
    getGender() {
        if (this.gender === "男") {
            return "男";
        } else {
            return "女";
        }
    }
    getInfo() {
        return `姓名：${this.name}，年龄：${this.age}，性别：${this.gender}`;
    }

    // 外部使用方法:
    // import Student from './action.js'
    // const student = new Student('张三', 18, '男')
    // student.study() // 张三 is studying
    // 导出到外部共用
    // 在显示年龄 大于18 显示成年 小于18 显示未成年
}
export default Student;