from scapy.all import *
import sys

def pkt_callback(pkt):
    if pkt.haslayer(IP):
        print(pkt.payload.dst) # debug statement
        sys.stdout.flush()

sniff(iface="en0", prn=pkt_callback, filter="tcp", store=0)