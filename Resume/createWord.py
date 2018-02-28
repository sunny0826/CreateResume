#!/usr/bin/env python
#encoding: utf-8
#Author: guoxudong
from docx import Document
from docx.shared import Inches
from docx2html import convert
import json
import HTMLParser
import sys
reload(sys)
sys.setdefaultencoding('utf-8')
#不改变样式替换模板中的内容
# from createResume.createPdf import createPdf

def createWord(data):
    #数据转化为json格式
    info = json.loads(json.dumps(data))
    print info
    def replace_text(old_text, new_text):
        for p in document.paragraphs:
            if old_text in p.text:
                inline = p.runs
                for i in inline:
                    if old_text in i.text:
                        text = i.text.replace(old_text, new_text)
                        i.text = text
    #打开模板文件
    document = Document('resTemplate/demo.docx')
    #最后添加附录
    paragraph = document.add_paragraph('照片：'.decode('utf8'))
    paragraph.insert_paragraph_before('附录：'.decode('utf8'), style='ListBullet')
    #添加图片
    document.add_picture('media/img/dog.jpg', width=Inches(1.25), height=Inches(1.25))
    #替换内容
    replace_text('0000','张三'.decode('utf8'))   #如果替换的字符为中文，则需要进行解码
    #保存
    document.save('media/word/result.docx')
    return 200

def wordToHtml():
    html_parser = HTMLParser.HTMLParser()
    html = convert('resTemplate/demo.docx')  # 使用docx2html模块将docx文件转成html串，随后你想干嘛都行
    html = html_parser.unescape(html)
    print html
    return html

# if __name__ == '__main__':
#     createWord()