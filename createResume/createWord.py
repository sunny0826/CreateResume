#!/usr/bin/env python
#encoding: utf-8
#Author: guoxudong
from docx import Document

#不改变样式替换模板中的内容
from createResume.createPdf import createPdf

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
    document = Document('demo.docx')
    #替换内容
    replace_text('0000','1231231231312')
    #保存
    document.save('demo1.docx')
    back = createPdf(wordName='resume.docx',pdfName='resume.pdf')
    return back
