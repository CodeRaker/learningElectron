from scapy.all import *
from datetime import datetime
import sys

def pkt_callback(pkt):
    if pkt.haslayer(IP):
        time = datetime.fromtimestamp(pkt.payload.time)
        packet_header = pkt.summary()
        packet_body = hexdump(pkt.lastlayer(), dump=True)
        packet_body = packet_body.replace("\n","<br>")
        print(',|,'.join([packet_header,packet_body]))  # debug statement
        sys.stdout.flush()

sniff(prn=pkt_callback, filter="tcp", store=0)