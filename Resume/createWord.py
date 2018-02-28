#!/usr/bin/env python
#encoding: utf-8
#Author: guoxudong
from docx import Document
import sys
reload(sys)
sys.setdefaultencoding('utf-8')
#不改变样式替换模板中的内容
# from createResume.createPdf import createPdf

def createWord():
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
    #替换内容
    replace_text('0000','张三'.decode('utf8'))   #如果替换的字符为中文，则需要进行解码
    #保存
    document.save('media/word/result.docx')
    # back = createPdf(wordName='resume.docx',pdfName='resume.pdf')
    return 1

# if __name__ == '__main__':
#     createWord()