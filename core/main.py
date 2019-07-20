import cv2
import numpy as np
import os
import matplotlib.pyplot as plt
from utils.index import (
    gray, extract_feature, match_feature,
    homography, show
)

EXTRACTOR = cv2.xfeatures2d.SIFT_create()

class ImageDescriptor:
    def __init__(self, _input):
        self.img = cv2.imread(_input) if type(_input) == str else _input
        self.kps, self.dsc = EXTRACTOR.detectAndCompute(self.img, None)
        self.shape = self.img.shape

        

def trim(frame):
    #crop top
    # return frame
    if not np.sum(frame[0]):
        return trim(frame[1:])
    #crop bottom
    elif not np.sum(frame[-1]):
        return trim(frame[:-2])
    #crop left
    elif not np.sum(frame[:,0]):
        return trim(frame[:,1:]) 
    #crop right
    elif not np.sum(frame[:,-1]):
        return trim(frame[:,:-2])    
    return frame

def overwrite(img1, img2):
    for x in range(img1.shape[0]):
        for y in range(img1.shape[1]):
            if np.sum(img1[x][y]):
                img2[x][y] = img1[x][y]

    return img2
                


class Panorama:
    def __init__(self, *imgs):
        self.imgs = [img for img in imgs]

    @staticmethod
    def stitch2img(obj1, obj2):
        # print(obj1)
        kps1, dsc1, img1 = obj1
        kps2, dsc2, img2 = obj2

        matches = match_feature(dsc1, dsc2)
        M = homography(matches, kps1, kps2)
        # xM = np.linalg.inv(M)
        # print(M)
        # print(len(matches))
        res = cv2.warpPerspective(img2, M, (
            img2.shape[1] + img1.shape[1], img2.shape[0]*2))
        
        
        res[:img1.shape[0], :img1.shape[1]] = img1
        # res = overwrite(img1, res)
        show(trim(res), "x")
        return trim(res)
    
    def stitch(self):
        pano = self.imgs[0]
        panorama = None
        i = 0
        for img in self.imgs[1:]:
            panorama = self.stitch2img(
                (pano.kps, pano.dsc, pano.img),
                (img.kps, img.dsc, img.img))
            pano = ImageDescriptor(panorama)
        
        cv2.imwrite("output/res2.jpg", panorama)
        show(panorama, "res")


def getImgFromDir(path, limit=3):
    imgs = []
    dir_ = 'images/' + path
    for file in os.listdir(dir_)[:3]:
        relpath = os.path.join(dir_, file)
        imgs.append(ImageDescriptor(relpath))

# imgs = getImgFromDir('grail')
img8 = ImageDescriptor('images/grail/grail08.jpg')
img7 = ImageDescriptor('images/grail/grail07.jpg')
img6 = ImageDescriptor('images/grail/grail06.jpg')
img5 = ImageDescriptor('images/grail/grail05.jpg')
img4 = ImageDescriptor('images/grail/grail04.jpg')
img3 = ImageDescriptor('images/grail/grail03.jpg')
img2 = ImageDescriptor('images/grail/grail02.jpg')
img1 = ImageDescriptor('images/grail/grail01.jpg')
img0 = ImageDescriptor('images/grail/grail00.jpg')
img11 = ImageDescriptor('images/new/S1.jpg')
img12 = ImageDescriptor('images/new/S2.jpg')
img13 = ImageDescriptor('images/new/S3.jpg')
img14 = ImageDescriptor('images/new/S5.jpg')
img15 = ImageDescriptor('images/new/S6.jpg')
# pano = Panorama(img5,img4, img3, img2, img1, img0)
pano = Panorama(img11, img12, img13, img14)
# show(img2.img, "?")
pano.stitch()