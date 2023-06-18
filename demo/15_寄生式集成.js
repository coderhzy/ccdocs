var personObj = {
    running: function () {
        console.log('running');
    }
}

function createStudent(name){
    var stu = Object.create(personObj);
    stu.name = name;
    stu.studying = function(){
        console.log('studying');
    }
    return stu;
}

var stu1 = createStudent('xiaoming');
var stu2 = createStudent('xiaohong');
stu1.running();