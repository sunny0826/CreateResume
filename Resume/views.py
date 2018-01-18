# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import json
from django.shortcuts import render, get_object_or_404

from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, request

from Resume.models import IMG
# from createResume.createWord import createWord


def index(request):
    return render(request,"index.html")

def resume(request):
    return render(request,"resume.html")

@csrf_exempt
def uploadImg(request):
    if request.method == 'POST':
        new_img = IMG(
            img=request.FILES.get('file'),
            name = request.FILES.get('file').name
        )
        new_img.save()
        imginfo = json.dumps({"code": 0,"msg": "上传成功","data": {"src": new_img.img.path,"size":new_img.img.size}})
        return HttpResponse(imginfo, content_type='application/json; charset=utf-8')

@csrf_exempt
def showImg(request):
    imgs = IMG.objects.all()
    content = {
        'imgs':imgs,
    }
    for i in imgs:
        print i.img.url
    return render(request, 'showimg.html', content)

@csrf_exempt
def createWordAndPdf(request):
    if request.method == 'POST':
        datas = request.POST
        print datas
        # back = createWord()
        back = "200"
        result = json.dumps({'code': back})
    else:
        result = json.dumps({'code':404})
    return HttpResponse(result, content_type='application/json; charset=utf-8')