import cv2
import numpy as np
import matplotlib.pyplot as plt
from utils.index import (
    gray, extract_feature, match_feature,
    homography, show
)

EXTRACTOR = cv2.xfeatures2d.SIFT_create()

class ImageDescriptor:
    def __init__(self, path):
        self.img = cv2.imread(path)
        print(self.img)
        self.kps, self.dsc = EXTRACTOR.detectAndCompute(self.img, None)
        self.shape = self.img.shape


class Panorama:
    def __init__(self, *imgs):
        self.imgs = [img for img in imgs]

    @staticmethod
    def stitch2img(img1, img2):
        matches = match_feature(img1, img2)
        M = homography(matches, img1.kps, img2.kps)
        # print(len(matches))
        shape = img2.shape[1] + img1.shape[1], img2.shape[0]*2
        res = cv2.warpPerspective( img2.img, M, shape )
        
        # show(res, "x")
        res[:img1.shape[0], :img1.shape[1]] = img1.img
        return res
    
    def stitch(self):
        panorama = self.imgs[0]
        for img in self.imgs[1:]:
            panorama = self.stitch2img(panorama, img)

        show(panorama, "?")



img1 = ImageDescriptor('core/images/1.png')
img2 = ImageDescriptor('core/images/2.png')
img3 = ImageDescriptor('core/images/3.png')

print(img1, img2, img3)
pano = Panorama(img1,img2, img3)

pano.stitch()