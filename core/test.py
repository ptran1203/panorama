import cv2
import numpy as np
import utils
import os
import constant as const
from panorama import Panorama

grails = os.path.join(const.IMAGES_DIR, 'grail')




imglist1 = sorted(utils.files_in(grails), reverse=True)[:10]

imglist2 = [
    '../images/new/S1.jpg',
    '../images/new/S2.jpg',
    '../images/new/S3.jpg',
    '../images/new/S5.jpg',
    '../images/new/S6.jpg',
]

pano = Panorama(imglist1)
pano.combine()