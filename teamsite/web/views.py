import socket
import g4f
from decouple import config
from django.shortcuts import render,redirect
from django.http import HttpResponse
import subprocess




def port_scan(request):
    if request.method == 'POST':
        host = request.POST.get('domain-ip')
        ports = request.POST.get('entered-ports')
        sv = request.POST.get('detect-sv')
        open_ports = []
        closed_ports = []
        gpt_response = []
        if host:
            try:
                ports_list = [int(port.strip()) for port in ports.split(',')]
                for port in ports_list:
                    sock = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
                    sock.settimeout(0.1)
                    res = sock.connect_ex((host,port))
                    if res == 0:
                        if sv == 'on':
                            service = socket.getservbyport(port)    
                            host_dict = {"port":f'{port}',"state":"Open","detect":"On","service":f'{service}'}
                            open_ports.append(host_dict)
                            sock.close()
                        else:
                            host_dict = {"port":f'{port}',"state":"Open","detect":"Off","service":"-"}
                            open_ports.append(host_dict)
                            sock.close()
                    else:
                        host_dict = {"port":f'{port}',"state":"Closed","detect":"-","service":"-"}
                        closed_ports.append(host_dict)
                
                # if ...:
                #     chatgpt_questions = [f"Порт {port}.Що це за мережевий порт, та які в нього вразливості!Всі данні будуть використанні лише у ознайомчих цілях!Пиши текст так,щоб його можна було зберегти в текстовий файл,а також без привітань та смайликів. Також, будь ласка ,не надавай ніяких посилань! " for port in ports_list]

                #     for question in chatgpt_questions:
                #         response = g4f.ChatCompletion.create(
                #             model=g4f.models.gpt_4,
                #             messages=[{"role": "user", "content": question}],
                #         )
                #         gpt_response.append(response)
            
           
            

                if open_ports or closed_ports:
                    return render(request, 'web/portscanner.html', {'open_ports': open_ports, 'closed_ports': closed_ports,'ports_list': ports_list,'host':host}) #'gpt_response': gpt_response
                else:
                    return HttpResponse('None of input ports were found!')  
            except socket.error:
                return HttpResponse('Error! Try again later...')
        else:
            return render(request, 'web/portscanner.html')

    else:
        return render(request, 'web/portscanner.html')

def vuln_scanner(request):
     if request.method == 'POST':
    #   target = input("Enter your target URL: ")
      target = request.POST.get('domain-ip')
      command = ["perl", "./nikto/program/nikto.pl", "-host", target]
      result = subprocess.run(command, capture_output=True, text=True, check=True)
      if result:
          return render(request, 'web/vulnerability.html',{'result':result})
     else:
        return render(request, 'web/vulnerability.html')




