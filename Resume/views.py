# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import json

from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from models import IMG


def index(request):
    return render(request, "index.html")


def resume(request):
    return render(request, "resume.html")


@csrf_exempt
def uploadImg(request):
    if request.method == 'POST':
        new_img = IMG(
            img=request.FILES.get('file'),
            name=request.FILES.get('file').name
        )
        new_img.save()
        imginfo = json.dumps({"code": 0, "msg": "上传成功", "data": {"src": new_img.img.path, "size": new_img.img.size}})
        return HttpResponse(imginfo, content_type='application/json; charset=utf-8')


@csrf_exempt
def showImg(request):
    imgs = IMG.objects.all()
    content = {
        'imgs': imgs,
    }
    for i in imgs:
        print i.img.url
    return render(request, 'showimg.html', content)


@csrf_exempt
def createWord(request):
    if request.method == 'POST':
        datas = request.POST.items()[0][0]
        import createWord
        back = createWord.createWord(datas)
        # back = createWord.woreToHtml()
        # back = "200"
        result = json.dumps({'code': back})
    else:
        result = json.dumps({'code': 404})
    return HttpResponse(result, content_type='application/json; charset=utf-8')
