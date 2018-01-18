#!/usr/bin/env python
#encoding: utf-8
#Author: guoxudong
# import pythoncom
import os
import win32com.client

##########################
#   Windows环境的配置    #
#   linux需要手动改路径  #
##########################

def createPdf(wordName,pdfName):
    import pythoncom
    pythoncom.CoInitialize()
    # stat = os.system('taskkill /im wps.exe')
    # try:
    #配置模板地址
    src = os.path.abspath('..')+'\\media\\word\\'+wordName
    #配置生成的pdf地址
    dst = os.path.abspath('..')+'\\media\\pdf\\'+pdfName
    wps = win32com.client.Dispatch("Kwps.Application")
    wps.Visible=False
    doc = wps.Documents.Open(src)
    doc.ExportAsFixedFormat(dst,17)
    wps.Quit()
    return "200"
    # except :
    #     return "404"

if __name__ == '__main__':
    a = createPdf(wordName='resume.docx',pdfName='resume.pdf')
    print a