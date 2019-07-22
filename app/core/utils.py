## utils processing
import cv2
import numpy as np
import os
import shutil
import datetime
# TODO: Is xfeatures2d working on Windows?
EXTRACTOR = cv2.xfeatures2d.SIFT_create()
MATCHER = cv2.BFMatcher()
THRESHOLD = 0.85
MIN_MATCHES = 10

def show(img, name):
    # cv2.namedWindow(name,cv2.WINDOW_NORMAL)
    # cv2.resizeWindow(name, 400,800)
    cv2.imshow(name, img)
    cv2.waitKey(0)
    cv2.destroyWindow(name)

def gray(img):
    """
    Convert image to gray scale the correct way
    """
    if img is None:
        return img
    img = img.astype('uint8')
    return cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

def match_feature(dsc1, dsc2):
    """
    Match two given descriptors
    re: 
    """
    matches = MATCHER.knnMatch(dsc1, dsc2, k=2)
    good_points = []
    for m1, m2 in matches:
        if m1.distance < 0.75 * m2.distance:
            good_points.append((m1.trainIdx, m1.queryIdx))
    return good_points

def homography(img1, img2, matches=None):
    if not matches:
        matches = match_feature(img1.dsc, img2.dsc)
    
    image1_kp = np.float32(
        [img1.kps[i].pt for (_, i) in matches]
    )
    image2_kp = np.float32(
        [img2.kps[i].pt for (i, _) in matches]
    )
    H, status = cv2.findHomography(image2_kp, image1_kp, cv2.RANSAC,5.0)
    return H

def key(num):
    return str(num) + str(num + 1)

def files_in(dirpath):
    """
    list files in dirpath
    return absolute path
    """
    return [
        os.path.join(dirpath, file) for file in os.listdir(dirpath)
    ]

def clean_folder(folder):
    for the_file in os.listdir(folder):
        file_path = os.path.join(folder, the_file)
        try:
            if os.path.isfile(file_path):
                os.unlink(file_path)
        except Exception as e:
            print(e)

def make_file():
    now = datetime.datetime.now()
    return "/r" + str(now
        ).replace(" ","-").replace(":","-"
        ).replace(".","-") + ".jpg"