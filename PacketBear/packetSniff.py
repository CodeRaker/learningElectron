from scapy.all import *
from datetime import datetime
import sys

def pkt_callback(pkt):
    if pkt.haslayer(IP):
        time = datetime.fromtimestamp(pkt.payload.time)
        print("Time: "+str(time)+" | Src : "+pkt.payload.src+" | Dst : "+pkt.payload.dst) # debug statement
        sys.stdout.flush()

sniff(iface="en0", prn=pkt_callback, filter="tcp", store=0)