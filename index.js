window.onload = function(){
    var box = document.querySelector('.box');
    var begin = document.querySelector('.begin');
    var scroll = document.querySelector('.scroll');
    var btn = document.querySelector('button');
    var timer =  null;
    var speed = 5;
    begin.addEventListener('click', function(){
        //修改样式
        this.style.display = 'none';
        box.style.backgroundColor = '#fff';
        box.style.border = '1px solid black';
        scroll.innerHTML = "";
        beginGame();
    });
    function beginGame() {
        //记录分数
        var score = 0;
        // 设置定时器 让scroll向下滑
        timer = setInterval (function(){
            scroll.style.top = scroll.offsetTop + speed + 'px';
            if(scroll.offsetTop >= 0){
                creatNewRow();
                scroll.style.top = '-130px';
            }
        //绑定事件
        scroll.onclick = function(ev){
            var target = ev.target;
            if(target.className =='tag'){
                target.style.backgroundColor = '#bbb'; //当点击了黑块就变灰色
                target.className = '';
                score++;
                // clearInterval(timer);
            }else{
                scroll.style.top = 0;
                alert('得分：' + score);
                clearInterval(timer);
                begin.style.display = 'block';
                btn.innerText = '重新开始';
            }
            if(score % 20 == 0 ){
                speed++;
            }
        };
        //删除第一行
        if(scroll.children.length == 6){
            for(var i = 0; i < 4; i++){
                if(scroll.children[scroll.children.length - 1].children[i].className == 'tag'){
                    scroll.style.top = '-130px';
                    alert('得分：' + score);
                    clearInterval(timer);
                    
                    begin.style.display = 'block';
                    btn.innerText = '重新开始';
                }
            }
            scroll.removeChild(scroll.children[scroll.children.length -1 ]);
        }
        },20);}
    //产生随机函数
    function randomNum(m, n){
        return parseInt(Math.random() * (n - m + 1)) + m;
    }
    function creatNewRow(){
        var row = document.createElement('ul');
            // scroll.appendChild(row);
        var index = randomNum(0 , 3);
        for(let i = 0; i < 4; i++){
                var li = document.createElement('li');
                row.appendChild(li);
            }
        if(scroll.children.length == 0){
            scroll.appendChild(row);
        }else{
            scroll.insertBefore(row, scroll.children[0]);
        }
        //当生成新的黑色的块要添加className
            row.children[index].style.backgroundColor = 'black';
            row.children[index].className = 'tag';
    }    
}