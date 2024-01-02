import socket
from decouple import config
# import openai
from django.shortcuts import render,redirect
from django.http import HttpResponse

API = config('AI_KEY')

def port_scan(request):
    if request.method == 'POST':
        ip = request.POST.get('ip')
        ports = request.POST.get('ports')
        sv = request.POST.get('sv')
        open_ports = []
        try:
            ports_list = [int(port.strip()) for port in ports.split(',')]
            for port in ports_list:
                sock = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
                sock.settimeout(0.01)
                res = sock.connect_ex((ip,port))
                if res == 0:
                    if sv == 'on':
                        service = socket.getservbyport(port)    
                        open_ports.append(f'{port} is open with service {service}!')
                        sock.close()
                    else:
                        open_ports.append(f'{port} is open!')
                        sock.close()
                if open_ports:
                    return render(request, 'web/results.html', {'open_ports': open_ports})
                else:
                    return HttpResponse('None of input ports were found!')  
        except socket.error:
                return HttpResponse('Error! Try again later...')
                
    else:
        return render(request, 'web/index.html')





