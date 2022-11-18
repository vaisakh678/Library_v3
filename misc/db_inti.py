import os
BASE_DIR = os.path.join(os.path.dirname(__file__), "dump")
DB_NAME = "Library_V3"

print("1. Backup\n2. Restore")
op = int(input())
if op == 1:
    os.system(f"mongodump -d {DB_NAME} -o {BASE_DIR}")
elif op == 2:
    os.system(f"mongorestore -d {DB_NAME} {os.path.join(BASE_DIR, DB_NAME)}")

