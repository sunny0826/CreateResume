/**
 * Created by guoxudong on 2018/1/3.
 */
layui.use(['form', 'layedit', 'laydate','upload'], function(){
  var form = layui.form
  ,layer = layui.layer
  ,layedit = layui.layedit
  ,laydate = layui.laydate;
  var $ = layui.jquery
  ,upload = layui.upload;

  var jobinfo=[];//工作经历
  var proinfo=[];//项目经验
  var imagePath="";//图片路径

  //日期控制
  laydate.render({
    elem: '#birthDate'
  });
  laydate.render({
    elem: '#test8'
    ,type: 'month'
    ,range: true
  });
  laydate.render({
    elem: '#test9'
    ,type: 'month'
    ,range: true
  });

  //job监听添加
  $('#tianjiaExp.layui-btn').on('click', function(){
    var time = $("#test8").val();
    var jobtype = $("#jobtype").val();
    var jobname = $("#jobname").val();
    var jobcontent = $("#jobcontent").val();
    if (time==""||jobtype==""||jobname==""||jobcontent==""){
        layer.msg('内容不可为空！');
    }else {
        $('#jobtimeline').append('<li class="layui-timeline-item">\
          <i class="layui-icon layui-timeline-axis">&#xe63f;</i>\
          <div class="layui-timeline-content layui-text">\
            <h3 class="layui-timeline-title">' + time + '</h3>\
            <p>\
              职业类型：' + jobtype + '\
              <br>职业名称：' + jobname + '\
              <br>工作内容：' + jobcontent + '\
            </p>\
          </div>\
        </li>');
        var info = {};
        info['time']=time;
        info['jobtype']=jobtype;
        info['jobname']=jobname;
        info['jobcontent']=jobcontent;
        jobinfo.push(info);
        $("#test8").val('');
        $("#jobtype").val('');
        $("#jobname").val('');
        $("#jobcontent").val('');
    }
  });
  //job重置经历
     $('#resetExp.layui-btn').on('click', function(){
         $('#jobtimeline>li').remove();
         jobinfo = [];
     });

   //pro监听添加
  $('#tianjiaPro.layui-btn').on('click', function(){
    var time = $("#test9").val();
    var jobtype = $("#protype").val();
    var jobname = $("#proname").val();
    var jobcontent = $("#procontent").val();
    if (time==""||jobtype==""||jobname==""||jobcontent==""){
        layer.msg('内容不可为空！');
    }else {
        $('#protimeline').append('<li class="layui-timeline-item">\
          <i class="layui-icon layui-timeline-axis">&#xe63f;</i>\
          <div class="layui-timeline-content layui-text">\
            <h3 class="layui-timeline-title">' + time + '</h3>\
            <p>\
              职业类型：' + jobtype + '\
              <br>职业名称：' + jobname + '\
              <br>工作内容：' + jobcontent + '\
            </p>\
          </div>\
        </li>');
        var info = {};
        info['time']=time;
        info['jobtype']=jobtype;
        info['jobname']=jobname;
        info['jobcontent']=jobcontent;
        proinfo.push(info);
        $("#test9").val('');
        $("#protype").val('');
        $("#proname").val('');
        $("#procontent").val('');
    }
  });
  //pro重置经历
     $('#resetPro.layui-btn').on('click', function(){
         $('#protimeline>li').remove();
         proinfo = [];
     });

  //普通图片上传
  var uploadInst = upload.render({
    elem: '#test1'
    ,url: '/upload/'
    ,before: function(obj){
      //预读本地文件示例，不支持ie8
      obj.preview(function(index, file, result){
        $('#demo1').attr('src', result); //图片链接（base64）
      });
    }
    ,done: function(res){
      //如果上传失败
      if(res.code > 0){
        return layer.msg('上传失败');
      }else {
        //上传成功
        imagePath=res.data.src;
        return layer.msg(res.msg);
      }
    }
    ,error: function(index, upload){
      //演示失败状态，并实现重传
      var demoText = $('#demoText');
      demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-mini demo-reload">重试</a>');
      demoText.find('.demo-reload').on('click', function(){
        uploadInst.upload();
      });
    }
  });


  //日期
  laydate.render({
    elem: '#date'
  });
  laydate.render({
    elem: '#date1'
  });

  //创建一个编辑器
 /* var editIndex = layedit.build('LAY_demo_editor');

  //自定义验证规则
  form.verify({
    title: function(value){
      if(value.length < 5){
        return '标题至少得5个字符啊';
      }
    }
    ,pass: [/(.+){6,12}$/, '密码必须6到12位']
    ,content: function(value){
      layedit.sync(editIndex);
    }
  });*/

  //监听指定开关
  form.on('switch(switchTest)', function(data){
    layer.msg('开关checked：'+ (this.checked ? 'true' : 'false'), {
      offset: '6px'
    });
    layer.tips('温馨提示：请注意开关状态的文字可以随意定义，而不仅仅是ON|OFF', data.othis)
  });

  //监听提交
  form.on('submit(demo1)', function(data){
      data.field["jobinfo"]=jobinfo;
      data.field["proinfo"]=proinfo;
      data.field["imagePath"]=imagePath;
      if (data.field.jobinfo==""){
          layer.msg('工作经历不可为空!',{icon: 5, anim: 6}, function(){});
      }else if (data.field.proinfo==""){
          layer.msg('项目经验不可为空!',{icon: 5, anim: 6}, function(){});
      // }else if (data.field.imagePath==""){
      //     // layer.msg('需要上传照片！');
      //     layer.msg('需要上传照片!',{icon: 5, anim: 6}, function(){});
      }else {
          var index = layer.load();
          $.ajax({
            type: 'POST',
            url: '/create',
            data: JSON.stringify(data.field),
            dataType: 'json',
            success: function (data) {
                layer.close(index);
                // layer.alert(JSON.stringify(data.code), {
                //示范一个公告层
              layer.open({
                type: 1
                ,title: false //不显示标题栏
                ,closeBtn: false
                ,area: '300px;'
                ,shade: 0.8
                ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
                ,btn: ['是', '否']
                ,btnAlign: 'c'
                ,moveType: 1 //拖拽模式，0或者1
                ,content: '<div style="padding: 50px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;">你知道吗？亲！<br><br>由于目前的技术有限,图片无法插入到指定位置,所以照片只能以附录的形式插入到文档最后,可在下载后自行编辑<br><br>欢迎批评指正<br>邮箱地址：sunny20170826@sina.com<br><br>是否下载？</a></div>'
                ,success: function(layero) {
                      var btn = layero.find('.layui-layer-btn');
                      btn.find('.layui-layer-btn0').attr({
                          href: origin + '/media/word/result.docx'
                      });
                  }
                  });
                /*layer.open({
                    title: '下载',
                    content: '是否下载',
                    btn: ['是', '否'],
                    success: function(layero) {
                        var origin = window.location.origin;
                        var btn = layero.find('.layui-layer-btn');
                        btn.find('.layui-layer-btn0').attr({
                            href: origin+'/media/word/result.docx'
                            // , target: '_blank'
                        });
                    }
                });*/
            },
            error: function (xhr, type) {
                layer.close(index);
                layer.msg('发送请求错误！')
                console.log('错误')
            }
          });
      }
    // console.log(jobinfo);
    // console.log(proinfo);
    return false;
  });
});