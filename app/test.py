import cv2
import numpy as np
import core.utils as utils
import os
import core.constant as const
from core.panorama import Panorama
from core.descriptor import ImageDescriptor

grails = os.path.join(const.IMAGES_DIR, 'grail')




imglist1 = sorted(utils.files_in(grails), reverse=True)[:10]

imglist2 = [
    '../images/new/S1.jpg',
    '../images/new/S2.jpg',
    '../images/new/S3.jpg',
    '../images/new/S5.jpg',
    '../images/new/S6.jpg',
]

# img1 = cv2.imread(imglist1[0])
# img2 = cv2.imread(imglist1[1])
# img3 = cv2.imread(imglist1[2])

# img1 = ImageDescriptor(img1)
# img2 = ImageDescriptor(img2)
# img3 = ImageDescriptor(img3)

# matches12 = utils.match_feature(img1.dsc, img2.dsc)
# matches21 = utils.match_feature(img2.dsc, img1.dsc)
# matches13 = utils.match_feature(img3.dsc, img2.dsc)
# h12 = utils.homography(img1, img2)
# h21 = utils.homography(img2, img1)
# h13 = utils.homography(img1, img3)

# print("21", h21)
# print(len(matches12), len(matches13))


# print(img.shape)

pano = Panorama(imglist1[:4])
pano.stitch()
# pano.stitch_left()