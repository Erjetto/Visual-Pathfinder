import os
from shutil import copyfile

file_dir = r'Z:\Research\XGBoostTester\xgboost_2\data'
test_dir = r'Z:\Research\XGBoostTester\xgboost_2\test'
train_dir = r'Z:\Research\XGBoostTester\xgboost_2\train'

os.makedirs(train_dir, exist_ok=True)
os.makedirs(test_dir, exist_ok=True)
i = 0
for path, folder, files in os.walk(file_dir):
   for f in files:
      i = (i+1) % 10
      if(i == 0):
         copyfile(os.path.join(path,f), os.path.join(test_dir,f))
      else:
         copyfile(os.path.join(path,f), os.path.join(train_dir,f))
