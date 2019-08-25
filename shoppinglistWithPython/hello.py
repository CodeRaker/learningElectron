#from scapy.all import sniff
import time

for i in range(10):
	print("Hello "+str(i))
	time.sleep(3)

#pcap = sniff(count=100)
#print(pcap.summary())