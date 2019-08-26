import sys
import time

time.sleep(2)

for i in range(100):
    time.sleep(0.5)
    print("Dummy Packet "+str(i))
    sys.stdout.flush()