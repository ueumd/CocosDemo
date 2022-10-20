import { _decorator, Component, CCLoader  } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('List')
export class List extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }

    getListData() {

      //访问地址
        let url = "http://127.0.0.1:5173/v1/common/getSystemDate";
        //新建Http
        let xhr = new XMLHttpRequest();
        //接收数据
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = xhr.responseText;
                console.log(response);
            }
        };
        //错误处理
        xhr.onerror = function(evt){
            console.log(evt);
        }
        //初始化一个请求，GET方式，true异步请求
        xhr.open("GET", url, true);
        //发送请求
        xhr.send();

    }
}

